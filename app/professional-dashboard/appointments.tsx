import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image
} from 'react-native';
import { Calendar as CalendarIcon, Clock, DollarSign, CheckCircle, XCircle, MessageCircle, Phone } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useProfessionalStore } from '@/store/professional-store';

type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

interface Appointment {
  id: string;
  clientName: string;
  clientAvatar: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState<AppointmentStatus>('upcoming');
  
  // Mock appointments data
  const appointments: Appointment[] = [
    {
      id: 'app1',
      clientName: 'Emma Johnson',
      clientAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      service: 'Bridal Makeup',
      date: 'Today',
      time: '2:00 PM',
      duration: '2 hours',
      price: 250,
      status: 'confirmed'
    },
    {
      id: 'app2',
      clientName: 'Sophia Williams',
      clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      service: 'Special Event Makeup',
      date: 'Tomorrow',
      time: '10:30 AM',
      duration: '1 hour',
      price: 120,
      status: 'confirmed'
    },
    {
      id: 'app3',
      clientName: 'Olivia Davis',
      clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      service: 'Bridal Makeup',
      date: 'Jun 15',
      time: '1:00 PM',
      duration: '2 hours',
      price: 250,
      status: 'pending'
    },
    {
      id: 'app4',
      clientName: 'Ava Wilson',
      clientAvatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      service: 'Special Event Makeup',
      date: 'Jun 10',
      time: '3:00 PM',
      duration: '1 hour',
      price: 120,
      status: 'completed'
    },
    {
      id: 'app5',
      clientName: 'Mia Thompson',
      clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      service: 'Bridal Makeup',
      date: 'Jun 5',
      time: '11:00 AM',
      duration: '2 hours',
      price: 250,
      status: 'completed'
    },
    {
      id: 'app6',
      clientName: 'Isabella Brown',
      clientAvatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      service: 'Special Event Makeup',
      date: 'Jun 2',
      time: '4:30 PM',
      duration: '1 hour',
      price: 120,
      status: 'cancelled'
    }
  ];
  
  const filteredAppointments = appointments.filter(appointment => {
    if (activeTab === 'upcoming') {
      return appointment.status === 'confirmed' || appointment.status === 'pending';
    } else if (activeTab === 'completed') {
      return appointment.status === 'completed';
    } else {
      return appointment.status === 'cancelled';
    }
  });
  
  const handleAccept = (id: string) => {
    // Handle accepting appointment
    console.log('Accept appointment', id);
  };
  
  const handleDecline = (id: string) => {
    // Handle declining appointment
    console.log('Decline appointment', id);
  };
  
  const handleComplete = (id: string) => {
    // Handle completing appointment
    console.log('Complete appointment', id);
  };
  
  const handleCancel = (id: string) => {
    // Handle cancelling appointment
    console.log('Cancel appointment', id);
  };
  
  const handleContact = (id: string, method: 'message' | 'call') => {
    // Handle contacting client
    console.log(`Contact client via ${method}`, id);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText]}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredAppointments.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No {activeTab} appointments</Text>
            <Text style={styles.emptyStateText}>
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming appointments at the moment."
                : activeTab === 'completed'
                ? "You haven't completed any appointments yet."
                : "You don't have any cancelled appointments."}
            </Text>
          </View>
        ) : (
          filteredAppointments.map((appointment) => (
            <Card key={appointment.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <View style={styles.clientInfo}>
                  <Image 
                    source={{ uri: appointment.clientAvatar }} 
                    style={styles.clientAvatar} 
                  />
                  <View>
                    <Text style={styles.clientName}>{appointment.clientName}</Text>
                    <Text style={styles.serviceName}>{appointment.service}</Text>
                  </View>
                </View>
                
                <View style={[
                  styles.statusBadge, 
                  { 
                    backgroundColor: 
                      appointment.status === 'confirmed' ? '#4CAF5015' : 
                      appointment.status === 'pending' ? '#FF980015' :
                      appointment.status === 'completed' ? Colors.primary + '15' :
                      '#F4433615'
                  }
                ]}>
                  <Text style={[
                    styles.statusText, 
                    { 
                      color: 
                        appointment.status === 'confirmed' ? '#4CAF50' : 
                        appointment.status === 'pending' ? '#FF9800' :
                        appointment.status === 'completed' ? Colors.primary :
                        '#F44336'
                    }
                  ]}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.appointmentDetails}>
                <View style={styles.detailItem}>
                  <CalendarIcon size={16} color={Colors.textSecondary} />
                  <Text style={styles.detailText}>{appointment.date}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Clock size={16} color={Colors.textSecondary} />
                  <Text style={styles.detailText}>{appointment.time} ({appointment.duration})</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <DollarSign size={16} color={Colors.textSecondary} />
                  <Text style={styles.detailText}>${appointment.price}</Text>
                </View>
              </View>
              
              <View style={styles.appointmentActions}>
                {appointment.status === 'pending' && (
                  <>
                    <Button
                      title="Accept"
                      variant="primary"
                      size="small"
                      onPress={() => handleAccept(appointment.id)}
                      style={styles.actionButton}
                      icon={<CheckCircle size={16} color="#fff" />}
                      iconPosition="left"
                    />
                    <Button
                      title="Decline"
                      variant="outline"
                      size="small"
                      onPress={() => handleDecline(appointment.id)}
                      style={styles.actionButton}
                      icon={<XCircle size={16} color={Colors.error} />}
                      iconPosition="left"
                      textStyle={{ color: Colors.error }}
                    />
                  </>
                )}
                
                {appointment.status === 'confirmed' && (
                  <>
                    <Button
                      title="Complete"
                      variant="primary"
                      size="small"
                      onPress={() => handleComplete(appointment.id)}
                      style={styles.actionButton}
                      icon={<CheckCircle size={16} color="#fff" />}
                      iconPosition="left"
                    />
                    <Button
                      title="Cancel"
                      variant="outline"
                      size="small"
                      onPress={() => handleCancel(appointment.id)}
                      style={styles.actionButton}
                      icon={<XCircle size={16} color={Colors.error} />}
                      iconPosition="left"
                      textStyle={{ color: Colors.error }}
                    />
                  </>
                )}
                
                {(appointment.status === 'confirmed' || appointment.status === 'pending') && (
                  <View style={styles.contactActions}>
                    <TouchableOpacity 
                      style={styles.contactButton}
                      onPress={() => handleContact(appointment.id, 'message')}
                    >
                      <MessageCircle size={20} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.contactButton}
                      onPress={() => handleContact(appointment.id, 'call')}
                    >
                      <Phone size={20} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: Layout.spacing.l,
    marginTop: Layout.spacing.m,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Layout.borderRadius.pill,
    padding: 4,
    marginBottom: Layout.spacing.m,
  },
  tab: {
    flex: 1,
    paddingVertical: Layout.spacing.s,
    alignItems: 'center',
    borderRadius: Layout.borderRadius.pill,
  },
  activeTab: {
    backgroundColor: Colors.card,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.primary,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.xl,
  },
  appointmentCard: {
    marginBottom: Layout.spacing.m,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Layout.spacing.s,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  serviceName: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xxs,
    borderRadius: Layout.borderRadius.small,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  appointmentDetails: {
    marginBottom: Layout.spacing.m,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: Layout.spacing.s,
  },
  appointmentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: Layout.spacing.s,
  },
  contactActions: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  contactButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Layout.spacing.s,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.xl * 2,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.s,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 250,
  },
});