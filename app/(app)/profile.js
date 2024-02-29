import {
  View,
  Text,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { blurhash } from "../../constants";
import Loading from "../../components/Loading";
import CustomKeyboardView from "../../components/CustomKeybordView";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/authcontext";
const ios = Platform.OS === "ios";

const Profile = () => {
  const { top } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const admin = true;
  const handleClose = () => {
    router.back();
  };
  const { logout } = useContext(AuthContext);

  if (admin)
    return (
      <CustomKeyboardView>
        <View
          style={{
            paddingTop: ios ? top : top + 10,
            paddingHorizontal: 20,
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

          <Text className="text-2xl font-bold text-center">Profile Name</Text>

          <View className="flex-row justify-center my-4">
            <Image
              style={{
                height: hp(35),
                aspectRatio: 1,
                borderRadius: 4,
                backgroundColor: "#0553",
              }}
              source="https://picsum.photos/seed/696/3000/2000"
              placeholder={blurhash}
              transition={500}
            />
          </View>

          <View className="flex-1 gap-4">
            <Text className="font-bold">Majors</Text>
            <TextInput
              placeholder="test@test.com"
              className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
              // value={email}
              // onChangeText={setEmail}
            />
            <Text className="font-bold">Department</Text>
            <TextInput
              placeholder="test@test.com"
              className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
              // value={email}
              // onChangeText={setEmail}
            />
            <Text className="font-bold">Description</Text>
            <TextInput
              placeholder="test@test.com"
              className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
              // value={email}
              // onChangeText={setEmail}
            />

            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(6.5)} className="" />
                </View>
              ) : (
                <Pressable
                  className="bg-blue-500 rounded-md"
                  // onPress={handleSignIn}
                >
                  <Text
                    style={{ fontSize: hp(2.2) }}
                    className="text-white font-bold tracking-wide text-center p-2 rounded-md"
                  >
                    Sign In
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </CustomKeyboardView>
    );
  else {
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
        <Text className="text-2xl font-bold text-center">Profile Name</Text>

        <View className="flex-row justify-center my-4">
          <Image
            style={{
              height: hp(35),
              aspectRatio: 1,
              borderRadius: 4,
              backgroundColor: "#0553",
            }}
            source="https://picsum.photos/seed/696/3000/2000"
            placeholder={blurhash}
            transition={500}
          />
        </View>

        <View className="flex-1 gap-4">
          <Text className="font-bold">Majors: </Text>

          <Text className="font-bold">Department: </Text>

          <Text className="font-bold">Description: </Text>
        </View>
      </View>
    );
  }
};

export default Profile;
