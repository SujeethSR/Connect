import React, { useState, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import RoomList from "../../components/RoomList";
import { fakeData } from "../../constants/data";
import {
  Button,
  FAB,
  Modal,
  Portal,
  SegmentedButtons,
  TextInput,
} from "react-native-paper";
import { Image } from "expo-image";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import RoomsImage from "../../components/RoomsImage";
import { AuthContext } from "../../context/authcontext";
import { blurhash } from "../../constants";
import { db } from "../../firebase";
import {
  Timestamp,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import FriendsList from "../../components/FriendsList";
import Colors from "../../constants/Colors";

const Rooms = () => {
  const { user } = useContext(AuthContext);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const [users, setUsers] = useState([]);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "users"), where("id", "!=", user.id)),
        (snapshot) => {
          const snapMessages = snapshot.docs.map((doc) => {
            const { id, name, gender, profileUrl, email } = doc.data();

            return {
              id,
              name,
              gender,
              profileUrl,
              email,
            };
          });
          setUsers(snapMessages);
        }
      ),
    []
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.yellow,
        paddingHorizontal: 13,
      }}
    >
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {users.length <= 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#2e64e5" />
        </View>
      ) : (
        <FriendsList
          searchPhrase={searchPhrase}
          data={users}
          setClicked={setClicked}
        />
      )}
    </ScrollView>
  );
};

export default Rooms;
