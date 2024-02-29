import React, { useEffect } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
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
    </Stack>
  );
};
