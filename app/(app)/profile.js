import {
  View,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { blurhash } from "../../constants";
import Loading from "../../components/Loading";
import CustomKeyboardView from "../../components/CustomKeybordView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AuthContext } from "../../context/authcontext";
import ProfileImage from "../../components/ProflieImage";
import RNText from "../../components/RNText";
import { updateProflie } from "../../constants/api";
import { List, MD3Colors } from "react-native-paper";
const ios = Platform.OS === "ios";

const Profile = () => {
  const { top } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };
  const { logout, user, setUser } = useContext(AuthContext);
  const [updateImage, setUpdateImage] = useState(false);
  const {
    friend,
    id,
    profileUrl,
    phone: friendPhone,
    bio: friendBio,
    gender: friendGender,
    name: friendName,
  } = useLocalSearchParams();
  const newUserExtract = friend ? friend : null;
  const upateProfile = (url) => {
    setUpdateImage(false);

    setUser((user) => {
      return { ...user, profileUrl: url };
    });
  };
  const profileUrlU = profileUrl?.includes("firebase")
    ? profileUrl.toString().replace(/\/(?=[^\/]*$)/, "%2F")
    : profileUrl;

  const [name, setName] = useState(user?.name);
  const [gender, setGender] = useState(user?.gender);
  const [phone, setPhone] = useState(user?.phone);
  const [bio, setBio] = useState(user?.bio);
  const handleUpdateProfile = async () => {
    console.log(name, phone, bio, gender);
    if (!name || !phone || !bio || !gender) {
      Alert.alert("Update Profile", "All fields are required");
      return;
    } else {
      setLoading(true);
      await updateProflie(user.id, {
        name,
        phone,
        bio,
        gender,
      });
      setUser((user) => {
        return { ...user, name, phone, bio, gender };
      });
      setLoading(false);
      Alert.alert("Profile Updated", "Profile updated successfully", [
        {
          text: "OK",
          onPress: () => {
            router.back();
          },
        },
      ]);
    }
  };
  if (newUserExtract)
    return (
      <View
        style={{
          paddingTop: ios ? top : top + 10,
          paddingHorizontal: 20,
          flex: 1,
        }}
      >
        <Pressable className="self-end" onPress={handleClose}>
          <MaterialCommunityIcons name="close" size={30} color="black" />
        </Pressable>
        <RNText className="text-2xl text-center my-2" font={"Poppins-Medium"}>
          {friend.split(" ")[0]} Proflie Details
        </RNText>
        <View className="flex-row justify-center my-4">
          <Image
            style={{
              height: hp(20),
              aspectRatio: 1,
              borderRadius: 4,
            }}
            source={profileUrlU}
            placeholder={blurhash}
            transition={500}
          />
        </View>

        <View className="justify-center items-center">
          <List.Section
            style={{
              width: widthPercentageToDP(70),
            }}
          >
            <List.Item
              title="Full Name"
              description={friend}
              left={() => <List.Icon icon="account" />}
            />
            <List.Item
              title="Gender"
              description={friendGender || ""}
              left={() => <List.Icon icon="gender-male-female" />}
            />
            <List.Item
              title="Phone"
              description={friendPhone || "No phone number"}
              left={() => <List.Icon icon="phone" />}
            />
            <List.Item
              title="About"
              description={friendBio || "No bio available"}
              left={() => <List.Icon icon="information" />}
            />
          </List.Section>
        </View>
      </View>
    );
  else {
    return (
      <CustomKeyboardView>
        <View
          style={{
            paddingTop: ios ? top : top + 10,
            padding: 20,
            flex: 1,
          }}
        >
          <View className="flex-row justify-between">
            <Pressable className="self-start flex-row" onPress={logout}>
              <MaterialIcons name="logout" size={24} color="black" />
            </Pressable>
            <Pressable className="self-end" onPress={handleClose}>
              <MaterialCommunityIcons name="close" size={30} color="black" />
            </Pressable>
          </View>

          <RNText className="text-2xl  text-center">{user?.email}</RNText>

          {updateImage === false ? (
            <>
              <View className="flex-row justify-center my-4">
                <Image
                  style={{
                    height: hp(20),
                    aspectRatio: 1,
                    borderRadius: 4,
                    backgroundColor: "#0553",
                  }}
                  source={
                    user?.profileUrl
                      ? user?.profileUrl
                      : "https://cdn3d.iconscout.com/3d/premium/thumb/user-3711728-3105450.png?f=webp"
                  }
                  placeholder={blurhash}
                  transition={500}
                />
              </View>
              <View className="flex-row justify-center">
                <Pressable
                  className="bg-black rounded-md w-2/4 "
                  onPress={() => {
                    setUpdateImage(true);
                  }}
                >
                  <RNText
                    style={{ fontSize: hp(1.8) }}
                    className="text-white  tracking-wide text-center p-2 rounded-md"
                  >
                    Update Image
                  </RNText>
                </Pressable>
              </View>
            </>
          ) : (
            <View
              style={{
                minHeight: hp(35),
                paddingBottom: 20,
              }}
            >
              <ProfileImage id={user.id} upateProfile={upateProfile} />
            </View>
          )}

          <View className="gap-3.5">
            <RNText className="tracking-wide" font="Poppins-Bold">
              Name
            </RNText>
            <TextInput
              className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
              value={name}
              onChangeText={setName}
            />
            <RNText className="tracking-wide" font="Poppins-Bold">
              Gender
            </RNText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: gender === "male" ? "#111" : "#fff",
                  //border
                  padding: 10,
                  borderWidth: 1,

                  width: widthPercentageToDP(40),
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setGender("male");
                }}
              >
                <RNText
                  className=" text-center"
                  style={{
                    color: gender === "male" ? "#fff" : "#111",
                  }}
                  font={"Poppins-Bold"}
                >
                  Male
                </RNText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: gender === "female" ? "#111" : "#fff",

                  //border
                  borderWidth: 1,
                  padding: 10,
                  width: widthPercentageToDP(40),
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setGender("female");
                }}
              >
                <RNText
                  className=" text-center"
                  style={{
                    color: gender === "female" ? "#fff" : "#111",
                  }}
                  font={"Poppins-Bold"}
                >
                  Female
                </RNText>
              </TouchableOpacity>
            </View>

            <RNText className="tracking-wide" font="Poppins-Bold">
              Phone Number
            </RNText>
            <TextInput
              placeholder="your number"
              className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
              value={phone}
              onChangeText={setPhone}
            />
            <RNText className="tracking-wide" font="Poppins-Bold">
              About You
            </RNText>
            <TextInput
              placeholder="Write about yourself.."
              className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
              value={bio}
              onChangeText={setBio}
              numberOfLines={4}
              textAlignVertical="top"
            />

            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(6.5)} className="" />
                </View>
              ) : (
                <Pressable
                  className="bg-blue-500 rounded-md"
                  onPress={handleUpdateProfile}
                >
                  <RNText
                    style={{ fontSize: hp(2.2) }}
                    className="text-white  tracking-wide text-center p-2 rounded-md"
                  >
                    Save
                  </RNText>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </CustomKeyboardView>
    );
  }
};

export default Profile;
