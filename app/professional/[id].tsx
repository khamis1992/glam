import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  Platform
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { 
  Star, 
  Heart, 
  MapPin, 
  MessageCircle, 
  Share2,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import Button from '@/components/Button';
import ServiceCard from '@/components/ServiceCard';
import professionals from '@/mocks/professionals';
import { useUserStore } from '@/store/user-store';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfessionalProfileScreen() {
  const { id } = useLocalSearchParams();
  const { user, addToFavorites, removeFromFavorites } = useUserStore();
  const [bioExpanded, setBioExpanded] = useState(false);
  
  const professional = professionals.find(p => p.id === id);
  
  if (!professional) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Professional not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const isFavorite = user?.favorites.includes(professional.id) || false;
  
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(professional.id);
    } else {
      addToFavorites(professional.id);
    }
  };
  
  const handleShare = () => {
    // Share functionality would be implemented here
    console.log('Share professional profile');
  };
  
  const handleContact = () => {
    // Contact functionality would be implemented here
    console.log('Contact professional');
  };
  
  const toggleBioExpanded = () => {
    setBioExpanded(!bioExpanded);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={[Colors.secondary, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <Image 
            source={{ uri: professional.avatar }} 
            style={styles.avatar} 
          />
          
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{professional.name}</Text>
            <Text style={styles.profession}>{professional.profession}</Text>
            
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>{professional.rating}</Text>
              <Text style={styles.reviewCount}>({professional.reviewCount} reviews)</Text>
            </View>
            
            <View style={styles.locationContainer}>
              <MapPin size={14} color="#fff" />
              <Text style={styles.location}>{professional.location}</Text>
            </View>
          </View>
        </LinearGradient>
        
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={toggleFavorite}
          >
            <View style={[styles.actionIcon, isFavorite ? styles.favoriteIcon : {}]}>
              <Heart 
                size={20} 
                color={isFavorite ? '#fff' : Colors.primary} 
                fill={isFavorite ? '#fff' : 'transparent'} 
              />
            </View>
            <Text style={styles.actionText}>
              {isFavorite ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleContact}
          >
            <View style={styles.actionIcon}>
              <MessageCircle size={20} color={Colors.primary} />
            </View>
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShare}
          >
            <View style={styles.actionIcon}>
              <Share2 size={20} color={Colors.primary} />
            </View>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
        
        {professional.bio && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={16} color={Colors.primary} />
              <Text style={styles.sectionTitle}>About</Text>
            </View>
            <Text 
              style={styles.bioText}
              numberOfLines={bioExpanded ? undefined : 3}
            >
              {professional.bio}
            </Text>
            {professional.bio.length > 100 && (
              <TouchableOpacity 
                style={styles.expandButton}
                onPress={toggleBioExpanded}
              >
                <Text style={styles.expandButtonText}>
                  {bioExpanded ? 'Show less' : 'Show more'}
                </Text>
                {bioExpanded ? (
                  <ChevronUp size={16} color={Colors.primary} />
                ) : (
                  <ChevronDown size={16} color={Colors.primary} />
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
        
        {professional.portfolio && professional.portfolio.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={16} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Portfolio</Text>
            </View>
            <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.portfolioContainer}
            >
              {professional.portfolio.map((image, index) => (
                <Image 
                  key={index}
                  source={{ uri: image }} 
                  style={styles.portfolioImage} 
                />
              ))}
            </ScrollView>
          </View>
        )}
        
        {professional.services && professional.services.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={16} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Services</Text>
            </View>
            {professional.services.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service}
                professionalId={professional.id}
              />
            ))}
          </View>
        )}
        
        {professional.availability && professional.availability.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles size={16} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Availability</Text>
            </View>
            <View style={styles.availabilityContainer}>
              {professional.availability.map((day, index) => (
                <View key={index} style={styles.availabilityItem}>
                  <Text style={styles.availabilityText}>{day}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Book Appointment"
          variant="primary"
          size="large"
          fullWidth
          onPress={() => console.log('Book appointment')}
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
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
  header: {
    flexDirection: 'row',
    padding: Layout.spacing.l,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
    marginLeft: Layout.spacing.m,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  profession: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: Layout.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Layout.spacing.m,
    marginTop: Layout.spacing.m,
    marginHorizontal: Layout.spacing.l,
    backgroundColor: Colors.card,
    borderRadius: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  favoriteIcon: {
    backgroundColor: Colors.error,
  },
  actionText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  section: {
    padding: Layout.spacing.l,
    marginTop: Layout.spacing.m,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 6,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.s,
  },
  expandButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
  portfolioContainer: {
    paddingRight: Layout.spacing.m,
  },
  portfolioImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginRight: Layout.spacing.m,
  },
  availabilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  availabilityItem: {
    backgroundColor: `${Colors.primary}10`,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: 15,
    marginRight: Layout.spacing.s,
    marginBottom: Layout.spacing.s,
  },
  availabilityText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    padding: Layout.spacing.m,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Platform.select({
      ios: {
        paddingBottom: Layout.spacing.l,
      },
    }),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});