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
import Loading from "../../components/Loading";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import CustomKeyboardView from "../../components/CustomKeybordView";
import RNText from "../../components/RNText";

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [hidePassword, setHidePassword] = useState(true);

  const handleSignIn = async () => {
    if (email === "" || password === "") {
      Alert.alert("Sign In", "Email and Password are required");
      return;
    }

    setLoading(true);

    let response = await login(email, password);

    setLoading(false);
    if (!response.success) {
      Alert.alert("SignIn", response.msg);
    }

    // Implement your sign-in logic here
  };

  return (
    <CustomKeyboardView>
      <View
        style={{
          paddingTop: hp(8),
          paddingHorizontal: wp(5),
        }}
        className="flex-1 gap-8"
      >
        <View className="flex items-center">
          <SvgXml key={`login`} xml={loginImg} width={200} height={200} />
        </View>
        <RNText className="text-4xl ">Sign In</RNText>
        <View className="flex-1 gap-4">
          <RNText className=" ">Email</RNText>
          <TextInput
            placeholder="test@test.com"
            className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
            value={email}
            onChangeText={setEmail}
          />
          <RNText className=" ">Password</RNText>

          <View className="relative">
            <TextInput
              placeholder="*********"
              secureTextEntry={hidePassword ? true : false}
              className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
              value={password}
              onChangeText={setPassword}
            />

            <Pressable
              onPress={() => {
                router.replace("/forgotpassword");
              }}
            >
              <RNText className="text-right my-1" font={"Poppins-Medium"}>
                Forgot password?
              </RNText>
            </Pressable>

            <Pressable
              onPress={() => {
                setHidePassword(!hidePassword);
              }}
              className="absolute right-5 top-2 z-10"
            >
              {hidePassword ? (
                <AntDesign name="eye" size={20} color="black" />
              ) : (
                <FontAwesome name="eye-slash" size={20} color="black" />
              )}
            </Pressable>
          </View>
          <View>
            {loading ? (
              <View className="flex-row justify-center">
                <Loading size={hp(6.5)} className="" />
              </View>
            ) : (
              <Pressable
                className="bg-blue-500 rounded-md"
                onPress={handleSignIn}
              >
                <RNText
                  style={{ fontSize: hp(2.2) }}
                  className="text-white  tracking-wide text-center p-2 rounded-md"
                >
                  Sign In
                </RNText>
              </Pressable>
            )}
          </View>

          <View className="flex-row justify-between items-center">
            <RNText className="text-gray-500">Don't have an account? </RNText>
            <TouchableOpacity
              onPress={() => {
                router.replace("/signup");
              }}
            >
              <RNText style={{ color: "#3B82F6" }} className="text-blue-500 ">
                Sign Up
              </RNText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignIn;
