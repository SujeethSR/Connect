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
import Colors from "../constants/Colors";
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const MapUserView = ({ user, index, handleInfoClick }) => {
  return (
    <View
      style={{
        width: wp(88),
        height: hp(16),
        margin: 5,
        borderRadius: 10,
        flexDirection: "row",
        position: "relative",
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
        <RNText
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            padding: 3.5,
            paddingLeft: 3 * 3.5,
            paddingRight: 3 * 3.5,
            borderRadius: 5,
            width: "100%",
            textAlign: "center",
            color: "#ffffff",
            backgroundColor: "#000000",
            fontSize: 10,
          }}
        >
          Show on Map
        </RNText>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: "#ffffff",
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          gap: 2,
          flex: 1,
          justifyContent: "space-between",
          padding: 7,
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
          onPress={() => {
            goToMaps({
              latitude: user?.location?.latitude,
              longitude: user?.location?.longitude,
            });
          }}
        >
          {user?.location && (
            <RNText
              style={{
                color: "#6B7280",
                fontSize: 10.5,
                lineHeight: 14,
              }}
            >
              <FontAwesome5 name="history" size={10} color="#1a73e8" />{" "}
              {dayjs(user?.location?.timestamp?.seconds * 1000).fromNow()}
            </RNText>
          )}
          <FontAwesome5 name="directions" size={22} color="#1a73e8" />
        </Pressable>
        <RNText
          style={{
            fontSize: 17.5,
            lineHeight: 24.5,
            textAlign: "center",
          }}
          font={"M-Medium"}
        >
          {user.name}{" "}
        </RNText>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Pressable
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
            style={{
              backgroundColor: Colors.yellow,
              borderWidth: 2,
              borderBottomWidth: 5,

              borderBottomColor: Colors.primary,
              borderRadius: 5,
              marginLeft: "auto",
            }}
          >
            <RNText
              style={{
                padding: 6,

                color: "#111",
                fontSize: 12.25,
                lineHeight: 17.5,
                textAlign: "center",
                borderRadius: 5,
              }}
              font={"M-Bold"}
            >
              Message
            </RNText>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#111",
              borderRadius: 5,
            }}
            onPress={() => {
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
              style={{
                padding: 6,
                color: "#fff",
                fontSize: 12.25,
                lineHeight: 17.5,
                textAlign: "center",
                borderRadius: 5,
              }}
              font={"M-Bold"}
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
