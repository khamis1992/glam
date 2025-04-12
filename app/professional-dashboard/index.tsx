import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Calendar, 
  DollarSign, 
  Star, 
  Users, 
  Clock, 
  Settings, 
  Briefcase,
  ChevronRight,
  TrendingUp,
  CalendarClock,
  Palette,
  UserCog
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import Card from '@/components/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { useProfessionalStore } from '@/store/professional-store';
import { formatCurrency } from '@/utils/format';

export default function ProfessionalDashboardScreen() {
  const router = useRouter();
  const { professional } = useProfessionalStore();
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('week');
  
  // Mock data for dashboard metrics
  const metrics = {
    day: {
      earnings: 120,
      appointments: 2,
      newClients: 1,
      completionRate: 100
    },
    week: {
      earnings: 850,
      appointments: 12,
      newClients: 5,
      completionRate: 95
    },
    month: {
      earnings: 3200,
      appointments: 45,
      newClients: 18,
      completionRate: 92
    }
  };
  
  const currentMetrics = metrics[selectedPeriod];
  
  // Mock upcoming appointments
  const upcomingAppointments = [
    {
      id: 'app1',
      clientName: 'Emma Johnson',
      service: 'Bridal Makeup',
      date: 'Today',
      time: '2:00 PM',
      status: 'confirmed'
    },
    {
      id: 'app2',
      clientName: 'Sophia Williams',
      service: 'Special Event Makeup',
      date: 'Tomorrow',
      time: '10:30 AM',
      status: 'confirmed'
    },
    {
      id: 'app3',
      clientName: 'Olivia Davis',
      service: 'Bridal Makeup',
      date: 'Jun 15',
      time: '1:00 PM',
      status: 'pending'
    }
  ];
  
  const menuItems = [
    {
      icon: <CalendarClock size={22} color="#fff" />,
      title: 'Appointments',
      description: 'Manage your schedule',
      route: '/professional-dashboard/appointments',
      color: Colors.primary
    },
    {
      icon: <Palette size={22} color="#fff" />,
      title: 'Services',
      description: 'Edit your offerings',
      route: '/professional-dashboard/services',
      color: '#4CAF50'
    },
    {
      icon: <TrendingUp size={22} color="#fff" />,
      title: 'Earnings',
      description: 'View analytics & payments',
      route: '/professional-dashboard/earnings',
      color: '#FF9800'
    },
    {
      icon: <Clock size={22} color="#fff" />,
      title: 'Availability',
      description: 'Set your working hours',
      route: '/professional-dashboard/availability',
      color: '#2196F3'
    },
    {
      icon: <UserCog size={22} color="#fff" />,
      title: 'Profile',
      description: 'Update your information',
      route: '/professional-dashboard/profile',
      color: '#9C27B0'
    }
  ];
  
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
          <View style={styles.profileSection}>
            <Image 
              source={{ uri: professional?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }} 
              style={styles.profileImage} 
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{professional?.name || 'Sophia Martinez'}</Text>
              <Text style={styles.profileTitle}>{professional?.profession || 'Makeup Artist'}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text style={styles.ratingText}>{professional?.rating || '4.9'}</Text>
                <Text style={styles.reviewCount}>({professional?.reviewCount || '127'} reviews)</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        
        <View style={styles.periodSelector}>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'day' && styles.selectedPeriod]}
            onPress={() => setSelectedPeriod('day')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'day' && styles.selectedPeriodText]}>
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'week' && styles.selectedPeriod]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'week' && styles.selectedPeriodText]}>
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.periodButton, selectedPeriod === 'month' && styles.selectedPeriod]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text style={[styles.periodText, selectedPeriod === 'month' && styles.selectedPeriodText]}>
              Month
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.metricsContainer}>
          <Card style={styles.metricCard}>
            <View style={[styles.metricIconContainer, { backgroundColor: `${Colors.primary}15` }]}>
              <DollarSign size={20} color={Colors.primary} />
            </View>
            <Text style={styles.metricValue}>{formatCurrency(currentMetrics.earnings)}</Text>
            <Text style={styles.metricLabel}>Earnings</Text>
          </Card>
          
          <Card style={styles.metricCard}>
            <View style={[styles.metricIconContainer, { backgroundColor: '#4CAF5015' }]}>
              <Calendar size={20} color="#4CAF50" />
            </View>
            <Text style={styles.metricValue}>{currentMetrics.appointments}</Text>
            <Text style={styles.metricLabel}>Appointments</Text>
          </Card>
          
          <Card style={styles.metricCard}>
            <View style={[styles.metricIconContainer, { backgroundColor: '#2196F315' }]}>
              <Users size={20} color="#2196F3" />
            </View>
            <Text style={styles.metricValue}>{currentMetrics.newClients}</Text>
            <Text style={styles.metricLabel}>New Clients</Text>
          </Card>
          
          <Card style={styles.metricCard}>
            <View style={[styles.metricIconContainer, { backgroundColor: '#FF980015' }]}>
              <TrendingUp size={20} color="#FF9800" />
            </View>
            <Text style={styles.metricValue}>{currentMetrics.completionRate}%</Text>
            <Text style={styles.metricLabel}>Completion</Text>
          </Card>
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          <TouchableOpacity onPress={() => router.push('/professional-dashboard/appointments')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {upcomingAppointments.map((appointment, index) => (
          <Card key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <Text style={styles.appointmentClient}>{appointment.clientName}</Text>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: appointment.status === 'confirmed' ? '#4CAF5015' : '#FF980015' }
              ]}>
                <Text style={[
                  styles.statusText, 
                  { color: appointment.status === 'confirmed' ? '#4CAF50' : '#FF9800' }
                ]}>
                  {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </Text>
              </View>
            </View>
            
            <Text style={styles.appointmentService}>{appointment.service}</Text>
            
            <View style={styles.appointmentFooter}>
              <View style={styles.appointmentTime}>
                <Calendar size={14} color={Colors.textSecondary} />
                <Text style={styles.appointmentTimeText}>{appointment.date}</Text>
              </View>
              
              <View style={styles.appointmentTime}>
                <Clock size={14} color={Colors.textSecondary} />
                <Text style={styles.appointmentTimeText}>{appointment.time}</Text>
              </View>
            </View>
          </Card>
        ))}
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => router.push(item.route)}
            >
              <LinearGradient
                colors={[item.color, shadeColor(item.color, -20)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.menuIconContainer}
              >
                {item.icon}
              </LinearGradient>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper function to darken a color
function shadeColor(color: string, percent: number) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.floor(R * (100 + percent) / 100);
  G = Math.floor(G * (100 + percent) / 100);
  B = Math.floor(B * (100 + percent) / 100);

  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
  const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
  const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

  return "#" + RR + GG + BB;
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
    paddingHorizontal: Layout.spacing.l,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    marginLeft: Layout.spacing.m,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  profileTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 2,
  },
  periodSelector: {
    flexDirection: 'row',
    marginTop: Layout.spacing.l,
    marginHorizontal: Layout.spacing.l,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Layout.borderRadius.pill,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: Layout.spacing.s,
    alignItems: 'center',
    borderRadius: Layout.borderRadius.pill,
  },
  selectedPeriod: {
    backgroundColor: Colors.card,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  selectedPeriodText: {
    color: Colors.primary,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: Layout.spacing.l,
    marginTop: Layout.spacing.l,
  },
  metricCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
    padding: Layout.spacing.m,
  },
  metricIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Layout.spacing.l,
    marginTop: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  appointmentCard: {
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  appointmentClient: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
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
  appointmentService: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.s,
  },
  appointmentFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  appointmentTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.l,
  },
  appointmentTimeText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: Layout.spacing.l,
  },
  menuItem: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});