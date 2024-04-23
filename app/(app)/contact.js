import { View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import RNText from "../../components/RNText";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { TextInput } from "react-native-paper";
import RNTextInput from "../../components/RNTextInput";
import Loading from "../../components/Loading";
import Colors from "../../constants/Colors";

const Contact = () => {
  const [name, setName] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        gap: heightPercentageToDP(2),
        padding: heightPercentageToDP(3),
      }}
    >
      <RNTextInput
        placeholder="Full Name"
        mode="outlined"
        value={name}
        onChangeText={setName}
        outlineStyle={{
          borderWidth: 2.5,
          borderColor: "#111",
          borderRadius: 10,
        }}
        left={<TextInput.Icon icon="account" />}
      />

      <RNTextInput
        placeholder="Write Your message here"
        mode="outlined"
        value={message}
        onChangeText={setMessage}
        outlineStyle={{
          borderWidth: 2.5,
          borderColor: "#111",
          borderRadius: 10,
        }}
        numberOfLines={5}
        textAlignVertical="center"
        multiline={true}
        left={<TextInput.Icon icon="email-outline" />}
      />
      <View>
        {loading ? (
          <View style={{ justifyContent: "center", flexDirection: "row" }}>
            <Loading size={heightPercentageToDP(6.5)} />
          </View>
        ) : (
          <Pressable
            style={{
              backgroundColor: Colors.yellow,
              borderWidth: 2,
              borderBottomWidth: 5,
              borderBottomColor: Colors.primary,
              borderRadius: 10,
              padding: 7,
            }}
            onPress={() => {
              if (!name || !message) {
                Alert.alert("Error", "Please fill all fields");
                return;
              }
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                Alert.alert("Message Sent", "We will get back to you soon");
                setName("");
                setMessage("");
              }, 1000);
            }}
          >
            <RNText
              font={"M-Black"}
              style={{
                fontSize: heightPercentageToDP(2.5),
                padding: 7,
                borderRadius: 10,
                textAlign: "center",
                color: "black",
              }}
            >
              Send Message
            </RNText>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Contact;
