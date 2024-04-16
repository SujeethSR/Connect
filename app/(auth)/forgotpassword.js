import React, { useContext, useState } from "react";
import { View, TextInput, Button, Alert, Pressable } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import loginImg from "../../assets/svg/login";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import RNText from "../../components/RNText";
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useContext(AuthContext);
  const router = useRouter();
  const handleResetPassword = async () => {
    //allow email that only have @mavs.uta.edu
    // if (!email.includes("@mavs.uta.edu")) {
    //   Alert.alert("SignUp", "Please use your UTA email");
    //   return;
    // }
    setLoading(true);
    const status = await resetPassword(email);
    setLoading(false);

    if (status.success) {
      Alert.alert(
        "Password Reset Email Sent",
        "Please check your email to reset your password.",
        [
          {
            text: "Go to Sign In",
            onPress: () => router.replace("/signin"),
          },
        ]
      );
    } else {
      Alert.alert("Reset Password", status.message);
    }
  };

  return (
    <View className="flex-1">
      <View
        style={{
          paddingTop: hp(8),
          paddingHorizontal: wp(5),
        }}
        className="flex-1 gap-4"
      >
        <View className="flex items-center">
          <SvgXml key={`login`} xml={loginImg} width={200} height={200} />
        </View>
        <View className="flex items-center">
          <RNText className="text-4xl ">Reset Password</RNText>
        </View>
        <RNText className="">Email</RNText>
        <TextInput
          placeholder="test@test.com"
          className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
          value={email}
          onChangeText={setEmail}
        />
        <RNText className="text-md">
          Please enter your registered email address. You will receive a link to
          create a new password via email.
        </RNText>
        <View>
          {loading ? (
            <View className="flex-row justify-center">
              <Loading size={hp(6.5)} className="" />
            </View>
          ) : (
            <>
              <Pressable
                className="bg-black rounded-md"
                onPress={handleResetPassword}
              >
                <RNText
                  style={{ fontSize: hp(2.2) }}
                  className="text-white  tracking-wide text-center p-2 rounded-md"
                >
                  Reset
                </RNText>
              </Pressable>
              <Pressable
                className="bg-blue-500 rounded-md mt-4"
                onPress={() => {
                  router.replace("/signin");
                }}
              >
                <RNText
                  style={{ fontSize: hp(2.2) }}
                  className="text-white  tracking-wide text-center p-2 rounded-md"
                >
                  Back
                </RNText>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
