import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import HomeHeader from "../../components/HomeHeader";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Icon } from "react-native-paper";

export default function TabsLayout() {
  return (
    <>
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
          //hide title from tabs
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="map"
          options={{
            headerTitle: "Home",
            headerShown: false,
            title: "Home",

            tabBarIcon: ({ size, color }) => (
              <Entypo name="map" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            headerTitle: "Messages",
            title: "Messages",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "Poppins-Medium",
            },
            tabBarIcon: ({ size, color }) => (
              <Entypo name="chat" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="rooms"
          options={{
            headerTitle: "Rooms",
            title: "Rooms",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "Poppins-Medium",
            },
            // add icon at the right side of the header

            tabBarIcon: ({ size, color }) => (
              <Icon source="home-group" size={size + 4} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
