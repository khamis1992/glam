import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Star,
  Percent,
  UserCheck
} from 'lucide-react-native';

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('month');
  
  const analyticsData = {
    totalUsers: {
      value: 1245,
      change: 12.5,
      increasing: true
    },
    totalProfessionals: {
      value: 328,
      change: 8.3,
      increasing: true
    },
    totalBookings: {
      value: 867,
      change: 15.2,
      increasing: true
    },
    totalRevenue: {
      value: 24500,
      change: 18.7,
      increasing: true
    },
    averageBookingValue: {
      value: 120,
      change: 5.2,
      increasing: true
    },
    cancellationRate: {
      value: 4.2,
      change: 1.5,
      increasing: false
    },
    professionalApprovalRate: {
      value: 82,
      change: 3.1,
      increasing: true
    },
    averageRating: {
      value: 4.7,
      change: 0.2,
      increasing: true
    },
    averageResponseTime: {
      value: 2.5,
      change: 0.8,
      increasing: false
    },
    repeatBookingRate: {
      value: 68,
      change: 4.3,
      increasing: true
    }
  };
  
  const topServices = [
    { name: 'Bridal Makeup', bookings: 156, revenue: 15600 },
    { name: 'Special Occasion Makeup', bookings: 132, revenue: 11880 },
    { name: 'Hair Styling', bookings: 98, revenue: 7840 },
    { name: 'Makeup Lesson', bookings: 76, revenue: 9120 },
    { name: 'Natural Makeup', bookings: 65, revenue: 5200 }
  ];
  
  const topProfessionals = [
    { name: 'Sophia Williams', bookings: 87, revenue: 8700, rating: 4.9 },
    { name: 'Olivia Smith', bookings: 76, revenue: 9120, rating: 4.9 },
    { name: 'Emma Johnson', bookings: 72, revenue: 7920, rating: 4.8 },
    { name: 'Daniel Brown', bookings: 65, revenue: 5850, rating: 4.7 },
    { name: 'Michael Chen', bookings: 58, revenue: 4640, rating: 4.5 }
  ];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Analytics</Text>
          <View style={styles.timeRangeSelector}>
            <TouchableOpacity 
              style={[styles.timeRangeButton, timeRange === 'week' ? styles.activeTimeRange : {}]}
              onPress={() => setTimeRange('week')}
            >
              <Text style={[
                styles.timeRangeText, 
                timeRange === 'week' ? styles.activeTimeRangeText : {}
              ]}>
                Week
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.timeRangeButton, timeRange === 'month' ? styles.activeTimeRange : {}]}
              onPress={() => setTimeRange('month')}
            >
              <Text style={[
                styles.timeRangeText, 
                timeRange === 'month' ? styles.activeTimeRangeText : {}
              ]}>
                Month
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.timeRangeButton, timeRange === 'year' ? styles.activeTimeRange : {}]}
              onPress={() => setTimeRange('year')}
            >
              <Text style={[
                styles.timeRangeText, 
                timeRange === 'year' ? styles.activeTimeRangeText : {}
              ]}>
                Year
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Key Metrics</Text>
        <View style={styles.metricsGrid}>
          <Card style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIconContainer, { backgroundColor: `${Colors.primary}20` }]}>
                <Users size={20} color={Colors.primary} />
              </View>
              <View style={styles.metricChangeContainer}>
                {analyticsData.totalUsers.increasing ? (
                  <ArrowUpRight size={16} color={Colors.success} />
                ) : (
                  <ArrowDownRight size={16} color={Colors.error} />
                )}
                <Text style={[
                  styles.metricChangeText,
                  { color: analyticsData.totalUsers.increasing ? Colors.success : Colors.error }
                ]}>
                  {analyticsData.totalUsers.change}%
                </Text>
              </View>
            </View>
            <Text style={styles.metricValue}>{analyticsData.totalUsers.value}</Text>
            <Text style={styles.metricLabel}>Total Users</Text>
          </Card>
          
          <Card style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIconContainer, { backgroundColor: `${Colors.secondary}20` }]}>
                <UserCheck size={20} color={Colors.secondary} />
              </View>
              <View style={styles.metricChangeContainer}>
                {analyticsData.totalProfessionals.increasing ? (
                  <ArrowUpRight size={16} color={Colors.success} />
                ) : (
                  <ArrowDownRight size={16} color={Colors.error} />
                )}
                <Text style={[
                  styles.metricChangeText,
                  { color: analyticsData.totalProfessionals.increasing ? Colors.success : Colors.error }
                ]}>
                  {analyticsData.totalProfessionals.change}%
                </Text>
              </View>
            </View>
            <Text style={styles.metricValue}>{analyticsData.totalProfessionals.value}</Text>
            <Text style={styles.metricLabel}>Professionals</Text>
          </Card>
          
          <Card style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIconContainer, { backgroundColor: `${Colors.accent}20` }]}>
                <Calendar size={20} color={Colors.accent} />
              </View>
              <View style={styles.metricChangeContainer}>
                {analyticsData.totalBookings.increasing ? (
                  <ArrowUpRight size={16} color={Colors.success} />
                ) : (
                  <ArrowDownRight size={16} color={Colors.error} />
                )}
                <Text style={[
                  styles.metricChangeText,
                  { color: analyticsData.totalBookings.increasing ? Colors.success : Colors.error }
                ]}>
                  {analyticsData.totalBookings.change}%
                </Text>
              </View>
            </View>
            <Text style={styles.metricValue}>{analyticsData.totalBookings.value}</Text>
            <Text style={styles.metricLabel}>Total Bookings</Text>
          </Card>
          
          <Card style={styles.metricCard}>
            <View style={styles.metricHeader}>
              <View style={[styles.metricIconContainer, { backgroundColor: `${Colors.success}20` }]}>
                <DollarSign size={20} color={Colors.success} />
              </View>
              <View style={styles.metricChangeContainer}>
                {analyticsData.totalRevenue.increasing ? (
                  <ArrowUpRight size={16} color={Colors.success} />
                ) : (
                  <ArrowDownRight size={16} color={Colors.error} />
                )}
                <Text style={[
                  styles.metricChangeText,
                  { color: analyticsData.totalRevenue.increasing ? Colors.success : Colors.error }
                ]}>
                  {analyticsData.totalRevenue.change}%
                </Text>
              </View>
            </View>
            <Text style={styles.metricValue}>${(analyticsData.totalRevenue.value / 1000).toFixed(1)}k</Text>
            <Text style={styles.metricLabel}>Total Revenue</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Performance Indicators</Text>
        <View style={styles.indicatorsContainer}>
          <Card style={styles.indicatorCard}>
            <View style={styles.indicatorHeader}>
              <DollarSign size={16} color={Colors.primary} />
              <Text style={styles.indicatorLabel}>Avg. Booking Value</Text>
            </View>
            <View style={styles.indicatorContent}>
              <Text style={styles.indicatorValue}>${analyticsData.averageBookingValue.value}</Text>
              <View style={styles.indicatorChange}>
                {analyticsData.averageBookingValue.increasing ? (
                  <ArrowUpRight size={14} color={Colors.success} />
                ) : (
                  <ArrowDownRight size={14} color={Colors.error} />
                )}
                <Text style={[
                  styles.indicatorChangeText,
                  { color: analyticsData.averageBookingValue.increasing ? Colors.success : Colors.error }
                ]}>
                  {analyticsData.averageBookingValue.change}%
                </Text>
              </View>
            </View>
          </Card>
          
          <Card style={styles.indicatorCard}>
            <View style={styles.indicatorHeader}>
              <Percent size={16} color={Colors.error} />
              <Text style={styles.indicatorLabel}>Cancellation Rate</Text>
            </View>
            <View style={styles.indicatorContent}>
              <Text style={styles.indicatorValue}>{analyticsData.cancellationRate.value}%</Text>
              <View style={styles.indicatorChange}>
                {!analyticsData.cancellationRate.increasing ? (
                  <ArrowUpRight size={14} color={Colors.success} />
                ) : (
                  <ArrowDownRight size={14} color={Colors.error} />
                )}
                <Text style={[
                  styles.indicatorChangeText,
                  { color: !analyticsData.cancellationRate.increasing ? Colors.success : Colors.error }
                ]}>
                  {analyticsData.cancellationRate.change}%
                </Text>
              </View>
            </View>
          </Card>
          
          <Card style={styles.indicatorCard}>
            <View style={styles.indicatorHeader}>
              <UserCheck size={16} color={Colors.success} />
              <Text style={styles.indicatorLabel}>Professional Approval</Text>
            </View>
            <View style={styles.indicatorContent}>
              <Text style={styles.indicatorValue}>{analyticsData.professionalApprovalRate.value}%</Text>
              <View style={styles.indicatorChange}>
                {analyticsData.professionalApprovalRate.increasing ? (
                  <ArrowUpRight size={14} color={Colors.success} />
                ) : (
                  <ArrowDownRight size={14} color={Colors.error} />
                )}
                <Text style={[
                  styles.indicatorChangeText,
                  { color: analyticsData.professionalApprovalRate.increasing ? Colors.success : Colors.error }
                ]}>
                  {analyticsData.professionalApprovalRate.change}%
                </Text>
              </View>
            </View>
          </Card>
          
          <Card style={styles.indicatorCard}>
            <View style={styles.indicatorHeader}>
              <Star size={16} color="#FFD700" />
              <Text style={styles.indicatorLabel}>Average Rating</Text>
            </View>
            <View style={styles.indicatorContent}>
              <Text style={styles.indicatorValue}>{analyticsData.averageRating.value}</Text>
              <View style={styles.indicatorChange}>
                {analyticsData.averageRating.increasing ? (
                  <ArrowUpRight size={14} color={Colors.success} />
                ) : (
                  <ArrowDownRight size={14} color={Colors.error} />
                )}
                <Text style={[
                  styles.indicatorChangeText,
                  { color: analyticsData.averageRating.increasing ? Colors.success : Colors.error }
                ]}>
                  {analyticsData.averageRating.change}
                </Text>
              </View>
            </View>
          </Card>
          
          <Card style={styles.indicatorCard}>
            <View style={styles.indicatorHeader}>
              <Clock size={16} color={Colors.secondary} />
              <Text style={styles.indicatorLabel}>Avg. Response Time</Text>
            </View>
            <View style={styles.indicatorContent}>
              <Text style={styles.indicatorValue}>{analyticsData.averageResponseTime.value}h</Text>
              <View style={styles.indicatorChange}>
                {!analyticsData.averageResponseTime.increasing ? (
                  <ArrowUpRight size={14} color={Colors.success} />
                ) : (
                  <ArrowDownRight size={14} color={Colors.error} />
                )}
                <Text style={[
                  styles.indicatorChangeText,
                  { color: !analyticsData.averageResponseTime.increasing ? Colors.success : Colors.error }
                ]}>
                  {analyticsData.averageResponseTime.change}h
                </Text>
              </View>
            </View>
          </Card>
          
          <Card style={styles.indicatorCard}>
            <View style={styles.indicatorHeader}>
              <TrendingUp size={16} color={Colors.primary} />
              <Text style={styles.indicatorLabel}>Repeat Booking Rate</Text>
            </View>
            <View style={styles.indicatorContent}>
              <Text style={styles.indicatorValue}>{analyticsData.repeatBookingRate.value}%</Text>
              <View style={styles.indicatorChange}>
                {analyticsData.repeatBookingRate.increasing ? (
                  <ArrowUpRight size={14} color={Colors.success} />
                ) : (
                  <ArrowDownRight size={14} color={Colors.error} />
                )}
                <Text style={[
                  styles.indicatorChangeText,
                  { color: analyticsData.repeatBookingRate.increasing ? Colors.success : Colors.error }
                ]}>
                  {analyticsData.repeatBookingRate.change}%
                </Text>
              </View>
            </View>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Top Services</Text>
        <Card style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>Service</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Bookings</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Revenue</Text>
          </View>
          {topServices.map((service, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>{service.name}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{service.bookings}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>${service.revenue}</Text>
            </View>
          ))}
        </Card>

        <Text style={styles.sectionTitle}>Top Professionals</Text>
        <Card style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>Professional</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Bookings</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Rating</Text>
          </View>
          {topProfessionals.map((professional, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>{professional.name}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{professional.bookings}</Text>
              <View style={[styles.ratingCell, { flex: 1 }]}>
                <Star size={12} color="#FFD700" fill="#FFD700" />
                <Text style={styles.tableCell}>{professional.rating}</Text>
              </View>
            </View>
          ))}
        </Card>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.exportButtonText}>Export Report</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: Layout.spacing.m,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.muted,
    borderRadius: Layout.borderRadius.medium,
    padding: 4,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: Layout.spacing.s,
    alignItems: 'center',
    borderRadius: Layout.borderRadius.small,
  },
  activeTimeRange: {
    backgroundColor: Colors.card,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  activeTimeRangeText: {
    color: Colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginHorizontal: Layout.spacing.l,
    marginTop: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Layout.spacing.m,
    gap: Layout.spacing.m,
  },
  metricCard: {
    width: '47%',
    padding: Layout.spacing.m,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  metricIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricChangeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  indicatorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Layout.spacing.m,
    gap: Layout.spacing.m,
  },
  indicatorCard: {
    width: '47%',
    padding: Layout.spacing.m,
  },
  indicatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.s,
    marginBottom: Layout.spacing.s,
  },
  indicatorLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  indicatorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicatorValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  indicatorChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorChangeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tableCard: {
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
    padding: 0,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.muted,
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tableCell: {
    fontSize: 14,
    color: Colors.text,
  },
  ratingCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footer: {
    padding: Layout.spacing.l,
    alignItems: 'center',
  },
  exportButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.l,
    borderRadius: Layout.borderRadius.medium,
  },
  exportButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});