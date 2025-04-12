import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/constants/colors';
import { Sparkles } from 'lucide-react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  showTagline?: boolean;
  style?: ViewStyle;
  variant?: 'default' | 'minimal';
}

export default function Logo({ 
  size = 'medium', 
  color = Colors.primary,
  showTagline = false,
  style,
  variant = 'default'
}: LogoProps) {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { fontSize: 22, iconSize: 14, taglineSize: 10 };
      case 'medium':
        return { fontSize: 30, iconSize: 18, taglineSize: 12 };
      case 'large':
        return { fontSize: 38, iconSize: 22, taglineSize: 14 };
      default:
        return { fontSize: 30, iconSize: 18, taglineSize: 12 };
    }
  };

  const { fontSize, iconSize, taglineSize } = getSize();

  if (variant === 'minimal') {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { fontSize, color }]}>G</Text>
          <Sparkles size={iconSize} color={color} style={styles.sparkleIconMinimal} />
        </View>
        
        {showTagline && (
          <Text style={[styles.tagline, { fontSize: taglineSize, color }]}>
            Glamora
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.logoContainer}>
        <Text style={[styles.logoText, { fontSize, color }]}>GLA</Text>
        <View style={styles.iconContainer}>
          <Sparkles size={iconSize} color={color} style={styles.sparkleIcon} />
          <Text style={[styles.logoText, { fontSize, color }]}>M</Text>
        </View>
        <Text style={[styles.logoText, { fontSize, color }]}>ORA</Text>
      </View>
      
      {showTagline && (
        <Text style={[styles.tagline, { fontSize: taglineSize, color }]}>
          Because You Deserve to Shine
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontWeight: '700',
    letterSpacing: 1,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleIcon: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
  },
  sparkleIconMinimal: {
    marginLeft: -5,
  },
  tagline: {
    marginTop: 4,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});