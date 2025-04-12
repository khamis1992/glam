import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle
} from 'react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'subtle';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {};
    
    // Variant styles
    switch (variant) {
      case 'primary':
        buttonStyle = styles.primaryButton;
        break;
      case 'secondary':
        buttonStyle = styles.secondaryButton;
        break;
      case 'outline':
        buttonStyle = styles.outlineButton;
        break;
      case 'text':
        buttonStyle = styles.textButton;
        break;
      case 'subtle':
        buttonStyle = styles.subtleButton;
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        buttonStyle = { ...buttonStyle, ...styles.smallButton };
        break;
      case 'medium':
        buttonStyle = { ...buttonStyle, ...styles.mediumButton };
        break;
      case 'large':
        buttonStyle = { ...buttonStyle, ...styles.largeButton };
        break;
    }
    
    // Disabled state
    if (disabled) {
      buttonStyle = { ...buttonStyle, ...styles.disabledButton };
    }
    
    // Full width
    if (fullWidth) {
      buttonStyle = { ...buttonStyle, ...styles.fullWidth };
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyleVar: TextStyle = {};
    
    switch (variant) {
      case 'primary':
        textStyleVar = styles.primaryText;
        break;
      case 'secondary':
        textStyleVar = styles.secondaryText;
        break;
      case 'outline':
        textStyleVar = styles.outlineText;
        break;
      case 'text':
        textStyleVar = styles.textButtonText;
        break;
      case 'subtle':
        textStyleVar = styles.subtleText;
        break;
    }
    
    switch (size) {
      case 'small':
        textStyleVar = { ...textStyleVar, ...styles.smallText };
        break;
      case 'medium':
        textStyleVar = { ...textStyleVar, ...styles.mediumText };
        break;
      case 'large':
        textStyleVar = { ...textStyleVar, ...styles.largeText };
        break;
    }
    
    if (disabled) {
      textStyleVar = { ...textStyleVar, ...styles.disabledText };
    }
    
    return textStyleVar;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'text' || variant === 'subtle' ? Colors.primary : '#fff'} 
        />
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <>
          {icon}
          <Text style={[getTextStyle(), textStyle, styles.textWithIcon]}>{title}</Text>
        </>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <>
          <Text style={[getTextStyle(), textStyle, styles.textWithIcon]}>{title}</Text>
          {icon}
        </>
      );
    }

    return <Text style={[getTextStyle(), textStyle]}>{title}</Text>;
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Variant styles
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: Layout.borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    borderRadius: Layout.borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderRadius: Layout.borderRadius.pill,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  subtleButton: {
    backgroundColor: `${Colors.primary}15`,
    borderRadius: Layout.borderRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  // Size styles
  smallButton: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.m,
    minHeight: 32,
  },
  mediumButton: {
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.l,
    minHeight: 44,
  },
  largeButton: {
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.xl,
    minHeight: 52,
  },
  
  // Text styles
  primaryText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryText: {
    color: '#fff',
    fontWeight: '600',
  },
  outlineText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  textButtonText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  subtleText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  
  // Text sizes
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  
  // States
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
  
  // Width
  fullWidth: {
    width: '100%',
  },

  // Icon spacing
  textWithIcon: {
    marginHorizontal: Layout.spacing.s,
  },
});