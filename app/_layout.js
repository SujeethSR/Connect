import React, { useEffect } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import "../global.css";
import { AuthProvider, useAuth } from "../context/authcontext";
// import SafeArea from "../components/SafeArea";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    // check if user is authenticated or not
    if (typeof isAuthenticated === "undefined") return;

    if (isAuthenticated) {
      router.replace("/map");
    } else if (isAuthenticated === false) {
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
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

export default RootLayout;
