import { Stack } from "expo-router";
import Colors from "@/constants/colors";

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.primary,
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
          title: "Admin Dashboard",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="users" 
        options={{ 
          title: "User Management",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="bookings" 
        options={{ 
          title: "Booking Management",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="professionals" 
        options={{ 
          title: "Professional Management",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="analytics" 
        options={{ 
          title: "Analytics",
          headerBackTitle: "Back",
        }} 
      />
    </Stack>
  );
}