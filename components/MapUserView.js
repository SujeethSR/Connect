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
import { router } from "expo-router";
import { goToMaps } from "../constants/helpers";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const MapUserView = ({ user, index, handleInfoClick }) => {
  return (
    <View
      className="rounded-lg flex-row relative"
      style={{
        width: wp(88),
        height: hp(16),
        margin: 5,
        borderRadius: 10,
      }}
    >
      <Pressable
        className="absolute top-4 z-10 items-center justify-center"
        style={{ right: 10 }}
        onPress={() => {
          goToMaps({
            latitude: user?.location?.latitude,
            longitude: user?.location?.longitude,
          });
        }}
      >
        {user?.location && (
          <Text className=" text-gray-500 text-xs mb-4">
            ({dayjs(user?.location?.timestamp?.seconds * 1000).fromNow()})
          </Text>
        )}
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
          source={
            user?.profileUrl || "https://picsum.photos/seed/696/3000/2000"
          }
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
        <Text className="font-bold text-lg">{user.name} </Text>

        <Text className="text-xs">
          Major:
          <Text className="font-bold">
            {user?.location?.timestamp?.seconds}
          </Text>
        </Text>
        <View className="flex-row justify-between">
          <Pressable
            className="bg-black rounded-md ml-auto"
            onPress={() => {
              router.push(
                "/chat?name=" +
                  user.name +
                  "&id=" +
                  user.id +
                  "&profileUrl=" +
                  user?.profileUrl
              );
            }}
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
            onPress={() => {
              // set the user to the router params and navigate to profile route
              router.push("/profile?friend=" + user.name);
            }}
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
