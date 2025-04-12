import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, DollarSign } from 'lucide-react-native';
import { Service } from '@/types';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import Card from '@/components/Card';

interface ServiceCardProps {
  service: Service;
  professionalId: string;
}

export default function ServiceCard({ service, professionalId }: ServiceCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/booking?professionalId=${professionalId}&serviceId=${service.id}`);
  };
  
  return (
    <Card variant="outlined" style={styles.card}>
      <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.8}
        style={styles.cardContent}
      >
        <View style={styles.header}>
          <Text style={styles.name}>{service.name}</Text>
          <View style={styles.priceContainer}>
            <DollarSign size={14} color={Colors.primary} />
            <Text style={styles.price}>{service.price}</Text>
          </View>
        </View>
        <Text style={styles.description}>{service.description}</Text>
        <View style={styles.footer}>
          <View style={styles.durationContainer}>
            <Clock size={14} color={Colors.textSecondary} />
            <Text style={styles.duration}>{service.duration}</Text>
          </View>
          <View style={styles.bookNowContainer}>
            <Text style={styles.bookNowText}>Book Now</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.m,
    padding: 0,
  },
  cardContent: {
    padding: Layout.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 2,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.s,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.secondary}10`,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: 12,
  },
  duration: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  bookNowContainer: {
    paddingHorizontal: Layout.spacing.s,
  },
  bookNowText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
});