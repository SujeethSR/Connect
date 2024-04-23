import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import RNText from "../../components/RNText";
import Colors from "../../constants/Colors";
import { Button } from "react-native-paper";
import { Image } from "expo-image";
import OnboardingImg from "../../assets/app/onboarding-2.png";
import ButtonBottom from "../../assets/app/bottom-button.png";

const Onboarding = () => {
  const router = useRouter();

  return (
    <View
      style={{
        paddingTop: hp(8),
        paddingHorizontal: wp(5),
        backgroundColor: Colors.secondary,
        flex: 1,
        gap: 8,
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          source={OnboardingImg}
          style={{ width: wp(75), aspectRatio: 0.815, marginTop: hp(1) }}
        />
      </View>
      <RNText
        font={"M-ExtraBold"}
        style={{
          fontSize: 31.5,
          lineHeight: 35,
          textAlign: "left",
        }}
      >
        Connecting People, Building Communities
      </RNText>
      <RNText
        font={"M-Medium"}
        style={{
          fontSize: 17.5,
          lineHeight: 24.5,
          textAlign: "left",
          flex: 1,
        }}
      >
        Where conversations spark and Connections Flourish
      </RNText>

      <TouchableOpacity
        onPress={() => router.push("/onboarding3")}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Image
          source={ButtonBottom}
          style={{ width: wp(95), height: hp(12) }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding;
