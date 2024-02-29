import React from "react";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome5 } from "@expo/vector-icons";

import { blurhash } from "../constants";
import {
  Linking,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MapUserView = ({ user, index, handleInfoClick }) => {
  return (
    <View
      className="rounded-lg flex-row relative"
      style={{
        width: wp(90),
        height: hp(16),
        margin: 5,
        borderRadius: 10,
      }}
    >
      <Pressable
        className="absolute top-2 z-10"
        style={{ right: 10 }}
        onPress={() => {
          goToMaps({ latitude: user.latitude, longitude: user.longitude });
        }}
      >
        <FontAwesome5 name="directions" size={30} color="#1a73e8" />
      </Pressable>
      <TouchableOpacity
        onPress={() => {
          handleInfoClick(index);
        }}
      >
        <Image
          style={{
            height: "100%",
            aspectRatio: 1,
            borderRadius: 4,
            backgroundColor: "#0553",
          }}
          source="https://picsum.photos/seed/696/3000/2000"
          placeholder={blurhash}
          transition={500}
        />
      </TouchableOpacity>
      <View
        className="p-2 gap-2 flex-1 justify-between "
        style={{
          backgroundColor: "#ffffff",
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Text className="font-bold text-lg">{user.title}</Text>
        <Text className="text-xs">
          Major: <Text className="font-bold">Test 1</Text>
        </Text>
        <View className="flex-row justify-between">
          <Pressable
            className="bg-black rounded-md ml-auto"
            // onPress={handleSignIn}
          >
            <Text
              className="text-white font-bold tracking-wide text-sm text-center rounded-md"
              style={{ padding: 6 }}
            >
              Message
            </Text>
          </Pressable>
          <Pressable
            className="bg-blue-500 rounded-md  "
            // onPress={handleSignIn}
          >
            <Text
              className="text-white font-bold tracking-wide text-sm text-center rounded-md"
              style={{ padding: 6 }}
            >
              View Profile
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MapUserView;
const goToMaps = ({ latitude, longitude }) => {
  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${latitude},${longitude}`;
  const label = "";
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}&dirflg=w&t=m`,
    android: `${scheme}${latLng}(${label})&dirflg=w&t=m`,
  });

  Linking.openURL(url);
};
