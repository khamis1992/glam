import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Tag, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import { LinearGradient } from 'expo-linear-gradient';

interface OfferCardProps {
  title: string;
  description: string;
  discount: string;
  imageUrl: string;
  expiryDate: string;
  onPress: () => void;
}

export default function OfferCard({
  title,
  description,
  discount,
  imageUrl,
  expiryDate,
  onPress
}: OfferCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(25, 31, 87, 0.8)', 'rgba(255, 107, 158, 0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.discountBadge}>
            <Tag size={14} color="#fff" />
            <Text style={styles.discountText}>{discount}</Text>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.expiry}>Valid until {expiryDate}</Text>
          </View>
          
          <View style={styles.actionButton}>
            <Text style={styles.actionText}>View Offer</Text>
            <ChevronRight size={16} color="#fff" />
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 180,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
    marginBottom: Layout.spacing.m,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    borderRadius: Layout.borderRadius.medium,
  },
  gradient: {
    flex: 1,
    padding: Layout.spacing.m,
    justifyContent: 'space-between',
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.pill,
  },
  discountText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: Layout.spacing.xs,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: Layout.spacing.xs,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: Layout.spacing.s,
  },
  expiry: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  actionText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
    marginRight: Layout.spacing.xs,
  },
});