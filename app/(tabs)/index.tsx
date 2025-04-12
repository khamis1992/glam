import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, ChevronRight, Sparkles, ShoppingBag } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import ProfessionalCard from '@/components/ProfessionalCard';
import CategoryCard from '@/components/CategoryCard';
import Logo from '@/components/Logo';
import OfferCard from '@/components/OfferCard';
import professionals from '@/mocks/professionals';
import categories from '@/mocks/categories';
import offers from '@/mocks/offers';
import { products } from '@/mocks/products';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();
  
  const featuredProfessionals = professionals.filter(pro => pro.featured);
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);
  
  const handleSearchPress = () => {
    router.push('/explore');
  };
  
  const handleSeeAllProfessionals = () => {
    router.push('/explore');
  };
  
  const handleSeeAllCategories = () => {
    router.push('/explore?tab=categories');
  };

  const handleOfferPress = (offerId: string) => {
    router.push(`/offers/${offerId}`);
  };

  const handleProductPress = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const handleSeeAllProducts = () => {
    router.push('/products');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }}
          style={styles.headerBackground}
          imageStyle={styles.headerBackgroundImage}
        >
          <LinearGradient
            colors={['rgba(25, 31, 87, 0.85)', 'rgba(255, 107, 158, 0.85)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Logo size="large" color="#fff" showTagline={true} />
              </View>
              <Text style={styles.tagline}>Discover beauty professionals</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
        
        <TouchableOpacity 
          style={styles.searchBar}
          onPress={handleSearchPress}
          activeOpacity={0.8}
        >
          <Search size={18} color={Colors.primary} />
          <Text style={styles.searchPlaceholder}>
            Find your beauty expert...
          </Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={16} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Special Offers</Text>
            </View>
          </View>
          
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersScrollContent}
          >
            {offers.slice(0, 2).map(offer => (
              <View key={offer.id} style={styles.offerCardContainer}>
                <OfferCard
                  title={offer.title}
                  description={offer.description}
                  discount={offer.discount}
                  imageUrl={offer.imageUrl}
                  expiryDate={offer.expiryDate}
                  onPress={() => handleOfferPress(offer.id)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={16} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Featured Artists</Text>
            </View>
            <TouchableOpacity onPress={handleSeeAllProfessionals}>
              <View style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <ChevronRight size={16} color={Colors.primary} />
              </View>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScrollContent}
          >
            {featuredProfessionals.map(professional => (
              <ProfessionalCard 
                key={professional.id} 
                professional={professional}
                variant="featured"
              />
            ))}
          </ScrollView>
        </View>
        
        {/* New Products Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <ShoppingBag size={16} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Beauty Products</Text>
            </View>
            <TouchableOpacity onPress={handleSeeAllProducts}>
              <View style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <ChevronRight size={16} color={Colors.primary} />
              </View>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScrollContent}
          >
            {featuredProducts.map(product => (
              <TouchableOpacity 
                key={product.id} 
                style={styles.productCard}
                onPress={() => handleProductPress(product.id)}
              >
                <View style={styles.productImageContainer}>
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                  {product.discount > 0 && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{product.discount}% OFF</Text>
                    </View>
                  )}
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productBrand}>{product.brand}</Text>
                  <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
                  <View style={styles.productPriceContainer}>
                    <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                    {product.originalPrice > product.price && (
                      <Text style={styles.productOriginalPrice}>${product.originalPrice.toFixed(2)}</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={16} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Beauty Services</Text>
            </View>
            <TouchableOpacity onPress={handleSeeAllCategories}>
              <View style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <ChevronRight size={16} color={Colors.primary} />
              </View>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollContent}
          >
            {categories.map(category => (
              <CategoryCard 
                key={category.id} 
                category={category}
                variant="image"
              />
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={16} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Popular Near You</Text>
            </View>
            <TouchableOpacity onPress={handleSeeAllProfessionals}>
              <View style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <ChevronRight size={16} color={Colors.primary} />
              </View>
            </TouchableOpacity>
          </View>
          
          {professionals.slice(0, 3).map(professional => (
            <ProfessionalCard 
              key={professional.id} 
              professional={professional}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Layout.spacing.xl,
  },
  headerBackground: {
    height: 220,
    marginBottom: 20,
  },
  headerBackgroundImage: {
    opacity: 0.8,
  },
  headerGradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.l,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: Layout.spacing.m,
  },
  tagline: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
    marginTop: -25,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.m,
    borderRadius: 25,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchPlaceholder: {
    marginLeft: Layout.spacing.s,
    color: Colors.textLight,
    fontSize: 14,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 6,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  featuredScrollContent: {
    paddingLeft: Layout.spacing.l,
    paddingRight: Layout.spacing.s,
  },
  categoriesScrollContent: {
    paddingLeft: Layout.spacing.l,
    paddingRight: Layout.spacing.s,
  },
  offersScrollContent: {
    paddingHorizontal: Layout.spacing.l,
  },
  offerCardContainer: {
    width: 300,
    marginRight: Layout.spacing.m,
  },
  // New product styles
  productsScrollContent: {
    paddingLeft: Layout.spacing.l,
    paddingRight: Layout.spacing.s,
  },
  productCard: {
    width: 150,
    marginRight: Layout.spacing.m,
    backgroundColor: Colors.card,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
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
    paddingHorizontal: Layout.spacing.xs,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.small,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
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
  },
  productPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  productOriginalPrice: {
    fontSize: 12,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
    marginLeft: Layout.spacing.xs,
  },
});