import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import { Search, Filter, Calendar, Clock, DollarSign, User, CheckCircle, XCircle } from 'lucide-react-native';

// Define types for booking data
interface Booking {
  id: string;
  service: string;
  customer: string;
  professional: string;
  date: string;
  time: string;
  duration: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  amount: number;
}

// Mock data for bookings
const mockBookings: Booking[] = [
  {
    id: '1',
    service: 'Bridal Makeup',
    customer: 'Emma Johnson',
    professional: 'Sophia Williams',
    date: '2023-08-15',
    time: '10:00 AM',
    duration: '120 min',
    status: 'completed',
    amount: 250
  },
  {
    id: '2',
    service: 'Hair Styling',
    customer: 'Olivia Smith',
    professional: 'Daniel Brown',
    date: '2023-08-16',
    time: '2:30 PM',
    duration: '60 min',
    status: 'upcoming',
    amount: 120
  },
  {
    id: '3',
    service: 'Makeup Consultation',
    customer: 'Ava Martinez',
    professional: 'Michael Chen',
    date: '2023-08-17',
    time: '11:15 AM',
    duration: '45 min',
    status: 'upcoming',
    amount: 85
  },
  {
    id: '4',
    service: 'Special Occasion Makeup',
    customer: 'Sophia Williams',
    professional: 'James Rodriguez',
    date: '2023-08-14',
    time: '4:00 PM',
    duration: '90 min',
    status: 'cancelled',
    amount: 180
  },
  {
    id: '5',
    service: 'Makeup Lesson',
    customer: 'Michael Chen',
    professional: 'Olivia Smith',
    date: '2023-08-13',
    time: '1:00 PM',
    duration: '120 min',
    status: 'completed',
    amount: 200
  },
  {
    id: '6',
    service: 'Natural Makeup',
    customer: 'James Rodriguez',
    professional: 'Emma Johnson',
    date: '2023-08-18',
    time: '9:30 AM',
    duration: '60 min',
    status: 'upcoming',
    amount: 100
  },
  {
    id: '7',
    service: 'Evening Makeup',
    customer: 'Daniel Brown',
    professional: 'Ava Martinez',
    date: '2023-08-12',
    time: '6:00 PM',
    duration: '75 min',
    status: 'completed',
    amount: 150
  }
];

export default function BookingManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(mockBookings);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      handleFilter(activeFilter);
    } else {
      const filtered = mockBookings.filter(booking => 
        booking.service.toLowerCase().includes(text.toLowerCase()) || 
        booking.customer.toLowerCase().includes(text.toLowerCase()) ||
        booking.professional.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredBookings(filtered);
    }
  };

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    let filtered = mockBookings;
    
    switch (filter) {
      case 'upcoming':
        filtered = mockBookings.filter(booking => booking.status === 'upcoming');
        break;
      case 'completed':
        filtered = mockBookings.filter(booking => booking.status === 'completed');
        break;
      case 'cancelled':
        filtered = mockBookings.filter(booking => booking.status === 'cancelled');
        break;
      default:
        filtered = mockBookings;
    }
    
    setFilteredBookings(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return Colors.primary;
      case 'completed':
        return Colors.success;
      case 'cancelled':
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <Card style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Text style={styles.serviceName}>{item.service}</Text>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <User size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>Customer: {item.customer}</Text>
          </View>
          <View style={styles.detailItem}>
            <User size={16} color={Colors.primary} />
            <Text style={styles.detailText}>Professional: {item.professional}</Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Calendar size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{item.time} ({item.duration})</Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <DollarSign size={16} color={Colors.success} />
            <Text style={styles.detailText}>${item.amount}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        {item.status === 'upcoming' ? (
          <>
            <TouchableOpacity style={[styles.actionButton, styles.completeButton]}>
              <CheckCircle size={16} color="#fff" />
              <Text style={styles.actionButtonText}>Complete</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
              <XCircle size={16} color="#fff" />
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
            <Text style={styles.actionButtonText}>View Details</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bookings..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filterTabs}>
        <TouchableOpacity 
          style={[styles.filterTab, activeFilter === 'all' ? styles.activeFilterTab : {}]}
          onPress={() => handleFilter('all')}
        >
          <Text style={[
            styles.filterTabText, 
            activeFilter === 'all' ? styles.activeFilterTabText : {}
          ]}>
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterTab, activeFilter === 'upcoming' ? styles.activeFilterTab : {}]}
          onPress={() => handleFilter('upcoming')}
        >
          <Text style={[
            styles.filterTabText, 
            activeFilter === 'upcoming' ? styles.activeFilterTabText : {}
          ]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterTab, activeFilter === 'completed' ? styles.activeFilterTab : {}]}
          onPress={() => handleFilter('completed')}
        >
          <Text style={[
            styles.filterTabText, 
            activeFilter === 'completed' ? styles.activeFilterTabText : {}
          ]}>
            Completed
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterTab, activeFilter === 'cancelled' ? styles.activeFilterTab : {}]}
          onPress={() => handleFilter('cancelled')}
        >
          <Text style={[
            styles.filterTabText, 
            activeFilter === 'cancelled' ? styles.activeFilterTabText : {}
          ]}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredBookings}
        renderItem={renderBookingItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: Layout.spacing.m,
    gap: Layout.spacing.s,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Layout.borderRadius.small,
    paddingHorizontal: Layout.spacing.m,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: Layout.spacing.s,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: Colors.text,
  },
  filterButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Layout.borderRadius.small,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.m,
    marginBottom: Layout.spacing.m,
  },
  filterTab: {
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    marginRight: Layout.spacing.s,
    borderRadius: Layout.borderRadius.small,
    backgroundColor: Colors.muted,
  },
  activeFilterTab: {
    backgroundColor: Colors.primary,
  },
  filterTabText: {
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterTabText: {
    color: Colors.card,
  },
  listContainer: {
    padding: Layout.spacing.m,
    gap: Layout.spacing.m,
  },
  bookingCard: {
    marginBottom: Layout.spacing.m,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.small,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bookingDetails: {
    marginBottom: Layout.spacing.m,
    gap: Layout.spacing.s,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.s,
  },
  detailText: {
    fontSize: 14,
    color: Colors.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Layout.spacing.m,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.small,
    gap: Layout.spacing.s,
  },
  completeButton: {
    backgroundColor: Colors.success,
  },
  cancelButton: {
    backgroundColor: Colors.error,
  },
  viewButton: {
    backgroundColor: Colors.primary,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});