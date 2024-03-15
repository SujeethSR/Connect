import { Linking, Platform } from "react-native";

export const goToMaps = ({ latitude, longitude }) => {
  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${latitude},${longitude}`;
  const label = "";
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}&dirflg=w&t=m`,
    android: `${scheme}${latLng}(${label})&dirflg=w&t=m`,
  });

  Linking.openURL(url);
};
