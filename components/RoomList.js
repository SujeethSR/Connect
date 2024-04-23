import { Image } from "expo-image";
import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../constants";
import dayjs from "dayjs";
import { router } from "expo-router";
import { SegmentedButtons } from "react-native-paper";
import RNText from "./RNText";
import Colors from "../constants/Colors";

var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);
const Item = ({ name, image, roomId, idx }) => (
  <TouchableOpacity
    style={{
      marginBottom: 10,
      flex: 1,
      alignItems: "center",
    }}
    onPress={() => {
      router.push(
        "/room?name=" + name + " Room" + "&roomId=" + roomId + "&image=" + image
      );
    }}
  >
    <View
      style={{
        marginBottom: 5,
        width: wp(45),
        height: hp(20),
        backgroundColor: getBackgroundColor(idx),
        borderRadius: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: "#111",
        gap: 5,
        alignItems: "center",
      }}
    >
      <Image
        style={{
          height: "75%",
          borderRadius: 10,
          aspectRatio: 1,
        }}
        source={image}
        placeholder={blurhash}
        transition={500}
      />
      <RNText
        font={"M-Bold"}
        style={{
          textAlign: "center",

          fontSize: 16,
        }}
      >
        {name}
      </RNText>
    </View>
  </TouchableOpacity>
);

// the filter
const RoomList = (props) => {
  const renderItem = ({ item }) => {
    if (props.searchPhrase === "") {
      return (
        <Item
          name={item.name}
          image={item.image}
          roomId={item.roomId}
          idx={item.idx}
        />
      );
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(props.searchPhrase?.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          name={item.name}
          image={item.image}
          roomId={item.roomId}
          idx={item.idx}
        />
      );
    }
  };
  const [value, setValue] = React.useState("");

  return (
    <View
      style={{
        paddingBottom: 60,
      }}
    >
      <SegmentedButtons
        style={{
          marginBottom: 15,
        }}
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            labelStyle: {
              fontFamily: "M-Bold",
              color: value === "" ? "white" : "black",
            },
            value: "",

            label: "All",
            style: value === "" && {
              backgroundColor: Colors.blue,
              borderColor: Colors.blue,
            },
          },
          {
            labelStyle: {
              fontFamily: "M-Bold",
              color: value === "friends" ? "white" : "black",
            },
            value: "friends",
            label: "Friends",
            style: value === "friends" && {
              backgroundColor: Colors.green,
              borderColor: Colors.green,
            },
          },
          {
            labelStyle: {
              fontFamily: "M-Bold",
              color: value === "community" ? "white" : "black",
            },
            value: "community",
            label: "Community",
            style: value === "community" && {
              backgroundColor: Colors.red,
              borderColor: Colors.red,
            },
          },
        ]}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.data.filter((item) => item.type === value || value === "")}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        //make two columns and space between them
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
      />
    </View>
  );
};

export default RoomList;

const getBackgroundColor = (number) => {
  const colors = [Colors.yellow, Colors.pink, Colors.red, Colors.green];

  return colors[number % 4];
};
