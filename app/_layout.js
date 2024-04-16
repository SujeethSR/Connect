import React, { useEffect } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import "../global.css";
import { AuthProvider, useAuth } from "../context/authcontext";
import { useFonts } from "expo-font";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    // check if user is authenticated or not
    if (typeof isAuthenticated === "undefined") return;

    if (isAuthenticated) {
      while (router.canGoBack()) {
        // Pop from stack until one element is left
        router.back();
      }
      router.replace("/map");
    } else if (isAuthenticated === false) {
      while (router.canGoBack()) {
        // Pop from stack until one element is left
        router.back();
      }
      router.replace("/signin");
    }
  }, [isAuthenticated]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/signin"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/signup"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/forgotpassword"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(app)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const RootLayout = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#007AFF",
      secondary: "yellow",
    },
  };

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins/Poppins-Thin.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins/Poppins-Black.ttf"),
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </PaperProvider>
  );
};

export default RootLayout;
