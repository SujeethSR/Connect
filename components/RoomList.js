import { Image } from "expo-image";
import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../constants";
import dayjs from "dayjs";
import { router } from "expo-router";
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const Item = ({ name, details }) => (
  <TouchableOpacity
    className="items-center flex-1"
    style={{
      marginBottom: 10,
    }}
    onPress={() => {
      // router.push("/chat?name=" + name + " Room");
    }}
  >
    <View
      className="items-center"
      style={{
        marginBottom: 5,
        width: wp(45),
        height: hp(20),
      }}
    >
      <Image
        style={{
          height: "100%",
          borderRadius: 10,
          aspectRatio: 1,
          backgroundColor: "#0553",
        }}
        source={
          "https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=" + name
        }
        placeholder={blurhash}
        transition={500}
      />
    </View>
    <Text
      className="text-center"
      style={{
        fontSize: 16,
        fontFamily: "Poppins-Bold",
      }}
    >
      {name}
    </Text>
  </TouchableOpacity>
);

// the filter
const RoomList = (props) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return <Item name={item.name} details={item.details} />;
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} details={item.details} />;
    }
    // filter of the description
    if (
      item.details
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} details={item.details} />;
    }
  };

  return (
    <View
      className="p-2"
      style={{
        paddingBottom: 60,
        paddingHorizontal: 15,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.data}
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
