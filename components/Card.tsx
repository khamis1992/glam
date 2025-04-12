import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'none' | 'low' | 'medium' | 'high';
  variant?: 'default' | 'outlined' | 'filled';
}

export default function Card({
  children,
  style,
  elevation = 'low',
  variant = 'default'
}: CardProps) {
  const getElevationStyle = () => {
    switch (elevation) {
      case 'none':
        return styles.elevationNone;
      case 'low':
        return styles.elevationLow;
      case 'medium':
        return styles.elevationMedium;
      case 'high':
        return styles.elevationHigh;
      default:
        return styles.elevationLow;
    }
  };

  const getVariantStyle = () => {
    switch (variant) {
      case 'outlined':
        return styles.outlined;
      case 'filled':
        return styles.filled;
      default:
        return styles.default;
    }
  };

  return (
    <View style={[
      styles.card,
      getElevationStyle(),
      getVariantStyle(),
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.m,
    backgroundColor: Colors.card,
  },
  // Elevation styles
  elevationNone: {
    shadowOpacity: 0,
    elevation: 0,
  },
  elevationLow: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  elevationMedium: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  elevationHigh: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  // Variant styles
  default: {
    backgroundColor: Colors.card,
  },
  outlined: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filled: {
    backgroundColor: Colors.surfaceVariant,
  },
});