import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, Clock, DollarSign, Shield } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import Button from '@/components/Button';
import Card from '@/components/Card';
import professionals from '@/mocks/professionals';
import { useUserStore } from '@/store/user-store';
import { Booking } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';

export default function BookingScreen() {
  const { professionalId, serviceId } = useLocalSearchParams();
  const router = useRouter();
  const { addBooking } = useUserStore();
  
  const professional = professionals.find(p => p.id === professionalId);
  const service = professional?.services?.find(s => s.id === serviceId);
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  
  if (!professional || !service) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Service or professional not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  // Mock dates (next 5 days)
  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  });
  
  // Mock time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];
  
  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Please select both date and time');
      return;
    }
    
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      professionalId: professional.id,
      serviceId: service.id,
      date: selectedDate,
      time: selectedTime,
      status: 'pending',
      price: service.price,
    };
    
    addBooking(newBooking);
    
    Alert.alert(
      'Booking Successful',
      `Your appointment with ${professional.name} has been booked.`,
      [
        { 
          text: 'View Bookings', 
          onPress: () => router.push('/bookings') 
        },
        {
          text: 'OK',
          onPress: () => router.back(),
        }
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={[Colors.secondary, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Book Appointment</Text>
        </LinearGradient>
        
        <Card style={styles.professionalCard}>
          <View style={styles.professionalInfo}>
            <Image 
              source={{ uri: professional.avatar }} 
              style={styles.avatar} 
            />
            <View style={styles.professionalDetails}>
              <Text style={styles.professionalName}>{professional.name}</Text>
              <Text style={styles.professionalProfession}>{professional.profession}</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.location}>{professional.location}</Text>
              </View>
            </View>
          </View>
        </Card>
        
        <Card style={styles.serviceCard}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Clock size={16} color={Colors.primary} />
                <Text style={styles.detailText}>{service.duration}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <DollarSign size={16} color={Colors.primary} />
                <Text style={styles.detailText}>${service.price}</Text>
              </View>
            </View>
          </View>
        </Card>
        
        <Card style={styles.dateTimeCard}>
          <Text style={styles.sectionTitle}>Select Date & Time</Text>
          
          <Text style={styles.subsectionTitle}>Date</Text>
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datesContainer}
          >
            {dates.map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateItem,
                  selectedDate === date && styles.selectedItem
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text 
                  style={[
                    styles.dateText,
                    selectedDate === date && styles.selectedText
                  ]}
                >
                  {date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <Text style={styles.subsectionTitle}>Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeItem,
                  selectedTime === time && styles.selectedItem
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text 
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedText
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
        
        <Card style={styles.paymentCard}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <View style={styles.paymentOptions}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'card' && styles.selectedPaymentOption
              ]}
              onPress={() => setPaymentMethod('card')}
            >
              <DollarSign 
                size={20} 
                color={paymentMethod === 'card' ? Colors.primary : Colors.textSecondary} 
              />
              <Text 
                style={[
                  styles.paymentOptionText,
                  paymentMethod === 'card' && styles.selectedPaymentOptionText
                ]}
              >
                Credit Card
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'cash' && styles.selectedPaymentOption
              ]}
              onPress={() => setPaymentMethod('cash')}
            >
              <DollarSign 
                size={20} 
                color={paymentMethod === 'cash' ? Colors.primary : Colors.textSecondary} 
              />
              <Text 
                style={[
                  styles.paymentOptionText,
                  paymentMethod === 'cash' && styles.selectedPaymentOptionText
                ]}
              >
                Cash
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
        
        <Card style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Booking Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service</Text>
            <Text style={styles.summaryValue}>{service.name}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date</Text>
            <Text style={styles.summaryValue}>{selectedDate || 'Not selected'}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Time</Text>
            <Text style={styles.summaryValue}>{selectedTime || 'Not selected'}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>{service.duration}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Fee</Text>
            <Text style={styles.summaryValue}>${service.price.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Booking Fee</Text>
            <Text style={styles.summaryValue}>$2.00</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${(service.price + 2).toFixed(2)}</Text>
          </View>
        </Card>
        
        <View style={styles.secureNotice}>
          <Shield size={14} color={Colors.textSecondary} />
          <Text style={styles.secureText}>
            Your payment information is secure and encrypted
          </Text>
        </View>
        
        <Button
          title="Confirm Booking"
          variant="primary"
          size="large"
          fullWidth
          onPress={handleBooking}
          style={styles.bookButton}
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
    paddingBottom: Layout.spacing.xl,
  },
  header: {
    paddingVertical: Layout.spacing.l,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: Layout.spacing.l,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  professionalCard: {
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  professionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Layout.spacing.m,
  },
  professionalDetails: {
    flex: 1,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  professionalProfession: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  serviceCard: {
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  serviceInfo: {
    marginTop: Layout.spacing.s,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  serviceDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.m,
    lineHeight: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.l,
    backgroundColor: `${Colors.primary}10`,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.small,
  },
  detailText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: Layout.spacing.xs,
    fontWeight: '500',
  },
  dateTimeCard: {
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.m,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.s,
  },
  datesContainer: {
    paddingBottom: Layout.spacing.m,
  },
  dateItem: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
    backgroundColor: Colors.surfaceVariant,
    marginRight: Layout.spacing.m,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedItem: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dateText: {
    fontSize: 14,
    color: Colors.text,
  },
  selectedText: {
    color: '#fff',
    fontWeight: '500',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.s,
  },
  timeItem: {
    width: '30%',
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
    backgroundColor: Colors.surfaceVariant,
    marginRight: '5%',
    marginBottom: Layout.spacing.m,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeText: {
    fontSize: 14,
    color: Colors.text,
  },
  paymentCard: {
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    paddingVertical: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    backgroundColor: Colors.surfaceVariant,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedPaymentOption: {
    backgroundColor: `${Colors.primary}15`,
    borderColor: Colors.primary,
  },
  paymentOptionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: Layout.spacing.s,
  },
  selectedPaymentOptionText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  summaryCard: {
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.s,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Layout.spacing.m,
  },
  totalRow: {
    marginTop: Layout.spacing.s,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  secureNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
  },
  secureText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: Layout.spacing.xs,
  },
  bookButton: {
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.xl,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});