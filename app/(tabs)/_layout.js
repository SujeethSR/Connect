import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import { Text } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { LocationProvider } from "../../context/locationContext";

export default function TabsLayout() {
  return (
    <LocationProvider>
      <HomeHeader />
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: Colors.background },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveBackgroundColor: Colors.background,
          tabBarActiveBackgroundColor: Colors.background,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerShadowVisible: false,
        }}
      >
        <Tabs.Screen
          name="messages"
          options={{
            headerTitle: "Messages",
            title: "Messages",
            tabBarIcon: ({ size, color }) => (
              <Entypo name="chat" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            headerTitle: "Maps",
            headerShown: false,
            title: "Maps",
            tabBarIcon: ({ size, color }) => (
              <Entypo name="map" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="rooms"
          options={{
            headerTitle: "Rooms",
            title: "Rooms",
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="groups" size={size + 5} color={color} />
            ),
          }}
        />
      </Tabs>
    </LocationProvider>
  );
}
