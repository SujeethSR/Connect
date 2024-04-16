import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Share,
  StatusBar,
  StyleSheet,
  View,
  LogBox,
  Platform,
  Pressable,
} from "react-native";
import * as Clipboard from "expo-clipboard";
//import v4 from "uuid";
import { v4 as uuid } from "uuid";

import { storage } from "../firebase";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../constants";
import { saveProfileUrl } from "../constants/api";
import RNText from "./RNText";
// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example

export default class RoomsImage extends React.Component {
  //fetch userId from props

  state = {
    image: null,
    uploading: false,
  };

  async componentDidMount() {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  render() {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        className="gap-4"
      >
        {/* {this._maybeRenderImage()} */}
        {this._maybeRenderUploadingOverlay()}

        <Pressable
          className="bg-black rounded-md w-full "
          onPress={this._pickImage}
        >
          <RNText className="text-white  tracking-wide text-center p-2 rounded-md">
            Pick an image from camera roll
          </RNText>
        </Pressable>
        <Pressable
          className="bg-blue-500 rounded-md w-full "
          onPress={this._takePhoto}
        >
          <RNText className="text-white  tracking-wide text-center p-2 rounded-md">
            Take a photo
          </RNText>
        </Pressable>
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            alignItems: "center",
            justifyContent: "center",
            height: hp(15),
            width: wp(50),
          }}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 10,
          borderRadius: 3,
          elevation: 2,
        }}
      >
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden",
          }}
        >
          <Image
            style={{
              height: hp(35),
              aspectRatio: 1,
              borderRadius: 4,
              backgroundColor: "#0553",
            }}
            source={{ uri: image }}
            placeholder={blurhash}
            transition={100}
          />
        </View>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image,
    });
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(
          pickerResult.assets[0].uri,
          Date.now().toString(36)
        );
        this.setState({ image: uploadUrl });
        this.props.upateProfile(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri, id) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(storage, `images/${id}`);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}
