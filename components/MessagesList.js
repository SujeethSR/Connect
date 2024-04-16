import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View, FlatList, Pressable } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../constants";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import RNText from "./RNText";
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const Item = ({ item }) => {
  const { name, id, profileUrl, lastMessage, lastUpdated } = item;
  return (
    <Pressable
      className="mb-3 p-2 flex-row   items-center"
      style={{
        marginBottom: 10,
        minHeight: 40,
        width: wp(100),
      }}
      onPress={() => {
        router.push({
          pathname: "chat",
          params: {
            name,
            id,
            profileUrl,
          },
        });
      }}
    >
      <Image
        style={{
          height: hp(7),
          aspectRatio: 1,
          borderRadius: 50,
        }}
        source={
          profileUrl ||
          "https://cdn3d.iconscout.com/3d/premium/thumb/user-3711728-3105450.png?f=webp"
        }
        placeholder={blurhash}
        transition={200}
      />
      <View
        style={{
          marginLeft: 10,
        }}
      >
        <RNText
          className="text-lg "
          style={{
            fontFamily: "Poppins-Bold",
          }}
        >
          {name}
        </RNText>
        {lastMessage ? (
          <RNText
            className="text-gray-700"
            font={"Poppins-Medium"}
            numberOfLines={1}
          >
            {id !== lastMessage?.user._id && (
              <Ionicons name="checkmark" size={16} color={"#2e64e5"} />
            )}
            {lastMessage.text}
          </RNText>
        ) : (
          <RNText className="text-gray-700" font={"Poppins-Medium"}>
            No messages yet
          </RNText>
        )}
      </View>
      <RNText className="self-start text-gray-500 " style={styles.input}>
        <RNText className=" text-gray-500 text-xs mb-4">
          ({dayjs(lastUpdated).fromNow()})
        </RNText>
      </RNText>
    </Pressable>
  );
};

// the filter
const List = (props) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return <Item item={item} />;
    }
    // filter of the name
    if (
      item.name
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item item={item} />;
    }
    // filter of the description
    if (
      item.lastMessage
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item item={item} />;
    }
  };

  return (
    <View
      className="p-2"
      style={{
        paddingBottom: 60,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.chatId}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  input: {
    fontSize: 12,
    marginLeft: "auto",
    marginRight: 10,
    fontFamily: "Poppins-SemiBold",
  },
});
