import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const SearchBar = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar__unclicked}>
        <TextInput
          style={styles.input}
          placeholder="Search with love..."
          value={props.searchPhrase}
          onChangeText={props.setSearchPhrase}
        />

        {props.searchPhrase.length > 0 ? (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ right: 10, position: "absolute" }}
            onPress={() => {
              props.setSearchPhrase("");
            }}
          />
        ) : (
          <Feather
            name="search"
            size={20}
            color="black"
            style={{ right: 10, position: "absolute" }}
          />
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: wp(94),
    position: "relative",
  },
  searchBar__unclicked: {
    padding: 6,
    paddingRight: 20,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    // add bottom border to the search bar
    borderWidth: 1.5,
    borderBottomWidth: 3.5,
    bordereColor: "#111",
  },

  input: {
    fontSize: hp(2.2),
    width: "90%",
    fontWeight: "bold",
    fontFamily: "M-SemiBold",
  },
});
