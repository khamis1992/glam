import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Category } from '@/types';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import { Brush, Scissors, Hand, Sparkles, Flower, Eye } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CategoryCardProps {
  category: Category;
  variant?: 'icon' | 'image';
}

export default function CategoryCard({ 
  category, 
  variant = 'icon' 
}: CategoryCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/category/${category.id}`);
  };
  
  const renderIcon = () => {
    switch (category.icon) {
      case 'brush':
        return <Brush size={24} color={Colors.primary} />;
      case 'scissors':
        return <Scissors size={24} color={Colors.primary} />;
      case 'hand':
        return <Hand size={24} color={Colors.primary} />;
      case 'sparkles':
        return <Sparkles size={24} color={Colors.primary} />;
      case 'flower':
        return <Flower size={24} color={Colors.primary} />;
      case 'eye':
        return <Eye size={24} color={Colors.primary} />;
      default:
        return <Brush size={24} color={Colors.primary} />;
    }
  };
  
  if (variant === 'image') {
    return (
      <TouchableOpacity 
        style={styles.imageCard} 
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <Image 
          source={{ uri: category.image }} 
          style={styles.backgroundImage} 
        />
        <LinearGradient
          colors={['transparent', 'rgba(255, 107, 158, 0.7)']}
          style={styles.overlay}
        >
          <Text style={styles.imageCardText}>{category.name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity 
      style={styles.iconCard} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={styles.iconCardText}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconCard: {
    alignItems: 'center',
    marginHorizontal: Layout.spacing.s,
    width: 80,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 107, 158, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCardText: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  imageCard: {
    width: 140,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: Layout.spacing.m,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCardText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});