import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import { Search, Filter, MoreVertical, UserCheck, UserX } from 'lucide-react-native';

// Define types for user data
interface User {
  id: string;
  name: string;
  email: string;
  type: 'customer' | 'professional';
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  bookings: number;
}

// Mock data for users
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma.j@example.com',
    type: 'customer',
    status: 'active',
    joinDate: '2023-05-12',
    bookings: 8
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    type: 'professional',
    status: 'active',
    joinDate: '2023-04-03',
    bookings: 0
  },
  {
    id: '3',
    name: 'Sophia Williams',
    email: 'sophia.w@example.com',
    type: 'customer',
    status: 'inactive',
    joinDate: '2023-06-22',
    bookings: 3
  },
  {
    id: '4',
    name: 'James Rodriguez',
    email: 'james.r@example.com',
    type: 'professional',
    status: 'pending',
    joinDate: '2023-07-15',
    bookings: 0
  },
  {
    id: '5',
    name: 'Olivia Smith',
    email: 'olivia.s@example.com',
    type: 'customer',
    status: 'active',
    joinDate: '2023-03-30',
    bookings: 12
  },
  {
    id: '6',
    name: 'Daniel Brown',
    email: 'daniel.b@example.com',
    type: 'professional',
    status: 'active',
    joinDate: '2023-02-18',
    bookings: 0
  },
  {
    id: '7',
    name: 'Ava Martinez',
    email: 'ava.m@example.com',
    type: 'customer',
    status: 'active',
    joinDate: '2023-05-05',
    bookings: 5
  }
];

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      handleFilter(activeFilter);
    } else {
      const filtered = mockUsers.filter(user => 
        user.name.toLowerCase().includes(text.toLowerCase()) || 
        user.email.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    let filtered = mockUsers;
    
    switch (filter) {
      case 'customers':
        filtered = mockUsers.filter(user => user.type === 'customer');
        break;
      case 'professionals':
        filtered = mockUsers.filter(user => user.type === 'professional');
        break;
      case 'active':
        filtered = mockUsers.filter(user => user.status === 'active');
        break;
      case 'inactive':
        filtered = mockUsers.filter(user => user.status === 'inactive' || user.status === 'pending');
        break;
      default:
        filtered = mockUsers;
    }
    
    setFilteredUsers(filtered);
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <Card style={styles.userCard}>
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.userDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Type</Text>
          <Text style={[
            styles.detailValue, 
            item.type === 'professional' ? styles.professionalText : {}
          ]}>
            {item.type === 'professional' ? 'Professional' : 'Customer'}
          </Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Status</Text>
          <View style={[
            styles.statusBadge, 
            item.status === 'active' ? styles.activeBadge : 
            item.status === 'inactive' ? styles.inactiveBadge : styles.pendingBadge
          ]}>
            <Text style={styles.statusText}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Joined</Text>
          <Text style={styles.detailValue}>{item.joinDate}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Bookings</Text>
          <Text style={styles.detailValue}>{item.bookings}</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.approveButton]}>
          <UserCheck size={16} color="#fff" />
          <Text style={styles.actionButtonText}>
            {item.status === 'pending' ? 'Approve' : 'Edit'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.suspendButton]}>
          <UserX size={16} color="#fff" />
          <Text style={styles.actionButtonText}>
            {item.status === 'active' ? 'Suspend' : 'Delete'}
          </Text>
        </TouchableOpacity>
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
            placeholder="Search users..."
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
          style={[styles.filterTab, activeFilter === 'customers' ? styles.activeFilterTab : {}]}
          onPress={() => handleFilter('customers')}
        >
          <Text style={[
            styles.filterTabText, 
            activeFilter === 'customers' ? styles.activeFilterTabText : {}
          ]}>
            Customers
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterTab, activeFilter === 'professionals' ? styles.activeFilterTab : {}]}
          onPress={() => handleFilter('professionals')}
        >
          <Text style={[
            styles.filterTabText, 
            activeFilter === 'professionals' ? styles.activeFilterTabText : {}
          ]}>
            Professionals
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterTab, activeFilter === 'active' ? styles.activeFilterTab : {}]}
          onPress={() => handleFilter('active')}
        >
          <Text style={[
            styles.filterTabText, 
            activeFilter === 'active' ? styles.activeFilterTabText : {}
          ]}>
            Active
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
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
  userCard: {
    marginBottom: Layout.spacing.m,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.m,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  moreButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  userDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.m,
  },
  detailItem: {
    width: '50%',
    marginBottom: Layout.spacing.m,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  professionalText: {
    color: Colors.primary,
  },
  statusBadge: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
    alignSelf: 'flex-start',
  },
  activeBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  inactiveBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  pendingBadge: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
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
  approveButton: {
    backgroundColor: Colors.success,
  },
  suspendButton: {
    backgroundColor: Colors.error,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});