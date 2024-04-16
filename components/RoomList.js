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

var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);
const Item = ({ name, image, roomId }) => (
  <TouchableOpacity
    className="items-center flex-1"
    style={{
      marginBottom: 10,
    }}
    onPress={() => {
      router.push(
        "/room?name=" + name + " Room" + "&roomId=" + roomId + "&image=" + image
      );
    }}
  >
    <View
      className="items-center"
      style={{
        marginBottom: 5,
        width: wp(45),
        height: hp(16),
      }}
    >
      <Image
        style={{
          height: "100%",
          borderRadius: 10,
          aspectRatio: 1,
        }}
        source={image}
        placeholder={blurhash}
        transition={500}
      />
    </View>
    <RNText
      className="text-center"
      font={"Poppins-Medium"}
      style={{
        fontSize: 16,
      }}
    >
      {name}
    </RNText>
  </TouchableOpacity>
);

// the filter
const RoomList = (props) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return <Item name={item.name} image={item.image} roomId={item.roomId} />;
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} image={item.image} roomId={item.roomId} />;
    }
  };
  const [value, setValue] = React.useState("");

  return (
    <View
      className="p-2 pt-0"
      style={{
        paddingBottom: 60,
        paddingHorizontal: 15,
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
            value: "",
            label: "All",
          },
          {
            value: "friends",
            label: "Friends",
          },
          {
            value: "community",
            label: "Community",
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
