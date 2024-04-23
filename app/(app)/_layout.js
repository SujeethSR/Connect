import React from "react";
import { Stack, router, useRouter, useSegments } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import SafeArea from "../components/SafeArea";

export default AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="contact"
        options={{
          headerTitle: "Contact Us",
          title: "Contact Us",
          headerTitleStyle: {
            fontFamily: "M-ExtraBold",
            fontSize: 36,
          },
        }}
      />
    </Stack>
  );
};
