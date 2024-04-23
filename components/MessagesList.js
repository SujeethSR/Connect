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
      style={{
        marginBottom: 15,
        minHeight: 40,
        width: wp(92),
        alignItems: "center",
        flexDirection: "row",
        padding: 3.5,
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
          height: hp(6),
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
          marginLeft: 12,
        }}
      >
        <RNText
          style={{
            fontFamily: "M-Bold",
            fontSize: 17.5,
            lineHeight: 24.5,
          }}
        >
          {name}
        </RNText>
        {lastMessage ? (
          <RNText
            style={{ color: "#374151" }}
            font={"M-Medium"}
            numberOfLines={1}
          >
            {id !== lastMessage?.user._id && (
              <Ionicons name="checkmark" size={16} color={"#2e64e5"} />
            )}
            {lastMessage.text}
          </RNText>
        ) : (
          <RNText style={{ color: "#374151" }} font={"M-Medium"}>
            No messages yet
          </RNText>
        )}
      </View>
      <RNText style={styles.input}>
        <RNText
          style={{
            fontSize: 10.5,
            lineHeight: 14,
            color: "#6B7280",
            marginBottom: 14,
          }}
        >
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
        ?.toUpperCase()
        .includes(props.searchPhrase?.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item item={item} />;
    }
  };

  return (
    <View
      style={{
        padding: 7,
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
    fontFamily: "M-SemiBold",
    alignSelf: "flex-start",
    color: "#6B7280",
  },
});
