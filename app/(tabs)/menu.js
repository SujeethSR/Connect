import { Linking, View } from "react-native";
import React from "react";
import RNText from "../../components/RNText";
import Colors from "../../constants/Colors";
import { router } from "expo-router";

const Menu = () => {
  return (
    <View
      style={{
        paddingTop: 50,
        flex: 1,
        backgroundColor: "#fff",
        gap: 8,
      }}
    >
      <RNText
        style={{
          fontSize: 36,
          textAlign: "center",
        }}
        onPress={() => {
          router.push("/profile");
        }}
        font={"M-Black"}
      >
        Profile
      </RNText>

      <RNText
        style={{
          fontSize: 36,
          color: Colors.red,
          textAlign: "center",
        }}
        onPress={() => {
          router.push("/contact");
        }}
        font={"M-Black"}
      >
        Contact Us
      </RNText>
      <RNText
        style={{
          fontSize: 36,
          color: Colors.green,
          textAlign: "center",
        }}
        onPress={() => {
          // router.push("/contact");
          // navigat user to https://sites.google.com/view/utaconnect/home this link on the web browser
          Linking.openURL("https://sites.google.com/view/uta-connect-privacy-policy/home");
        }}
        font={"M-Black"}
      >
        Privacy Policy
      </RNText>
    </View>
  );
};

export default Menu;
