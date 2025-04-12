import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Search, Filter, ShoppingBag, Star, Heart, ChevronDown } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import { products } from '@/mocks/products';
import SearchBar from '@/components/SearchBar';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { LinearGradient } from 'expo-linear-gradient';

// Product categories derived from the products data
const productCategories = Array.from(new Set(products.map(product => product.category)));

export default function ProductsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'newest'>('popular');
  
  // Filter products based on search query and selected category
  useEffect(() => {
    let filtered = products;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price_low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, sortBy]);
  
  const handleProductPress = (productId: number) => {
    router.push(`/products/${productId}`);
  };
  
  const renderProductItem = ({ item }: { item: typeof products[0] }) => (
    <TouchableOpacity 
      style={styles.productCard} 
      onPress={() => handleProductPress(item.id)}
      activeOpacity={0.9}
    >
      <Card elevation="low">
        <View style={styles.productImageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          {item.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount}% OFF</Text>
            </View>
          )}
          {item.new && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
          <TouchableOpacity style={styles.favoriteButton}>
            <Heart size={18} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.brandName}>{item.brand}</Text>
          <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.ratingText}>{item.rating} ({item.reviews})</Text>
          </View>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            {item.originalPrice > item.price && (
              <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</Text>
            )}
          </View>
          
          <Button 
            title="Add to Cart" 
            onPress={() => {}} 
            variant="primary" 
            size="small"
            icon={<ShoppingBag size={14} color="#fff" />}
            style={styles.addButton}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ 
        title: "Beauty Products",
        headerShown: true
      }} />
      
      <View style={styles.header}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
        />
        
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            <TouchableOpacity 
              style={[
                styles.categoryChip,
                selectedCategory === null && styles.selectedCategoryChip
              ]}
              onPress={() => setSelectedCategory(null)}
            >
              <Text 
                style={[
                  styles.categoryChipText,
                  selectedCategory === null && styles.selectedCategoryChipText
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            
            {productCategories.map(category => (
              <TouchableOpacity 
                key={category} 
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.selectedCategoryChip
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text 
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category && styles.selectedCategoryChipText
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.sortContainer}>
            <TouchableOpacity 
              style={styles.sortButton}
              onPress={() => {
                // In a real app, this would open a sort options modal or dropdown
                const nextSort = {
                  'popular': 'price_low',
                  'price_low': 'price_high',
                  'price_high': 'newest',
                  'newest': 'popular'
                }[sortBy] as typeof sortBy;
                
                setSortBy(nextSort);
              }}
            >
              <Text style={styles.sortButtonText}>
                Sort: {sortBy === 'popular' ? 'Popular' : 
                       sortBy === 'price_low' ? 'Price: Low to High' : 
                       sortBy === 'price_high' ? 'Price: High to Low' : 'Newest'}
              </Text>
              <ChevronDown size={16} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No products found</Text>
            <Text style={styles.emptyStateText}>Try adjusting your search or filters</Text>
          </View>
        }
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
    padding: Layout.spacing.l,
    paddingBottom: Layout.spacing.m,
  },
  filterContainer: {
    marginTop: Layout.spacing.m,
  },
  categoryScroll: {
    paddingRight: Layout.spacing.l,
  },
  categoryChip: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.xs,
    backgroundColor: Colors.card,
    borderRadius: 20,
    marginRight: Layout.spacing.s,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedCategoryChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  selectedCategoryChipText: {
    color: '#fff',
  },
  sortContainer: {
    marginTop: Layout.spacing.m,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.s,
  },
  sortButtonText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginRight: Layout.spacing.xs,
  },
  productList: {
    padding: Layout.spacing.m,
  },
  productCard: {
    flex: 1,
    margin: Layout.spacing.xs,
    maxWidth: '50%',
    marginBottom: Layout.spacing.m,
  },
  productImageContainer: {
    position: 'relative',
    borderRadius: Layout.borderRadius.small,
    overflow: 'hidden',
    aspectRatio: 0.9,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: Layout.spacing.xs,
    left: Layout.spacing.xs,
    backgroundColor: Colors.primary,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  newBadge: {
    position: 'absolute',
    top: Layout.spacing.xs,
    left: Layout.spacing.xs,
    backgroundColor: Colors.secondary,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: Layout.spacing.xs,
    right: Layout.spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: Layout.spacing.xs,
    borderRadius: 15,
  },
  productInfo: {
    marginTop: Layout.spacing.s,
  },
  brandName: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  originalPrice: {
    fontSize: 12,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
    marginLeft: Layout.spacing.xs,
  },
  addButton: {
    marginTop: Layout.spacing.xs,
  },
  emptyState: {
    padding: Layout.spacing.xl,
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.s,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});