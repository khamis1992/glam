import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import { Search, Filter, Star, Calendar, DollarSign, CheckCircle, XCircle, Award } from 'lucide-react-native';

// Define types for professional data
interface Professional {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviews: number;
  bookings: number;
  earnings: number;
  status: 'active' | 'pending' | 'inactive';
  featured: boolean;
  joinDate: string;
}

// Mock data for professionals
const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Sophia Williams',
    specialty: 'Bridal Makeup Artist',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    rating: 4.9,
    reviews: 124,
    bookings: 156,
    earnings: 12500,
    status: 'active',
    featured: true,
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Daniel Brown',
    specialty: 'Hair Stylist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    rating: 4.7,
    reviews: 98,
    bookings: 132,
    earnings: 9800,
    status: 'active',
    featured: false,
    joinDate: '2023-02-22'
  },
  {
    id: '3',
    name: 'Michael Chen',
    specialty: 'Makeup Consultant',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    rating: 4.5,
    reviews: 76,
    bookings: 89,
    earnings: 7600,
    status: 'pending',
    featured: false,
    joinDate: '2023-07-10'
  },
  {
    id: '4',
    name: 'Emma Johnson',
    specialty: 'Special Effects Makeup',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    rating: 4.8,
    reviews: 112,
    bookings: 143,
    earnings: 11200,
    status: 'active',
    featured: true,
    joinDate: '2023-03-05'
  },
  {
    id: '5',
    name: 'James Rodriguez',
    specialty: 'Theatrical Makeup',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    rating: 4.6,
    reviews: 87,
    bookings: 102,
    earnings: 8700,
    status: 'inactive',
    featured: false,
    joinDate: '2023-04-18'
  },
  {
    id: '6',
    name: 'Olivia Smith',
    specialty: 'Makeup Educator',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
    rating: 4.9,
    reviews: 135,
    bookings: 167,
    earnings: 13500,
    status: 'active',
    featured: true,
    joinDate: '2023-01-30'
  }
];

export default function ProfessionalManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>(mockProfessionals);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      handleFilter(activeFilter);
    } else {
      const filtered = mockProfessionals.filter(professional => 
        professional.name.toLowerCase().includes(text.toLowerCase()) || 
        professional.specialty.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProfessionals(filtered);
    }
  };

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    let filtered = mockProfessionals;
    
    switch (filter) {
      case 'active':
        filtered = mockProfessionals.filter(professional => professional.status === 'active');
        break;
      case 'pending':
        filtered = mockProfessionals.filter(professional => professional.status === 'pending');
        break;
      case 'inactive':
        filtered = mockProfessionals.filter(professional => professional.status === 'inactive');
        break;
      case 'featured':
        filtered = mockProfessionals.filter(professional => professional.featured);
        break;
      default:
        filtered = mockProfessionals;
    }
    
    setFilteredProfessionals(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return Colors.success;
      case 'pending':
        return Colors.primary;
      case 'inactive':
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };

  const renderProfessionalItem = ({ item }: { item: Professional }) => (
    <Card style={styles.professionalCard}>
      <View style={styles.professionalHeader}>
        <Image 
          source={{ uri: `${item.image}?w=100&h=100&fit=crop&crop=faces` }} 
          style={styles.professionalImage} 
        />
        <View style={styles.professionalInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.professionalName}>{item.name}</Text>
            {item.featured && (
              <View style={styles.featuredBadge}>
                <Award size={12} color={Colors.primary} />
                <Text style={styles.featuredText}>Featured</Text>
              </View>
            )}
          </View>
          <Text style={styles.professionalSpecialty}>{item.specialty}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{item.rating} ({item.reviews} reviews)</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Calendar size={16} color={Colors.primary} />
          <View>
            <Text style={styles.statValue}>{item.bookings}</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
        </View>
        
        <View style={styles.statItem}>
          <DollarSign size={16} color={Colors.success} />
          <View>
            <Text style={styles.statValue}>${item.earnings}</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.joinDateLabel}>Joined: {item.joinDate}</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        {item.status === 'pending' ? (
          <>
            <TouchableOpacity style={[styles.actionButton, styles.approveButton]}>
              <CheckCircle size={16} color="#fff" />
              <Text style={styles.actionButtonText}>Approve</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
              <XCircle size={16} color="#fff" />
              <Text style={styles.actionButtonText}>Reject</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
              <Text style={styles.actionButtonText}>View Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[
              styles.actionButton, 
              item.featured ? styles.unfeaturedButton : styles.featuredButton
            ]}>
              <Award size={16} color="#fff" />
              <Text style={styles.actionButtonText}>
                {item.featured ? 'Unfeature' : 'Feature'}
              </Text>
            </TouchableOpacity>
          </>
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
            placeholder="Search professionals..."
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
        
        <TouchableOpacity 
          style={[styles.filterTab, activeFilter === 'pending' ? styles.activeFilterTab : {}]}
          onPress={() => handleFilter('pending')}
        >
          <Text style={[
            styles.filterTabText, 
            activeFilter === 'pending' ? styles.activeFilterTabText : {}
          ]}>
            Pending
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterTab, activeFilter === 'featured' ? styles.activeFilterTab : {}]}
          onPress={() => handleFilter('featured')}
        >
          <Text style={[
            styles.filterTabText, 
            activeFilter === 'featured' ? styles.activeFilterTabText : {}
          ]}>
            Featured
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredProfessionals}
        renderItem={renderProfessionalItem}
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
  professionalCard: {
    marginBottom: Layout.spacing.m,
  },
  professionalHeader: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.m,
  },
  professionalImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Layout.spacing.m,
  },
  professionalInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.s,
  },
  professionalName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  professionalSpecialty: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
    gap: 2,
  },
  featuredText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.small,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.m,
    paddingTop: Layout.spacing.s,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.s,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  joinDateLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
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
  rejectButton: {
    backgroundColor: Colors.error,
  },
  viewButton: {
    backgroundColor: Colors.primary,
  },
  featuredButton: {
    backgroundColor: '#FFD700',
  },
  unfeaturedButton: {
    backgroundColor: Colors.textSecondary,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});