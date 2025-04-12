import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Search } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import SearchBar from '@/components/SearchBar';
import ProfessionalCard from '@/components/ProfessionalCard';
import CategoryCard from '@/components/CategoryCard';
import Logo from '@/components/Logo';
import professionals from '@/mocks/professionals';
import categories from '@/mocks/categories';
import { LinearGradient } from 'expo-linear-gradient';

type TabType = 'professionals' | 'categories';

export default function ExploreScreen() {
  const params = useLocalSearchParams();
  const initialTab = params.tab as TabType || 'professionals';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [filteredProfessionals, setFilteredProfessionals] = useState(professionals);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProfessionals(professionals);
    } else {
      const query = searchQuery.toLowerCase();
      
      // Filter professionals
      const filteredPros = professionals.filter(
        pro => 
          pro.name.toLowerCase().includes(query) || 
          pro.profession.toLowerCase().includes(query) ||
          pro.location.toLowerCase().includes(query)
      );
      setFilteredProfessionals(filteredPros);
    }
  }, [searchQuery]);
  
  const renderProfessionalsTab = () => (
    <View style={styles.tabContent}>
      {filteredProfessionals.length > 0 ? (
        <FlatList
          data={filteredProfessionals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <ProfessionalCard professional={item} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Logo size="medium" color={Colors.textLight} />
          <Text style={styles.emptyStateText}>
            No professionals found matching "{searchQuery}"
          </Text>
        </View>
      )}
    </View>
  );
  
  const renderCategoriesTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.categoriesGrid}>
        {categories.map(category => (
          <View key={category.id} style={styles.categoryItem}>
            <CategoryCard category={category} variant="icon" />
          </View>
        ))}
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.secondary, Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Find Your Beauty Expert</Text>
        <View style={styles.searchBarContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by name, service, or location..."
          />
        </View>
      </LinearGradient>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'professionals' && styles.activeTab
          ]}
          onPress={() => setActiveTab('professionals')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'professionals' && styles.activeTabText
            ]}
          >
            Professionals
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'categories' && styles.activeTab
          ]}
          onPress={() => setActiveTab('categories')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'categories' && styles.activeTabText
            ]}
          >
            Categories
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'professionals' 
        ? renderProfessionalsTab() 
        : renderCategoriesTab()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: Layout.spacing.l,
    paddingBottom: Layout.spacing.xl + 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: Layout.spacing.m,
  },
  searchBarContainer: {
    marginHorizontal: Layout.spacing.l,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: -25,
    marginHorizontal: Layout.spacing.l,
    backgroundColor: Colors.card,
    borderRadius: 25,
    padding: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: Layout.spacing.l,
  },
  tab: {
    flex: 1,
    paddingVertical: Layout.spacing.s,
    alignItems: 'center',
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
  },
  cardContainer: {
    paddingHorizontal: Layout.spacing.l,
  },
  listContent: {
    paddingBottom: Layout.spacing.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Layout.spacing.m,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.l,
    paddingTop: Layout.spacing.m,
  },
  categoryItem: {
    width: '33%',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
});