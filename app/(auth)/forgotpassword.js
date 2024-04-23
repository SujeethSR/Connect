import React, { useContext, useState } from "react";
import { View, Button, Alert, Pressable, ScrollView } from "react-native";
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
import ForgotPass from "../../assets/app/forgot-password.png";
import { Image } from "expo-image";
import RNTextInput from "../../components/RNTextInput";
import { TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useContext(AuthContext);
  const router = useRouter();
  const handleResetPassword = async () => {
    if (!email.includes("@mavs.uta.edu")) {
      Alert.alert("SignUp", "Please use your UTA email");
      return;
    }
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
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          gap: 14,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.yellow,
            paddingTop: hp(8),
            maxHeight: hp(40),
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={ForgotPass}
            style={{ width: wp(67), aspectRatio: 1 }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: wp(5),
            paddingTop: hp(2),
            flex: 1,
            gap: hp(2),
          }}
        >
          <RNText
            font={"M-ExtraBold"}
            style={{
              fontSize: 31.5,
              lineHeight: 35,
              marginTop: 14,
              textAlign: "center",
            }}
          >
            Forgot Password
          </RNText>
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
          <RNText font={"M-Medium"}>
            Please enter your registered email address. You will receive a link
            to create a new password via email.
          </RNText>
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
              <>
                <Pressable
                  onPress={handleResetPassword}
                  style={{
                    backgroundColor: "#111",
                    padding: 7,
                    borderRadius: 5,
                  }}
                >
                  <RNText
                    font={"M-ExtraBold"}
                    style={{
                      fontSize: hp(2.2),
                      color: "#fff",
                      textAlign: "center",
                      padding: 7,
                      borderRadius: 5,
                    }}
                  >
                    Reset
                  </RNText>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: Colors.red,
                    borderWidth: 2,
                    borderBottomWidth: 5,
                    borderBottomColor: Colors.primary,
                    padding: 7,
                    borderRadius: 5,
                    marginTop: 7,
                  }}
                  onPress={() => {
                    router.replace("/signin");
                  }}
                >
                  <RNText
                    font={"M-ExtraBold"}
                    style={{
                      fontSize: hp(2.2),
                      color: "#fff",
                      textAlign: "center",
                      padding: 7,
                      borderRadius: 5,
                    }}
                  >
                    Back
                  </RNText>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
