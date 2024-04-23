import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";

const RNTextInput = ({ ...props }) => {
  return (
    <View>
      <TextInput
        {...props}
        style={{ backgroundColor: "transparent" }}
        underlineColor="transparent"
        mode="outlined"
      />
    </View>
  );
};

export default RNTextInput;
