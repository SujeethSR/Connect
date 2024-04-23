import { Image } from "expo-image";
import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../constants";
import dayjs from "dayjs";
import RNText from "./RNText";
import { Button } from "react-native-paper";
import Colors from "../constants/Colors";
import { router } from "expo-router";

var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);
const Item = ({ name, gender, profileUrl, email, id }) => (
  <TouchableOpacity
    style={{
      marginBottom: 10,
      flex: 1,
      alignItems: "center",
    }}
  >
    <View
      style={{
        marginBottom: 5,
        width: wp(92),
        height: hp(10),
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: "#111",
        gap: 5,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Image
        style={{
          height: "75%",
          borderRadius: 100,
          aspectRatio: 1,
        }}
        source={profileUrl}
        placeholder={blurhash}
        transition={500}
      />
      <View
        style={{
          marginLeft: 10,
        }}
      >
        <RNText
          font={"M-Black"}
          style={{
            fontSize: 18,
            textAlign: "left",
          }}
        >
          {name}
        </RNText>
        <RNText
          font={"M-Medium"}
          style={{
            fontSize: 12,
            textAlign: "left",
          }}
        >
          {email}
        </RNText>
      </View>

      <Button
        style={{
          backgroundColor: Colors.yellow,
          borderRadius: 10,
          width: 100,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          position: "absolute",
          borderWidth: 1,
          borderBottomWidth: 3.5,
          borderColor: "#111",
          right: 9,
        }}
        onPress={() => {
          router.push({
            pathname: "chat",
            params: {
              name: name,
              id: id,
              profileUrl: profileUrl,
            },
          });
        }}
        textColor="#111"
      >
        <RNText
          font={"M-Bold"}
          style={{
            fontSize: 14,
          }}
        >
          Message
        </RNText>
      </Button>
    </View>
  </TouchableOpacity>
);

// the filter
const FriendsList = (props) => {
  const renderItem = (item) => {
    if (props.searchPhrase === "") {
      return (
        <Item
          key={item.id}
          name={item.name}
          image={item.image}
          gender={item.gender}
          profileUrl={item.profileUrl}
          email={item.email}
          id={item.id}
        />
      );
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          key={item.id}
          name={item.name}
          image={item.image}
          gender={item.gender}
          profileUrl={item.profileUrl}
          email={item.email}
          id={item.id}
        />
      );
    }
  };

  return (
    <View
      style={{
        paddingBottom: 60,
      }}
    >
      {props.data.length > 0
        ? props.data.map((item) => renderItem(item))
        : null}
    </View>
  );
};

export default FriendsList;
