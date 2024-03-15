import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";

export default function StartPage() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins/Poppins-Thin.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins/Poppins-Black.ttf"),
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View className="flex-1 justify-center">
      <ActivityIndicator />
    </View>
  );
}
