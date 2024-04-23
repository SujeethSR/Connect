import React, { useContext, useState } from "react";
import { View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import RNText from "../../components/RNText";
import Colors from "../../constants/Colors";
import { Button } from "react-native-paper";
import { Image } from "expo-image";
import OnboardingImg from "../../assets/app/onboarding.png";

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
          style={{ width: wp(80), aspectRatio: 1 }}
        />
      </View>
      <RNText
        font={"M-ExtraBold"}
        style={{
          marginTop: hp(7),
          fontSize: 31.5,
          lineHeight: 35,
          textAlign: "center",
        }}
      >
        Find People
      </RNText>
      <RNText
        style={{
          fontSize: 17.5,
          lineHeight: 24.5,
          textAlign: "center",
          flex: 1,
        }}
        font={"M-Medium"}
      >
        Join connect to find like-minded individuals to foster professional
        growth together.
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
            backgroundColor: Colors.secondary,
            width: wp(40),
            borderRadius: 6,
            borderColor: Colors.primary,
            borderWidth: 2,
          }}
          mode="outlined"
          onPress={() => router.push("/signin")}
        >
          <RNText
            font={"M-Bold"}
            style={{
              fontSize: 15.75,
              lineHeight: 24.5,
              color: "#000",
              textAlign: "center",
            }}
          >
            Skip
          </RNText>
        </Button>
        <Button
          style={{
            backgroundColor: Colors.primary,
            width: wp(40),
            borderRadius: 6,
          }}
          mode="contained"
          onPress={() => router.push("/onboarding2")}
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
            Next
          </RNText>
        </Button>
      </View>
    </View>
  );
};

export default Onboarding;
