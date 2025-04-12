import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingBag, Search, Tag, Filter } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import SearchBar from '@/components/SearchBar';
import { products } from '@/mocks/products';
import { LinearGradient } from 'expo-linear-gradient';

export default function MarketplaceScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Skincare', 'Haircare', 'Makeup', 'Tools', 'Fragrance'];
  
  useEffect(() => {
    filterProducts(searchQuery, activeCategory);
  }, [searchQuery, activeCategory]);
  
  const filterProducts = (query: string, category: string) => {
    let filtered = products;
    
    // Filter by search query
    if (query.trim() !== '') {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(lowercaseQuery) || 
          product.brand.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.category.toLowerCase().includes(lowercaseQuery) ||
          product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    }
    
    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    setFilteredProducts(filtered);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Colors.secondary, Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Beauty Marketplace</Text>
        <View style={styles.searchBarContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search products, brands, or categories..."
          />
        </View>
      </LinearGradient>
      
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                activeCategory === item && styles.activeCategoryChip
              ]}
              onPress={() => setActiveCategory(item)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  activeCategory === item && styles.activeCategoryChipText
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>
      
      <View style={styles.productsContainer}>
        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.productCard}
                onPress={() => router.push(`/products/${item.id}`)}
                activeOpacity={0.9}
              >
                <View style={styles.productImageContainer}>
                  <Image source={{ uri: item.image }} style={styles.productImage} />
                  {item.discount > 0 && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{item.discount}% OFF</Text>
                    </View>
                  )}
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productBrand}>{item.brand}</Text>
                  <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                  <View style={styles.productPriceRow}>
                    <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                    {item.originalPrice > item.price && (
                      <Text style={styles.productOriginalPrice}>${item.originalPrice.toFixed(2)}</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productListContent}
          />
        ) : (
          <View style={styles.emptyState}>
            <ShoppingBag size={48} color={Colors.textLight} />
            <Text style={styles.emptyStateText}>
              No products found matching "{searchQuery}"
            </Text>
          </View>
        )}
      </View>
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
  categoriesContainer: {
    marginTop: Layout.spacing.m,
  },
  categoriesList: {
    paddingHorizontal: Layout.spacing.l,
  },
  categoryChip: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.xs,
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Layout.borderRadius.pill,
    marginRight: Layout.spacing.s,
  },
  activeCategoryChip: {
    backgroundColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  activeCategoryChipText: {
    color: '#fff',
  },
  productsContainer: {
    flex: 1,
    marginTop: Layout.spacing.m,
  },
  productListContent: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.xl,
  },
  productCard: {
    flex: 1,
    margin: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.medium,
    backgroundColor: Colors.card,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    maxWidth: '48%',
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: Layout.spacing.s,
  },
  productBrand: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginVertical: 4,
    height: 40,
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.xs,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  productOriginalPrice: {
    fontSize: 12,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
    marginLeft: Layout.spacing.s,
  },
  discountBadge: {
    position: 'absolute',
    top: Layout.spacing.xs,
    right: Layout.spacing.xs,
    backgroundColor: Colors.primary,
    paddingHorizontal: Layout.spacing.xs,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
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
});