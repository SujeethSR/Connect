import { Platform, Pressable } from "react-native";
import React, { useContext } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const ios = Platform.OS === "ios";

import { Image } from "expo-image";
import { blurhash } from "../constants";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/authcontext";

const HomeHeader = () => {
  const { user } = useContext(AuthContext);
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  return (
    <Pressable
      style={{
        position: "absolute",
        top: top,
        left: wp(5),
        zIndex: 100,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      onPress={() => {
        router.push("/profile");
      }}
    >
      <Image
        style={{
          height: hp(6),
          aspectRatio: 1,
          borderRadius: 100,
          backgroundColor: "#0553",
        }}
        source={
          user?.profileUrl
            ? user?.profileUrl
            : "https://cdn3d.iconscout.com/3d/premium/thumb/user-3711728-3105450.png?f=webp"
        }
        placeholder={blurhash}
        transition={500}
      />
    </Pressable>
  );
};

export default HomeHeader;
