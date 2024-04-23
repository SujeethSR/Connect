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
        <Pressable
          onPress={handleClose}
          style={{
            alignSelf: "flex-end",
          }}
        >
          <MaterialCommunityIcons name="close" size={30} color="black" />
        </Pressable>
        <RNText
          style={{
            textTransform: "capitalize",
            marginTop: 7,
            marginBottom: 7,

            textAlign: "center",
          }}
          font={"M-Medium"}
        >
          {friend.split(" ")[0]} Proflie Details
        </RNText>
        <View
          style={{
            marginTop: 14,
            marginBottom: 14,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
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

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <List.Section
            style={{
              width: widthPercentageToDP(70),
            }}
          >
            <List.Item
              title="Full Name"
              description={friend}
              descriptionStyle={{
                textTransform: "capitalize",
              }}
              left={() => <List.Icon icon="account" />}
            />
            <List.Item
              title="Gender"
              description={friendGender || "Not Available"}
              left={() => <List.Icon icon="gender-male-female" />}
            />
            <List.Item
              title="Department"
              description={friendPhone || "No Department Available"}
              left={() => <List.Icon icon="office-building" />}
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable
              style={{ flexDirection: "row", alignSelf: "flex-start" }}
              onPress={logout}
            >
              <MaterialIcons name="logout" size={24} color="black" />
            </Pressable>
            <Pressable style={{ alignSelf: "flex-end" }} onPress={handleClose}>
              <MaterialCommunityIcons name="close" size={30} color="black" />
            </Pressable>
          </View>

          <RNText
            style={{
              fontSize: 26.25,
              lineHeight: 31.5,
              textAlign: "center",
            }}
          >
            {user?.email}
          </RNText>

          {updateImage === false ? (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginVertical: 14,
                }}
              >
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Pressable
                  style={{
                    borderRadius: 5,
                    width: "50%",
                    backgroundColor: "#000000",
                  }}
                  onPress={() => {
                    setUpdateImage(true);
                  }}
                >
                  <RNText
                    style={{
                      fontSize: hp(1.8),
                      textAlign: "center",
                      color: "#fff",
                      padding: 7,
                      borderRadius: 5,
                    }}
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

          <View
            style={{
              gap: 3.5 * 3.5,
            }}
          >
            <RNText font="M-Bold">Name</RNText>
            <TextInput
              style={{
                padding: 7,
                marginTop: -7,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "#D1D5DB",
                width: "100%",
              }}
              value={name}
              onChangeText={setName}
            />
            <RNText font="M-Bold">Gender</RNText>
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
                  style={{
                    color: gender === "male" ? "#fff" : "#111",
                    textAlign: "center",
                  }}
                  font={"M-Bold"}
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
                  style={{
                    color: gender === "female" ? "#fff" : "#111",
                    textAlign: "center",
                  }}
                  font={"M-Bold"}
                >
                  Female
                </RNText>
              </TouchableOpacity>
            </View>

            <RNText font="M-Bold">Department</RNText>
            <TextInput
              placeholder="your deptartment.."
              style={{
                padding: 7,
                marginTop: -7,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "#D1D5DB",
                width: "100%",
              }}
              value={phone}
              onChangeText={setPhone}
            />
            <RNText font="M-Bold">About You</RNText>
            <TextInput
              placeholder="Write about yourself.."
              style={{
                padding: 7,
                marginTop: -7,
                borderRadius: 5,
                borderWidth: 2,
                borderColor: "#D1D5DB",
                width: "100%",
              }}
              value={bio}
              onChangeText={setBio}
              numberOfLines={4}
              textAlignVertical="top"
            />

            <View>
              {loading ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <Pressable
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#3B82F6",
                  }}
                  onPress={handleUpdateProfile}
                >
                  <RNText
                    style={{
                      fontSize: hp(2.2),
                      color: "#fff",
                      padding: 7,
                      borderRadius: 5,
                      textAlign: "center",
                    }}
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
