import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onSubmit?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search beauty professionals...',
  onClear,
  onSubmit,
}: SearchBarProps) {
  const handleClear = () => {
    onChangeText('');
    if (onClear) onClear();
  };
  
  return (
    <View style={styles.container}>
      <Search size={18} color={Colors.primary} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textLight}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <X size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 25,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: Layout.spacing.s,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    paddingVertical: 8,
  },
  clearButton: {
    padding: Layout.spacing.xs,
  },
});