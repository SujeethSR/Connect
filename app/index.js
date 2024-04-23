import { View } from "react-native";
import Colors from "../constants/Colors";
import LogoImg from "../assets/app/logo.png";
import { Image } from "expo-image";
import { widthPercentageToDP } from "react-native-responsive-screen";
import RNText from "../components/RNText";
export default function StartPage() {
  return (
    <View
      style={{
        backgroundColor: Colors.secondary,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={LogoImg}
        style={{ width: widthPercentageToDP(35), aspectRatio: 1 }}
      />

      <View
        style={{
          position: "absolute",
          bottom: 20,
        }}
      >
        <RNText
          style={{
            color: Colors.primary,
            textAlign: "center",
            fontSize: 21,
            lineHeight: 28,
          }}
          font={"M-Bold"}
        >
          crafted by
        </RNText>
        <RNText
          style={{
            color: Colors.primary,
            textAlign: "center",
            fontSize: 17.5,
            lineHeight: 24.5,
            textAlign: "center",
          }}
          font={"M-Bold"}
        >
          Spring2024 - Team11
        </RNText>
      </View>
    </View>
  );
}
