import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Switch,
  Alert
} from 'react-native';
import { Clock, Save, Plus, Minus } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useProfessionalStore } from '@/store/professional-store';

interface TimeSlot {
  start: string;
  end: string;
}

interface DaySchedule {
  enabled: boolean;
  timeSlots: TimeSlot[];
}

type WeekSchedule = {
  [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']: DaySchedule;
};

export default function AvailabilityScreen() {
  // Initial schedule with some default values
  const initialSchedule: WeekSchedule = {
    monday: { enabled: true, timeSlots: [{ start: '9:00 AM', end: '5:00 PM' }] },
    tuesday: { enabled: true, timeSlots: [{ start: '9:00 AM', end: '5:00 PM' }] },
    wednesday: { enabled: true, timeSlots: [{ start: '9:00 AM', end: '5:00 PM' }] },
    thursday: { enabled: true, timeSlots: [{ start: '9:00 AM', end: '5:00 PM' }] },
    friday: { enabled: true, timeSlots: [{ start: '9:00 AM', end: '5:00 PM' }] },
    saturday: { enabled: true, timeSlots: [{ start: '10:00 AM', end: '3:00 PM' }] },
    sunday: { enabled: false, timeSlots: [{ start: '10:00 AM', end: '2:00 PM' }] },
  };
  
  const [schedule, setSchedule] = useState<WeekSchedule>(initialSchedule);
  
  // Time options for dropdowns
  const timeOptions = [
    '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];
  
  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };
  
  const toggleDayEnabled = (day: keyof WeekSchedule) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        enabled: !schedule[day].enabled
      }
    });
  };
  
  const addTimeSlot = (day: keyof WeekSchedule) => {
    const newTimeSlot = { start: '9:00 AM', end: '5:00 PM' };
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        timeSlots: [...schedule[day].timeSlots, newTimeSlot]
      }
    });
  };
  
  const removeTimeSlot = (day: keyof WeekSchedule, index: number) => {
    if (schedule[day].timeSlots.length <= 1) {
      Alert.alert("Cannot Remove", "You must have at least one time slot for each day.");
      return;
    }
    
    const newTimeSlots = [...schedule[day].timeSlots];
    newTimeSlots.splice(index, 1);
    
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        timeSlots: newTimeSlots
      }
    });
  };
  
  const updateTimeSlot = (day: keyof WeekSchedule, index: number, field: 'start' | 'end', value: string) => {
    const newTimeSlots = [...schedule[day].timeSlots];
    newTimeSlots[index] = {
      ...newTimeSlots[index],
      [field]: value
    };
    
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        timeSlots: newTimeSlots
      }
    });
  };
  
  const handleSave = () => {
    // In a real app, you would save this to the backend
    Alert.alert("Success", "Your availability has been updated.");
  };
  
  const renderTimeSelector = (
    day: keyof WeekSchedule, 
    slotIndex: number, 
    field: 'start' | 'end',
    currentValue: string
  ) => {
    return (
      <View style={styles.timeSelector}>
        <Text style={styles.timeLabel}>{field === 'start' ? 'From' : 'To'}</Text>
        <View style={styles.timePicker}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.timeOptionsContainer}
          >
            {timeOptions.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeOption,
                  currentValue === time && styles.selectedTimeOption
                ]}
                onPress={() => updateTimeSlot(day, slotIndex, field, time)}
              >
                <Text 
                  style={[
                    styles.timeOptionText,
                    currentValue === time && styles.selectedTimeOptionText
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Set Your Availability</Text>
          <Text style={styles.subtitle}>
            Define when you're available to accept bookings
          </Text>
        </View>
        
        {Object.entries(schedule).map(([day, daySchedule]) => (
          <Card key={day} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayName}>{dayNames[day as keyof WeekSchedule]}</Text>
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>
                  {daySchedule.enabled ? 'Available' : 'Unavailable'}
                </Text>
                <Switch
                  value={daySchedule.enabled}
                  onValueChange={() => toggleDayEnabled(day as keyof WeekSchedule)}
                  trackColor={{ false: Colors.border, true: `${Colors.primary}50` }}
                  thumbColor={daySchedule.enabled ? Colors.primary : '#f4f3f4'}
                />
              </View>
            </View>
            
            {daySchedule.enabled && (
              <View style={styles.timeSlotsContainer}>
                {daySchedule.timeSlots.map((timeSlot, index) => (
                  <View key={index} style={styles.timeSlot}>
                    <View style={styles.timeSlotContent}>
                      {renderTimeSelector(day as keyof WeekSchedule, index, 'start', timeSlot.start)}
                      {renderTimeSelector(day as keyof WeekSchedule, index, 'end', timeSlot.end)}
                    </View>
                    
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeTimeSlot(day as keyof WeekSchedule, index)}
                    >
                      <Minus size={16} color={Colors.error} />
                    </TouchableOpacity>
                  </View>
                ))}
                
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addTimeSlot(day as keyof WeekSchedule)}
                >
                  <Plus size={16} color={Colors.primary} />
                  <Text style={styles.addButtonText}>Add Time Slot</Text>
                </TouchableOpacity>
              </View>
            )}
          </Card>
        ))}
        
        <Button
          title="Save Availability"
          variant="primary"
          size="large"
          onPress={handleSave}
          icon={<Save size={18} color="#fff" />}
          iconPosition="left"
          style={styles.saveButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.xl,
  },
  header: {
    marginVertical: Layout.spacing.l,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  dayCard: {
    marginBottom: Layout.spacing.m,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: Layout.spacing.s,
  },
  timeSlotsContainer: {
    marginTop: Layout.spacing.s,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  timeSlotContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeSelector: {
    flex: 1,
    marginRight: Layout.spacing.s,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  timePicker: {
    height: 40,
  },
  timeOptionsContainer: {
    alignItems: 'center',
  },
  timeOption: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.small,
    marginRight: Layout.spacing.xs,
    backgroundColor: Colors.surfaceVariant,
  },
  selectedTimeOption: {
    backgroundColor: Colors.primary,
  },
  timeOptionText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  selectedTimeOptionText: {
    color: '#fff',
    fontWeight: '500',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${Colors.error}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.s,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.small,
    backgroundColor: `${Colors.primary}15`,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
    marginLeft: Layout.spacing.xs,
  },
  saveButton: {
    marginTop: Layout.spacing.l,
  },
});