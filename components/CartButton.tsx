import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  View 
} from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { useCartStore } from '@/store/cart-store';

interface CartButtonProps {
  size?: 'small' | 'medium' | 'large';
  showCount?: boolean;
}

export default function CartButton({ 
  size = 'medium',
  showCount = true 
}: CartButtonProps) {
  const router = useRouter();
  const totalItems = useCartStore((state) => state.getTotalItems());
  
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 18;
      case 'medium':
        return 22;
      case 'large':
        return 26;
      default:
        return 22;
    }
  };
  
  const getBadgeSize = () => {
    switch (size) {
      case 'small':
        return styles.badgeSmall;
      case 'medium':
        return styles.badgeMedium;
      case 'large':
        return styles.badgeLarge;
      default:
        return styles.badgeMedium;
    }
  };
  
  const getBadgeTextSize = () => {
    switch (size) {
      case 'small':
        return styles.badgeTextSmall;
      case 'medium':
        return styles.badgeTextMedium;
      case 'large':
        return styles.badgeTextLarge;
      default:
        return styles.badgeTextMedium;
    }
  };
  
  const handlePress = () => {
    // Navigate to cart page
    // For now, just go to products page
    router.push('/products');
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <ShoppingBag size={getIconSize()} color={Colors.primary} />
      
      {showCount && totalItems > 0 && (
        <View style={[styles.badge, getBadgeSize()]}>
          <Text style={[styles.badgeText, getBadgeTextSize()]}>
            {totalItems > 99 ? '99+' : totalItems}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    right: 0,
    top: 0,
  },
  badgeSmall: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: 2,
  },
  badgeMedium: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 3,
  },
  badgeLarge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  badgeTextSmall: {
    fontSize: 8,
  },
  badgeTextMedium: {
    fontSize: 10,
  },
  badgeTextLarge: {
    fontSize: 12,
  },
});