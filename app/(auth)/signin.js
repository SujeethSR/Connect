import React, { useContext, useState } from "react";
import { View, Pressable, Alert, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LogoImg from "../../assets/app/logo.png";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import CustomKeyboardView from "../../components/CustomKeybordView";
import RNText from "../../components/RNText";
import { Image } from "expo-image";
import { TextInput } from "react-native-paper";
import RNTextInput from "../../components/RNTextInput";
import Colors from "../../constants/Colors";

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
            Login
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

            <Pressable
              onPress={() => {
                router.push("/forgotpassword");
              }}
            >
              <RNText
                style={{
                  textAlign: "right",
                  marginTop: 3.5,
                }}
                font={"M-Medium"}
              >
                Forgot password?
              </RNText>
            </Pressable>
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
                  backgroundColor: "#111",
                  borderRadius: 5,
                  padding: 7,
                }}
                onPress={handleSignIn}
              >
                <RNText
                  font={"M-Bold"}
                  style={{
                    fontSize: hp(2.2),
                    color: "#fff",
                    textAlign: "center",
                    padding: 7,
                  }}
                >
                  Sign In
                </RNText>
              </Pressable>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 14,
            }}
          >
            <RNText style={{ color: "#6B7280" }} font={"M-Medium"}>
              You are new?{" "}
            </RNText>
            <TouchableOpacity
              onPress={() => {
                router.push("/signup");
              }}
            >
              <RNText style={{ color: Colors.red }} font={"M-Bold"}>
                Create New
              </RNText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignIn;
