import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Colors from "../../constants/Colors";
import HomeHeader from "../../components/HomeHeader";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

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
        }}
      >
        <Tabs.Screen
          name="messages"
          options={{
            headerTitle: "Messages",
            title: "Messages",
            headerTitleAlign: "center",
            //change header font family
            headerTitleStyle: {
              fontFamily: "Poppins-Bold",
            },
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
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontFamily: "Poppins-Bold",
            },
            // add icon at the right side of the header
            headerRight: () => (
              <AntDesign
                name="addusergroup"
                size={28}
                color={Colors.primary}
                style={{ marginRight: 20 }}
                onPress={() => {
                  console.log("add user group");
                }}
              />
            ),

            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="groups" size={size + 5} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
