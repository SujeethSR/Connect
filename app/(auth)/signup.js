import React, { useContext, useState } from "react";
import { View, Pressable, Alert, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import CustomKeyboardView from "../../components/CustomKeybordView";
import RNText from "../../components/RNText";
import { Image } from "expo-image";
import LogoImg from "../../assets/app/logo.png";
import RNTextInput from "../../components/RNTextInput";
import Colors from "../../constants/Colors";
import { TextInput } from "react-native-paper";

const SignUp = () => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [hidePassword, setHidePassword] = useState(true);

  const handleSignup = async () => {
    if (email === "" || password === "") {
      Alert.alert("SignUp", "Email and Password are required");
      return;
    }
    if (!email.includes("@mavs.uta.edu")) {
      Alert.alert("SignUp", "Please use your UTA email");
      return;
    }
    setLoading(true);

    let response = await register(email, password);

    setLoading(false);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <View
        style={{
          paddingTop: hp(8),
          paddingHorizontal: wp(5),
          flex: 1,
          gap: 8,
        }}
      >
        <View
          style={{
            height: hp(30),
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={LogoImg} style={{ width: wp(35), aspectRatio: 1 }} />

          <RNText
            font={"M-ExtraBold"}
            style={{
              fontSize: 31.5,
              lineHeight: 35,
              marginTop: 14,
              textAlign: "center",
              position: "absolute",
              bottom: 0,
            }}
          >
            Sign up
          </RNText>
        </View>
        <View
          style={{
            gap: 8,
            marginTop: hp(5),
          }}
        >
          <RNTextInput
            placeholder="Email address"
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            outlineStyle={{
              borderWidth: 2.5,
              borderColor: "#111",
              borderRadius: 10,
            }}
            left={<TextInput.Icon icon="account" />}
          />

          <View
            style={{
              position: "relative",
            }}
          >
            <RNTextInput
              placeholder="Password"
              mode="outlined"
              secureTextEntry={hidePassword ? true : false}
              value={password}
              onChangeText={setPassword}
              outlineStyle={{
                borderWidth: 2.5,
                borderColor: "#111",
                borderRadius: 10,
              }}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={hidePassword ? "eye" : "eye-off"}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
            />
          </View>
          <View>
            {loading ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Loading size={hp(6.5)} />
              </View>
            ) : (
              <Pressable
                style={{
                  backgroundColor: Colors.yellow,
                  borderWidth: 2,
                  borderBottomWidth: 5,
                  borderBottomColor: Colors.primary,
                  borderRadius: 5,
                  padding: 7,
                }}
                onPress={handleSignup}
              >
                <RNText
                  style={{
                    fontSize: hp(2.5),
                    color: "#111",
                    textAlign: "center",
                    padding: 7,
                    borderRadius: 5,
                  }}
                  font={"M-Black"}
                >
                  Sign Up
                </RNText>
              </Pressable>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 2,
              marginTop: 14,
            }}
          >
            <RNText style={{ color: "#6B7280" }} font={"M-Medium"}>
              Already have an account?{" "}
            </RNText>
            <TouchableOpacity
              onPress={() => {
                router.push("/signin");
              }}
            >
              <RNText style={{ color: Colors.red }} font={"M-Bold"}>
                Go here
              </RNText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignUp;
