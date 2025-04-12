import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import BookingCard from '@/components/BookingCard';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { useUserStore } from '@/store/user-store';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, Clock, CheckCircle, ArrowLeft } from 'lucide-react-native';

export default function BookingsScreen() {
  const router = useRouter();
  const { user, cancelBooking } = useUserStore();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  const upcomingBookings = user?.bookings.filter(
    booking => booking.status === 'pending' || booking.status === 'confirmed'
  ) || [];
  
  const pastBookings = user?.bookings.filter(
    booking => booking.status === 'completed' || booking.status === 'cancelled'
  ) || [];
  
  const handleCancelBooking = (bookingId: string) => {
    cancelBooking(bookingId);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Logo size="medium" color={Colors.textLight} variant="minimal" />
      <Text style={styles.emptyTitle}>No {activeTab === 'upcoming' ? 'Upcoming' : 'Past'} Bookings</Text>
      <Text style={styles.emptyText}>
        {activeTab === 'upcoming' 
          ? "You don't have any upcoming appointments. Browse services to book your next beauty session."
          : "You don't have any past appointments. Your booking history will appear here."}
      </Text>
      {activeTab === 'upcoming' && (
        <Button
          title="Browse Services"
          variant="primary"
          size="medium"
          onPress={() => router.push('/explore')}
          style={styles.browseButton}
        />
      )}
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: "Your Appointments",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      
      <LinearGradient
        colors={[Colors.secondary, Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Your Appointments</Text>
      </LinearGradient>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Calendar size={16} color={activeTab === 'upcoming' ? Colors.primary : Colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Clock size={16} color={activeTab === 'past' ? Colors.primary : Colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'upcoming' && upcomingBookings.length === 0 && renderEmptyState()}
      {activeTab === 'past' && pastBookings.length === 0 && renderEmptyState()}
      
      {((activeTab === 'upcoming' && upcomingBookings.length > 0) || 
        (activeTab === 'past' && pastBookings.length > 0)) && (
        <FlatList
          data={activeTab === 'upcoming' ? upcomingBookings : pastBookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookingContainer}>
              <BookingCard 
                booking={item} 
                onCancel={handleCancelBooking} 
              />
            </View>
          )}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <View style={styles.headerIconContainer}>
                {activeTab === 'upcoming' ? (
                  <Calendar size={20} color={Colors.primary} />
                ) : (
                  <CheckCircle size={20} color={Colors.primary} />
                )}
              </View>
              <Text style={styles.listHeaderTitle}>
                {activeTab === 'upcoming' ? 'Upcoming Appointments' : 'Appointment History'}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backButton: {
    marginLeft: Layout.spacing.s,
  },
  header: {
    paddingVertical: Layout.spacing.l,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: Layout.spacing.m,
    marginHorizontal: Layout.spacing.l,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Layout.borderRadius.pill,
    padding: 4,
    marginBottom: Layout.spacing.m,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Layout.spacing.s,
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
    marginLeft: Layout.spacing.xs,
  },
  activeTabText: {
    color: Colors.primary,
  },
  listContent: {
    paddingBottom: Layout.spacing.xl,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
  },
  headerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.s,
  },
  listHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  bookingContainer: {
    paddingHorizontal: Layout.spacing.l,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: Layout.spacing.m,
    marginBottom: Layout.spacing.s,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 22,
    marginBottom: Layout.spacing.l,
  },
  browseButton: {
    marginTop: Layout.spacing.m,
  },
});