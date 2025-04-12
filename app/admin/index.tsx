import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Card from '@/components/Card';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import { 
  Users, 
  Calendar, 
  UserCheck, 
  BarChart3, 
  Settings, 
  Bell 
} from 'lucide-react-native';

export default function AdminDashboard() {
  const router = useRouter();
  
  const adminMenuItems = [
    {
      id: 'users',
      icon: <Users size={24} color="#fff" />,
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      route: '/admin/users'
    },
    {
      id: 'bookings',
      icon: <Calendar size={24} color="#fff" />,
      title: 'Booking Management',
      description: 'Monitor and manage all bookings',
      route: '/admin/bookings'
    },
    {
      id: 'professionals',
      icon: <UserCheck size={24} color="#fff" />,
      title: 'Professional Management',
      description: 'Approve and manage service providers',
      route: '/admin/professionals'
    },
    {
      id: 'analytics',
      icon: <BarChart3 size={24} color="#fff" />,
      title: 'Analytics',
      description: 'View platform performance metrics',
      route: '/admin/analytics'
    }
  ];

  const recentAlerts = [
    {
      id: '1',
      title: 'New Professional Registration',
      description: 'Sarah Johnson has registered as a makeup artist',
      time: '10 minutes ago'
    },
    {
      id: '2',
      title: 'Booking Cancellation',
      description: 'A high-value booking was cancelled',
      time: '1 hour ago'
    },
    {
      id: '3',
      title: 'User Report',
      description: 'A professional was reported for inappropriate behavior',
      time: '3 hours ago'
    }
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <Text style={styles.headerSubtitle}>Platform management and oversight</Text>
        </View>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>1,245</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>328</Text>
            <Text style={styles.statLabel}>Professionals</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>867</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>$24.5k</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.menuGrid}>
          {adminMenuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => router.push(item.route)}
            >
              <View style={styles.menuIconContainer}>
                {item.icon}
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        <View style={styles.alertsContainer}>
          {recentAlerts.map((alert) => (
            <Card key={alert.id} style={styles.alertCard}>
              <View style={styles.alertHeader}>
                <Bell size={16} color={Colors.primary} />
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertDescription}>{alert.description}</Text>
            </Card>
          ))}
        </View>

        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={20} color={Colors.textSecondary} />
          <Text style={styles.settingsText}>Admin Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Layout.spacing.l,
    paddingBottom: Layout.spacing.m,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Layout.spacing.m,
    gap: Layout.spacing.m,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: Layout.spacing.m,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginHorizontal: Layout.spacing.l,
    marginTop: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Layout.spacing.m,
    gap: Layout.spacing.m,
  },
  menuItem: {
    backgroundColor: Colors.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    width: '47%',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
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
    lineHeight: 16,
  },
  alertsContainer: {
    padding: Layout.spacing.m,
    gap: Layout.spacing.m,
  },
  alertCard: {
    marginBottom: Layout.spacing.m,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  alertTime: {
    fontSize: 12,
    color: Colors.textLight,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.m,
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
    marginTop: Layout.spacing.m,
    backgroundColor: Colors.muted,
    borderRadius: Layout.borderRadius.medium,
    gap: Layout.spacing.s,
  },
  settingsText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});