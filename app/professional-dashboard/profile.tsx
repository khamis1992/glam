import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  TextInput,
  Image,
  Alert
} from 'react-native';
import { Camera, MapPin, Star, Edit2, Save, Plus } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useProfessionalStore } from '@/store/professional-store';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const { professional, updateProfile } = useProfessionalStore();
  
  const [profileData, setProfileData] = useState({
    name: professional?.name || 'Sophia Martinez',
    profession: professional?.profession || 'Makeup Artist',
    bio: professional?.bio || 'Professional makeup artist with 8+ years of experience in bridal, editorial, and special events makeup. Certified by MAC Cosmetics and trained in the latest techniques.',
    location: professional?.location || 'New York, NY',
    phone: '(212) 555-1234',
    email: 'sophia@glamora.com',
    instagram: '@sophiamakeup',
    website: 'www.sophiamakeup.com'
  });
  
  const [avatar, setAvatar] = useState(professional?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  const [portfolioImages, setPortfolioImages] = useState(professional?.portfolio || [
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1526510747491-58f928ec870f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  ]);
  
  const handleInputChange = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };
  
  const handleSave = () => {
    // In a real app, you would save this to the backend
    updateProfile({
      ...professional,
      name: profileData.name,
      profession: profileData.profession,
      bio: profileData.bio,
      location: profileData.location,
      avatar,
      portfolio: portfolioImages
    });
    
    Alert.alert("Success", "Your profile has been updated.");
  };
  
  const pickImage = async (type: 'avatar' | 'portfolio') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      if (type === 'avatar') {
        setAvatar(result.assets[0].uri);
      } else {
        setPortfolioImages([...portfolioImages, result.assets[0].uri]);
      }
    }
  };
  
  const removePortfolioImage = (index: number) => {
    const newImages = [...portfolioImages];
    newImages.splice(index, 1);
    setPortfolioImages(newImages);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: avatar }} 
              style={styles.avatar} 
            />
            <TouchableOpacity 
              style={styles.editAvatarButton}
              onPress={() => pickImage('avatar')}
            >
              <Camera size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <Text style={styles.profileTitle}>{profileData.profession}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={14} color={Colors.textSecondary} />
              <Text style={styles.location}>{profileData.location}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>{professional?.rating || '4.9'}</Text>
              <Text style={styles.reviewCount}>({professional?.reviewCount || '127'} reviews)</Text>
            </View>
          </View>
        </View>
        
        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={profileData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder="Your full name"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Profession</Text>
            <TextInput
              style={styles.input}
              value={profileData.profession}
              onChangeText={(text) => handleInputChange('profession', text)}
              placeholder="Your profession"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={profileData.location}
              onChangeText={(text) => handleInputChange('location', text)}
              placeholder="Your location"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={profileData.bio}
              onChangeText={(text) => handleInputChange('bio', text)}
              placeholder="Tell clients about yourself and your experience"
              multiline
              numberOfLines={4}
            />
          </View>
        </Card>
        
        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={profileData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              placeholder="Your phone number"
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={profileData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              placeholder="Your email address"
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Instagram</Text>
            <TextInput
              style={styles.input}
              value={profileData.instagram}
              onChangeText={(text) => handleInputChange('instagram', text)}
              placeholder="Your Instagram handle"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Website</Text>
            <TextInput
              style={styles.input}
              value={profileData.website}
              onChangeText={(text) => handleInputChange('website', text)}
              placeholder="Your website URL"
            />
          </View>
        </Card>
        
        <Card style={styles.formCard}>
          <Text style={styles.sectionTitle}>Portfolio</Text>
          <Text style={styles.sectionSubtitle}>
            Showcase your best work to attract more clients
          </Text>
          
          <View style={styles.portfolioContainer}>
            {portfolioImages.map((image, index) => (
              <View key={index} style={styles.portfolioImageContainer}>
                <Image 
                  source={{ uri: image }} 
                  style={styles.portfolioImage} 
                />
                <TouchableOpacity 
                  style={styles.removeImageButton}
                  onPress={() => removePortfolioImage(index)}
                >
                  <Text style={styles.removeImageText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
            
            <TouchableOpacity 
              style={styles.addImageButton}
              onPress={() => pickImage('portfolio')}
            >
              <Plus size={24} color={Colors.primary} />
              <Text style={styles.addImageText}>Add Photo</Text>
            </TouchableOpacity>
          </View>
        </Card>
        
        <Button
          title="Save Profile"
          variant="primary"
          size="large"
          onPress={handleSave}
          icon={<Save size={18} color="#fff" />}
          iconPosition="left"
          style={styles.saveButton}
        />
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
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.xl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Layout.spacing.l,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    marginLeft: Layout.spacing.m,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  profileTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 2,
  },
  formCard: {
    marginBottom: Layout.spacing.l,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.s,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.m,
  },
  formGroup: {
    marginBottom: Layout.spacing.m,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  input: {
    backgroundColor: Colors.surfaceVariant,
    borderRadius: Layout.borderRadius.small,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    fontSize: 14,
    color: Colors.text,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  portfolioContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Layout.spacing.s,
  },
  portfolioImageContainer: {
    position: 'relative',
    width: '31%',
    aspectRatio: 1,
    marginRight: '3.5%',
    marginBottom: Layout.spacing.m,
  },
  portfolioImage: {
    width: '100%',
    height: '100%',
    borderRadius: Layout.borderRadius.medium,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  removeImageText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  addImageButton: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: `${Colors.primary}15`,
    borderRadius: Layout.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
  },
  addImageText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '500',
    marginTop: Layout.spacing.xs,
  },
  saveButton: {
    marginTop: Layout.spacing.m,
  },
});