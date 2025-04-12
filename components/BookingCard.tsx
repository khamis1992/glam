import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar, Clock, DollarSign } from 'lucide-react-native';
import { Booking } from '@/types';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import professionals from '@/mocks/professionals';
import Button from './Button';
import Card from './Card';

interface BookingCardProps {
  booking: Booking;
  onCancel: (bookingId: string) => void;
}

export default function BookingCard({ booking, onCancel }: BookingCardProps) {
  const professional = professionals.find(p => p.id === booking.professionalId);
  const service = professional?.services?.find(s => s.id === booking.serviceId);
  
  if (!professional || !service) return null;
  
  const getStatusColor = () => {
    switch (booking.status) {
      case 'confirmed':
        return Colors.success;
      case 'pending':
        return Colors.secondary;
      case 'cancelled':
        return Colors.error;
      case 'completed':
        return Colors.primary;
      default:
        return Colors.textSecondary;
    }
  };
  
  const getStatusText = () => {
    return booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
  };
  
  return (
    <Card elevation="low" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.professionalInfo}>
          <Image 
            source={{ uri: professional.avatar }} 
            style={styles.avatar} 
          />
          <View style={styles.nameContainer}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.professionalName}>with {professional.name}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Calendar size={16} color={Colors.primary} />
          <Text style={styles.detailText}>{booking.date}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Clock size={16} color={Colors.primary} />
          <Text style={styles.detailText}>{booking.time}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <DollarSign size={16} color={Colors.primary} />
          <Text style={styles.detailText}>${booking.price}</Text>
        </View>
      </View>
      
      {(booking.status === 'pending' || booking.status === 'confirmed') && (
        <View style={styles.actions}>
          <Button
            title="Reschedule"
            variant="subtle"
            size="small"
            onPress={() => {}}
            style={styles.rescheduleButton}
          />
          <Button
            title="Cancel"
            variant="outline"
            size="small"
            onPress={() => onCancel(booking.id)}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  professionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Layout.spacing.s,
  },
  nameContainer: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  professionalName: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: Layout.spacing.m,
  },
  detailsContainer: {
    marginBottom: Layout.spacing.m,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: Layout.spacing.s,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Layout.spacing.s,
  },
  rescheduleButton: {
    marginRight: Layout.spacing.s,
  },
});