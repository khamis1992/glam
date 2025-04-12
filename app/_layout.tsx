import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "./error-boundary";
import Colors from "@/constants/colors";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
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
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="professional/[id]" 
        options={{ 
          title: "Professional Profile",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="category/[id]" 
        options={{ 
          title: "Category",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="products/index" 
        options={{ 
          title: "Beauty Products",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="products/[id]" 
        options={{ 
          title: "Product Details",
          headerBackTitle: "Products",
        }} 
      />
      <Stack.Screen 
        name="booking" 
        options={{ 
          title: "Book Appointment",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="modal" 
        options={{ 
          presentation: "modal",
          title: "About Glamora",
        }} 
      />
      <Stack.Screen 
        name="admin" 
        options={{ 
          headerShown: false,
        }} 
      />
    </Stack>
  );
}