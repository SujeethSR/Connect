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
      }}
      className="flex-row justify-between"
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
            : "https://picsum.photos/seed/696/3000/2000"
        }
        placeholder={blurhash}
        transition={500}
      />
    </Pressable>
  );
};

export default HomeHeader;
