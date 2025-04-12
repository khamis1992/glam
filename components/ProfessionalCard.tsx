import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Star, Heart, MapPin } from 'lucide-react-native';
import { Professional } from '@/types';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import { useUserStore } from '@/store/user-store';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '@/components/Card';

interface ProfessionalCardProps {
  professional: Professional;
  variant?: 'default' | 'featured' | 'compact';
}

export default function ProfessionalCard({ 
  professional, 
  variant = 'default' 
}: ProfessionalCardProps) {
  const router = useRouter();
  const { user, addToFavorites, removeFromFavorites } = useUserStore();
  
  const isFavorite = user?.favorites.includes(professional.id) || false;
  
  const handlePress = () => {
    router.push(`/professional/${professional.id}`);
  };
  
  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(professional.id);
    } else {
      addToFavorites(professional.id);
    }
  };
  
  if (variant === 'featured') {
    return (
      <TouchableOpacity 
        style={styles.featuredCard} 
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <Image 
          source={{ uri: professional.avatar }} 
          style={styles.featuredImage} 
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.featuredOverlay}
        >
          <View style={styles.featuredContent}>
            <Text style={styles.featuredName}>{professional.name}</Text>
            <Text style={styles.featuredProfession}>{professional.profession}</Text>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{professional.rating}</Text>
              <Text style={styles.reviewCount}>({professional.reviewCount})</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={toggleFavorite}
          >
            <Heart 
              size={20} 
              color={isFavorite ? Colors.error : '#fff'} 
              fill={isFavorite ? Colors.error : 'transparent'} 
            />
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  
  if (variant === 'compact') {
    return (
      <TouchableOpacity 
        style={styles.compactCard} 
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: professional.avatar }} 
          style={styles.compactImage} 
        />
        <View style={styles.compactContent}>
          <Text style={styles.compactName}>{professional.name}</Text>
          <Text style={styles.compactProfession}>{professional.profession}</Text>
          <View style={styles.ratingContainer}>
            <Star size={12} color="#FFD700" fill="#FFD700" />
            <Text style={styles.compactRatingText}>{professional.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
  return (
    <Card elevation="medium" style={styles.card}>
      <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.8}
        style={styles.cardTouchable}
      >
        <Image 
          source={{ uri: professional.avatar }} 
          style={styles.image} 
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{professional.name}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <Heart 
                size={18} 
                color={isFavorite ? Colors.error : Colors.textSecondary} 
                fill={isFavorite ? Colors.error : 'transparent'} 
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.profession}>{professional.profession}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{professional.rating}</Text>
            <Text style={styles.reviewCount}>({professional.reviewCount})</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.locationContainer}>
              <MapPin size={12} color={Colors.textSecondary} />
              <Text style={styles.location}>{professional.location}</Text>
            </View>
            {professional.distance && (
              <Text style={styles.distance}>{professional.distance}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  // Default card styles
  card: {
    padding: 0,
    marginBottom: Layout.spacing.m,
    overflow: 'hidden',
  },
  cardTouchable: {
    flexDirection: 'row',
    padding: Layout.spacing.m,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40, // Fully rounded
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  content: {
    flex: 1,
    marginLeft: Layout.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  profession: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.xs,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Layout.spacing.s,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  distance: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  
  // Featured card styles
  featuredCard: {
    width: 280,
    height: 320,
    borderRadius: 25,
    marginRight: Layout.spacing.m,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: Layout.spacing.m,
  },
  featuredContent: {
    marginBottom: Layout.spacing.s,
  },
  featuredName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  featuredProfession: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: Layout.spacing.m,
    right: Layout.spacing.m,
    backgroundColor: 'rgba(255, 107, 158, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  
  // Compact card styles
  compactCard: {
    width: 120,
    marginRight: Layout.spacing.m,
  },
  compactImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Fully rounded
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  compactContent: {
    marginTop: Layout.spacing.xs,
    alignItems: 'center',
  },
  compactName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
  compactProfession: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  compactRatingText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
    marginLeft: 4,
  },
});