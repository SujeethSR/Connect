import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, Alert, Pressable, View } from "react-native";
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
import Colors from "../../constants/Colors";
import { db } from "../../firebase";
import {
  Timestamp,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import RNText from "../../components/RNText";

const Rooms = () => {
  const { user } = useContext(AuthContext);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const [roomName, setRoomName] = useState("");
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [value, setValue] = useState("friends");
  const [loading, setLoading] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const [image, setImage] = useState(
    "https://cdn3d.iconscout.com/3d/premium/thumb/group-7572027-6138729.png?f=webp"
  );
  const upateProfile = (url) => {
    setUpdateImage(false);
    setImage(url);
  };

  const [rooms, setRooms] = useState([]);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "rooms"), orderBy("lastUpdated", "desc")),
        (snapshot) => {
          const snapMessages = snapshot.docs.map((doc) => {
            const { roomId, type, lastUpdated, name, image } = doc.data();

            return {
              roomId,
              type,
              lastUpdated,
              name,
              image,
            };
          });
          setRooms(snapMessages);
        }
      ),
    []
  );
  const handleCreateRoom = async () => {
    if (roomName === "") return alert("Create Room", "Room Name is required");

    setLoading(true);
    const roomId = user.id + "|" + Date.now().toString(36);

    try {
      await setDoc(doc(db, "rooms", roomId), {
        roomId,
        type: value,
        admin: user.id,
        name: roomName,
        image: image,
        lastUpdated: Timestamp.fromDate(new Date()),
        messages: [],
      });
      setLoading(false);

      setRoomName("");
      setImage(
        "https://cdn3d.iconscout.com/3d/premium/thumb/group-7572027-6138729.png?f=webp"
      );
      hideModal();

      Alert.alert("Room Created", "Room has been created successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {rooms.length <= 0 ? (
        <View className="flex-1 justify-center">
          <ActivityIndicator size="large" color="#2e64e5" />
        </View>
      ) : (
        <RoomList
          searchPhrase={searchPhrase}
          data={rooms}
          setClicked={setClicked}
        />
      )}

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              { value: "friends", label: "For Friends" },
              {
                value: "community",
                label: "For Community",
              },
            ]}
          />

          {updateImage === false ? (
            <>
              <View className="justify-center my-4 relative">
                <View>
                  <Image
                    style={{
                      height: heightPercentageToDP(15),
                      aspectRatio: 1,
                      borderRadius: 10,
                      alignSelf: "center",
                    }}
                    source={image}
                    placeholder={blurhash}
                    transition={500}
                  />
                  <Pressable
                    onPress={() => setUpdateImage(true)}
                    style={{
                      position: "absolute",
                      left: widthPercentageToDP(41),
                      bottom: -15,
                      backgroundColor: "#000",
                      padding: 8,
                      borderRadius: 50,
                      height: 34,
                      width: 34,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons name="edit" size={16} color={"#fff"} />
                  </Pressable>
                </View>

                <TextInput
                  label="Room Name"
                  value={roomName}
                  onChangeText={(text) => setRoomName(text)}
                  mode="outlined"
                  style={{
                    width: widthPercentageToDP(80),
                    marginVertical: 20,
                    alignSelf: "center",
                    backgroundColor: "#fff",
                  }}
                />

                <Button
                  mode="contained"
                  loading={loading}
                  onPress={handleCreateRoom}
                  style={{
                    width: widthPercentageToDP(80),
                    alignSelf: "center",
                  }}
                >
                  Create Room
                </Button>
              </View>
            </>
          ) : (
            <View
              style={{
                minHeight: heightPercentageToDP(35),
                paddingBottom: 20,
                position: "relative",
              }}
            >
              <Pressable
                onPress={() => setUpdateImage(false)}
                style={{
                  position: "absolute",
                  right: heightPercentageToDP(20),
                  top: 10,
                  backgroundColor: "#000",
                  padding: 8,
                  borderRadius: 50,
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 2,
                }}
              >
                <MaterialIcons name="close" size={24} color={"#fff"} />
              </Pressable>
              <RoomsImage upateProfile={upateProfile} />
            </View>
          )}
        </Modal>
      </Portal>

      <FAB
        icon="home-group-plus"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: "#111",
        }}
        color="#fff"
        onPress={showModal}
      />
    </>
  );
};

export default Rooms;
