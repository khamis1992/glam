import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  SafeAreaView,
  Image
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import ProfessionalCard from '@/components/ProfessionalCard';
import categories from '@/mocks/categories';
import professionals from '@/mocks/professionals';
import { LinearGradient } from 'expo-linear-gradient';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams();
  
  const category = categories.find(c => c.id === id);
  
  // Find professionals that offer services in this category
  const categoryProfessionals = professionals.filter(pro => 
    pro.services?.some(service => service.categoryId === id)
  );
  
  if (!category) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Category not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: category.name }} />
      
      <LinearGradient
        colors={[Colors.secondary, Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Image 
          source={{ uri: category.image }} 
          style={styles.categoryImage} 
        />
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.professionalCount}>
          {categoryProfessionals.length} {categoryProfessionals.length === 1 ? 'Professional' : 'Professionals'}
        </Text>
      </LinearGradient>
      
      <FlatList
        data={categoryProfessionals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ProfessionalCard professional={item} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No professionals found in this category.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: Layout.spacing.l,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: Layout.spacing.s,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: Layout.spacing.xs,
  },
  professionalCount: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  cardContainer: {
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.s,
  },
  listContent: {
    paddingTop: Layout.spacing.m,
    paddingBottom: Layout.spacing.xl,
  },
  emptyContainer: {
    padding: Layout.spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});