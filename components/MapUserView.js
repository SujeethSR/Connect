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
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { goToMaps } from "../constants/helpers";
import dayjs from "dayjs";
import RNText from "./RNText";
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
            user?.profileUrl ||
            "https://cdn3d.iconscout.com/3d/premium/thumb/user-3711728-3105450.png?f=webp"
          }
          placeholder={blurhash}
          transition={500}
        />
        <RNText className="absolute bottom-0 left-0 w-full text-center text-white text-[10px] p-1 bg-black px-3 py-1 rounded">
          Show on Map
        </RNText>
      </TouchableOpacity>
      <View
        className="p-2 gap-2 flex-1 justify-between "
        style={{
          backgroundColor: "#ffffff",
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Pressable
          className="items-center justify-center flex-row gap-2"
          onPress={() => {
            goToMaps({
              latitude: user?.location?.latitude,
              longitude: user?.location?.longitude,
            });
          }}
        >
          {user?.location && (
            <RNText className="text-gray-500 text-xs ">
              <FontAwesome5 name="history" size={10} color="#1a73e8" />{" "}
              {dayjs(user?.location?.timestamp?.seconds * 1000).fromNow()}
            </RNText>
          )}
          <FontAwesome5 name="directions" size={22} color="#1a73e8" />
        </Pressable>
        <RNText className=" text-xl text-center" font={"Poppins-Medium"}>
          {user.name}{" "}
        </RNText>

        <View className="flex-row justify-between">
          <Pressable
            className="bg-blue-500 rounded-md ml-auto"
            onPress={() => {
              router.push({
                pathname: "chat",
                params: {
                  name: user.name,
                  id: user.id,
                  profileUrl: user.profileUrl,
                },
              });
            }}
          >
            <RNText
              className="text-white  tracking-wide text-sm text-center rounded-md"
              style={{ padding: 6 }}
            >
              Message
            </RNText>
          </Pressable>
          <Pressable
            className="bg-black rounded-md  "
            onPress={() => {
              // set the user to the router params and navigate to profile route
              // router.push(
              //   "/profile?friend=" +
              //     user.name +
              //     "&id=" +
              //     user.id +
              //     "&profileUrl=" +
              //     user?.profileUrl +
              //     "&phone=" +
              //     user?.phone +
              //     "&about=" +
              //     user?.about +
              //     "&gender = " +
              //     user?.gender
              // );
              router.push({
                pathname: "profile",
                params: {
                  friend: user.name,
                  id: user.id,
                  profileUrl: user?.profileUrl,
                  phone: user?.phone,
                  bio: user?.bio,
                },
              });
            }}
          >
            <RNText
              className="text-white  tracking-wide text-sm text-center rounded-md"
              style={{ padding: 6 }}
            >
              View Profile
            </RNText>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MapUserView;
