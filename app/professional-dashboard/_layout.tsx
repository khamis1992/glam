import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function ProfessionalDashboardLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.secondary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Professional Dashboard",
          headerTitleAlign: 'center',
        }} 
      />
      <Stack.Screen 
        name="appointments" 
        options={{ 
          title: "Appointments",
          headerBackTitle: "Dashboard",
        }} 
      />
      <Stack.Screen 
        name="services" 
        options={{ 
          title: "Manage Services",
          headerBackTitle: "Dashboard",
        }} 
      />
      <Stack.Screen 
        name="earnings" 
        options={{ 
          title: "Earnings & Analytics",
          headerBackTitle: "Dashboard",
        }} 
      />
      <Stack.Screen 
        name="availability" 
        options={{ 
          title: "Set Availability",
          headerBackTitle: "Dashboard",
        }} 
      />
      <Stack.Screen 
        name="profile" 
        options={{ 
          title: "Professional Profile",
          headerBackTitle: "Dashboard",
        }} 
      />
    </Stack>
  );
}