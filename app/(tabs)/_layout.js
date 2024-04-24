import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import Colors from "../../constants/Colors";
import { Entypo } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: Colors.primary },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveBackgroundColor: Colors.primary,
          tabBarActiveBackgroundColor: Colors.background,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          tabBarItemStyle: {
            backgroundColor: Colors.primary,
            color: Colors.primary,
          },
          tabBarLabelStyle: {
            fontFamily: "M-ExtraBold",
            fontSize: 8,
          },
          headerShadowVisible: false,
          // tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.yellow,
        }}
      >
        <Tabs.Screen
          name="friends"
          options={{
            headerTitle: "Friends",
            title: "Friends",
            headerTitleStyle: {
              fontFamily: "M-ExtraBold",
              fontSize: 36,
            },
            headerStyle: {
              backgroundColor: Colors.yellow,
            },

            tabBarIcon: ({ size, color }) => (
              <Ionicons name="people-outline" size={size + 4} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            headerTitle: "Chat",
            title: "Chat",
            headerTitleStyle: {
              fontFamily: "M-ExtraBold",
              fontSize: 36,
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
            headerTitleStyle: {
              fontFamily: "M-ExtraBold",
              fontSize: 36,
            },
            // add icon at the right side of the header

            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="account-group-outline"
                size={size + 5}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="menu"
          options={{
            headerTitle: "Menu",
            title: "Menu",
            headerTitleStyle: {
              fontFamily: "M-ExtraBold",
              fontSize: 36,
            },

            headerRight: () => (
              <MaterialCommunityIcons
                name="close"
                size={24}
                style={{
                  marginRight: 20,
                }}
                color="black"
                onPress={() => {
                  router.replace("/messages");
                }}
              />
            ),
            tabBarIcon: ({ size, color }) => (
              <FontAwesome5 name="user-circle" size={size + 3} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
