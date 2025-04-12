import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  User, 
  Heart, 
  Calendar, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Sparkles,
  Gift,
  CreditCard,
  Bell,
  MapPin,
  Briefcase
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import { useUserStore } from '@/store/user-store';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import Card from '@/components/Card';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useUserStore();
  
  const menuItems = [
    {
      icon: <Heart size={20} color={Colors.primary} />,
      title: 'Favorites',
      count: user?.favorites.length || 0,
      onPress: () => router.push('/modal?screen=favorites'),
    },
    {
      icon: <Calendar size={20} color={Colors.primary} />,
      title: 'Appointments',
      count: user?.bookings.length || 0,
      onPress: () => router.push('/bookings'),
    },
    {
      icon: <Gift size={20} color={Colors.primary} />,
      title: 'Special Offers',
      badge: 'New',
      onPress: () => router.push('/offers'),
    },
    {
      icon: <CreditCard size={20} color={Colors.primary} />,
      title: 'Payment Methods',
      onPress: () => router.push('/modal?screen=payment'),
    },
    {
      icon: <Bell size={20} color={Colors.primary} />,
      title: 'Notifications',
      onPress: () => router.push('/modal?screen=notifications'),
    },
    {
      icon: <MapPin size={20} color={Colors.primary} />,
      title: 'Addresses',
      onPress: () => router.push('/modal?screen=addresses'),
    },
    {
      icon: <Briefcase size={20} color={Colors.primary} />,
      title: 'Professional Dashboard',
      badge: 'Pro',
      onPress: () => router.push('/professional-dashboard'),
    },
    {
      icon: <Settings size={20} color={Colors.primary} />,
      title: 'Settings',
      onPress: () => router.push('/modal?screen=settings'),
    },
    {
      icon: <HelpCircle size={20} color={Colors.primary} />,
      title: 'Help & Support',
      onPress: () => router.push('/modal?screen=help'),
    },
  ];
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={[Colors.secondary, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Logo size="medium" color="#fff" style={styles.logo} />
          
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <User size={40} color="#fff" />
              </View>
            )}
            <TouchableOpacity 
              style={styles.sparkleIcon} 
              onPress={() => router.push('/modal?screen=editProfile')}
            >
              <Sparkles size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.name}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
          
          <Button
            title="Edit Profile"
            variant="outline"
            size="small"
            onPress={() => router.push('/modal?screen=editProfile')}
            style={styles.editButton}
            textStyle={styles.editButtonText}
          />
        </LinearGradient>
        
        <Card style={styles.statsCard}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.bookings.length || 0}</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.favorites.length || 0}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </Card>
        
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.iconContainer}>
                  {item.icon}
                </View>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              
              <View style={styles.menuItemRight}>
                {('count' in item && item.count !== undefined && item.count > 0) && (
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{item.count}</Text>
                  </View>
                )}
                {('badge' in item && item.badge) && (
                  <View style={[
                    styles.newBadge, 
                    item.badge === 'Pro' && styles.proBadge
                  ]}>
                    <Text style={styles.newBadgeText}>{item.badge}</Text>
                  </View>
                )}
                <ChevronRight size={18} color={Colors.textLight} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
          activeOpacity={0.7}
        >
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={styles.tagline}>Because You Deserve to Shine</Text>
        <Text style={styles.versionText}>Glamora v1.0.0</Text>
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
  header: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    marginBottom: Layout.spacing.m,
  },
  avatarContainer: {
    marginBottom: Layout.spacing.m,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  sparkleIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: Layout.spacing.xs,
  },
  email: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: Layout.spacing.m,
  },
  editButton: {
    minWidth: 120,
    backgroundColor: 'transparent',
    borderColor: '#fff',
  },
  editButtonText: {
    color: '#fff',
  },
  statsCard: {
    marginHorizontal: Layout.spacing.l,
    marginTop: -25,
    padding: 0,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Layout.spacing.m,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  menuContainer: {
    marginTop: Layout.spacing.xl,
    paddingHorizontal: Layout.spacing.l,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: Layout.spacing.m,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBadge: {
    backgroundColor: `${Colors.primary}20`,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: 12,
    marginRight: Layout.spacing.s,
  },
  countText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.primary,
  },
  newBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: 12,
    marginRight: Layout.spacing.s,
  },
  proBadge: {
    backgroundColor: Colors.secondary,
  },
  newBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Layout.spacing.xl,
    paddingVertical: Layout.spacing.m,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.error,
    marginLeft: Layout.spacing.s,
  },
  tagline: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: Colors.secondary,
    marginTop: Layout.spacing.l,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.textLight,
    marginTop: Layout.spacing.s,
  },
});