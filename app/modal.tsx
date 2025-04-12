import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  SafeAreaView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import Logo from '@/components/Logo';

export default function ModalScreen() {
  const params = useLocalSearchParams();
  const screen = params.screen || 'about';
  
  const renderAboutContent = () => (
    <View style={styles.content}>
      <View style={styles.logoContainer}>
        <Logo size="large" showTagline={true} />
      </View>
      
      <Text style={styles.description}>
        Glamora is a premium marketplace connecting clients with top beauty professionals.
        Book appointments with skilled makeup artists, hair stylists, nail technicians,
        estheticians, and more.
      </Text>
      
      <View style={styles.featureSection}>
        <Text style={styles.featureTitle}>Key Features</Text>
        
        <View style={styles.feature}>
          <Text style={styles.featureHeading}>Discover Professionals</Text>
          <Text style={styles.featureText}>
            Browse through a curated selection of beauty experts in your area.
          </Text>
        </View>
        
        <View style={styles.feature}>
          <Text style={styles.featureHeading}>Easy Booking</Text>
          <Text style={styles.featureText}>
            Book appointments with just a few taps and manage your schedule.
          </Text>
        </View>
        
        <View style={styles.feature}>
          <Text style={styles.featureHeading}>Secure Payments</Text>
          <Text style={styles.featureText}>
            Pay securely through the app with various payment options.
          </Text>
        </View>
        
        <View style={styles.feature}>
          <Text style={styles.featureHeading}>Reviews & Ratings</Text>
          <Text style={styles.featureText}>
            Read authentic reviews and see ratings from other clients.
          </Text>
        </View>
      </View>
      
      <Text style={styles.version}>Version 1.0.0</Text>
    </View>
  );
  
  const renderContent = () => {
    switch (screen) {
      case 'about':
        return renderAboutContent();
      case 'favorites':
      case 'settings':
      case 'help':
      case 'editProfile':
        return (
          <View style={styles.content}>
            <Text style={styles.title}>{screen.charAt(0).toUpperCase() + screen.slice(1)}</Text>
            <Text style={styles.description}>
              This screen is under development. Please check back later.
            </Text>
          </View>
        );
      default:
        return renderAboutContent();
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderContent()}
      </ScrollView>
      
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: Layout.spacing.l,
  },
  logoContainer: {
    marginVertical: Layout.spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: Layout.spacing.m,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: Layout.spacing.xl,
    lineHeight: 24,
  },
  featureSection: {
    width: '100%',
    marginBottom: Layout.spacing.xl,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Layout.spacing.m,
    textAlign: 'center',
  },
  feature: {
    marginBottom: Layout.spacing.l,
  },
  featureHeading: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  featureText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  version: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: Layout.spacing.l,
  },
});