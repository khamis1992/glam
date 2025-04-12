import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Share2, 
  ChevronRight, 
  Check,
  ArrowLeft
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { products } from '@/mocks/products';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const productId = parseInt(id as string, 10);
  
  const product = products.find(p => p.id === productId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  
  // Find related products (same category)
  const relatedProducts = product 
    ? products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];
  
  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Product not found</Text>
          <Button 
            title="Go Back to Products" 
            onPress={() => router.push('/products')}
            variant="primary"
            style={styles.errorButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: product.name,
          headerShown: true,
          headerBackTitle: "Products"
        }} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          
          {product.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}
          
          <View style={styles.imageActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                size={20} 
                color={isFavorite ? Colors.primary : Colors.textSecondary} 
                fill={isFavorite ? Colors.primary : 'transparent'}
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.productName}>{product.name}</Text>
            
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star}
                    size={16} 
                    color="#FFD700" 
                    fill={star <= Math.floor(product.rating) ? "#FFD700" : "transparent"}
                  />
                ))}
              </View>
              <Text style={styles.ratingText}>
                {product.rating} ({product.reviews} reviews)
              </Text>
            </View>
            
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              {product.originalPrice > product.price && (
                <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
              )}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                disabled={selectedQuantity <= 1}
              >
                <Text style={[
                  styles.quantityButtonText,
                  selectedQuantity <= 1 && styles.quantityButtonDisabled
                ]}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{selectedQuantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton}
                onPress={() => setSelectedQuantity(selectedQuantity + 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <View style={styles.tagsContainer}>
              {product.tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Category:</Text>
              <Text style={styles.detailValue}>{product.category}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Availability:</Text>
              <View style={styles.availabilityContainer}>
                <View style={[
                  styles.availabilityDot,
                  { backgroundColor: product.inStock ? '#4CAF50' : '#F44336' }
                ]} />
                <Text style={styles.detailValue}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Text>
              </View>
            </View>
          </View>
          
          {relatedProducts.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>You May Also Like</Text>
                <TouchableOpacity onPress={() => router.push('/products')}>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.relatedProductsContainer}
              >
                {relatedProducts.map(relatedProduct => (
                  <TouchableOpacity 
                    key={relatedProduct.id}
                    style={styles.relatedProductCard}
                    onPress={() => router.push(`/products/${relatedProduct.id}`)}
                  >
                    <Card elevation="low">
                      <Image 
                        source={{ uri: relatedProduct.image }} 
                        style={styles.relatedProductImage} 
                      />
                      <View style={styles.relatedProductInfo}>
                        <Text style={styles.relatedProductName} numberOfLines={1}>
                          {relatedProduct.name}
                        </Text>
                        <Text style={styles.relatedProductPrice}>
                          ${relatedProduct.price.toFixed(2)}
                        </Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>
            ${(product.price * selectedQuantity).toFixed(2)}
          </Text>
        </View>
        
        <Button 
          title="Add to Cart" 
          onPress={() => {
            // Add to cart functionality would go here
            // For now, just navigate back to products
            router.push('/products');
          }}
          variant="primary"
          size="large"
          icon={<ShoppingBag size={18} color="#fff" />}
          style={styles.addToCartButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 350,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: Layout.spacing.m,
    left: Layout.spacing.m,
    backgroundColor: Colors.primary,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.small,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageActions: {
    position: 'absolute',
    top: Layout.spacing.m,
    right: Layout.spacing.m,
    flexDirection: 'column',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentContainer: {
    padding: Layout.spacing.l,
  },
  header: {
    marginBottom: Layout.spacing.l,
  },
  brand: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.xs,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.s,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  stars: {
    flexDirection: 'row',
    marginRight: Layout.spacing.s,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
  },
  originalPrice: {
    fontSize: 16,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
    marginLeft: Layout.spacing.s,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.m,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  quantityButtonDisabled: {
    color: Colors.textLight,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: Layout.spacing.m,
    minWidth: 30,
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.m,
  },
  tag: {
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.pill,
    marginRight: Layout.spacing.s,
    marginBottom: Layout.spacing.s,
  },
  tagText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.s,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Layout.spacing.xs,
  },
  relatedProductsContainer: {
    paddingRight: Layout.spacing.l,
  },
  relatedProductCard: {
    width: 140,
    marginRight: Layout.spacing.m,
  },
  relatedProductImage: {
    width: '100%',
    height: 140,
    borderRadius: Layout.borderRadius.small,
  },
  relatedProductInfo: {
    marginTop: Layout.spacing.s,
  },
  relatedProductName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
  },
  relatedProductPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.l,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.card,
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  addToCartButton: {
    flex: 2,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.xl,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.l,
  },
  errorButton: {
    minWidth: 200,
  },
});