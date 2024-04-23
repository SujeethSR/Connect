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
import { SvgXml } from "react-native-svg";
import loginImg from "../../assets/svg/login";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import RNText from "../../components/RNText";
import Colors from "../../constants/Colors";
import { Button } from "react-native-paper";
import { Image } from "expo-image";
import OnboardingImg from "../../assets/app/onboarding-e.png";

const Onboarding = () => {
  const router = useRouter();

  return (
    <View
      style={{
        paddingTop: hp(8),
        paddingHorizontal: wp(5),
        backgroundColor: Colors.red,
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
          style={{ width: wp(78), aspectRatio: 0.9, marginTop: hp(1) }}
        />
      </View>
      <RNText
        font={"M-ExtraBold"}
        style={{
          marginTop: hp(2),
          fontSize: 31.5,
          lineHeight: 35,
          textAlign: "center",
          flex: 1,
          color: "#fff",
        }}
      >
        Find Person Near you
      </RNText>
      <RNText
        font={"M-Medium"}
        style={{
          fontSize: 17.5,
          lineHeight: 24.5,
          textAlign: "center",
          flex: 1,
          color: "#fff",
        }}
      >
        Enhance your chatting exprience with maps at your finger tips
      </RNText>

      <View
        style={{
          justifyContent: "space-around",
          flexDirection: "row",
          marginVertical: 6 * 3.5,
        }}
      >
        <Button
          style={{
            backgroundColor: Colors.primary,
            width: wp(85),
            borderRadius: 6,
          }}
          mode="contained"
          onPress={() => router.push("/signin")}
        >
          <RNText
            font={"M-Bold"}
            style={{
              fontSize: 15.75,
              lineHeight: 24.5,
              color: "#fff",
              textAlign: "center",
            }}
          >
            Get Started
          </RNText>
        </Button>
      </View>
    </View>
  );
};

export default Onboarding;
