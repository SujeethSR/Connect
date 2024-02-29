import React, { useState, useEffect, useContext, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import MapUserView from "../../components/MapUserView";
import { markers } from "../../constants/data";
import { LocationContext } from "../../context/locationContext";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
export default function Map() {
  const [selectedMarker, setSelectedMarker] = useState("");
  const { location } = useContext(LocationContext);

  const [timer, setTimer] = useState(null);

  const flatListRef = useRef(null);

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  const [showInfo, setShowInfo] = useState(false);
  const handleMarkerPress = (index) => {
    setSelectedMarker(index);

    if (!showInfo) {
      setShowInfo(true);
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(
        setTimeout(() => {
          scrollToIndex(index);
        }, 100)
      );
    } else {
      scrollToIndex(index);
    }
  };
  const mapRef = useRef(null);

  const markerRefs = markers.map(() => useRef(null));

  const handleInfoClick = (index) => {
    if (
      markerRefs[index] &&
      markerRefs[index].current &&
      markerRefs[index].current.showCallout
    ) {
      setSelectedMarker(index);

      // center map to this marker location
      mapRef.current.animateToRegion({
        latitude: markers[index].latitude,
        longitude: markers[index].longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.0016,
      });
    }
  };

  // const deg2rad = (deg) => {
  //   return deg * (Math.PI / 180);
  // };

  // const getDistance = (lat1, lon1, lat2, lon2) => {
  //   const R = 6371000; // Radius of the earth in meters
  //   const dLat = deg2rad(lat2 - lat1);
  //   const dLon = deg2rad(lon2 - lon1);

  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(deg2rad(lat1)) *
  //       Math.cos(deg2rad(lat2)) *
  //       Math.sin(dLon / 2) *
  //       Math.sin(dLon / 2);

  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance = R * c; // Distance in meters
  //   console.log("Distance", distance);
  //   return distance;
  // };

  // const filterMarkers = () => {
  //   const filteredMarkers = markers.filter((marker) => {
  //     return (
  //       getDistance(
  //         location.coords.latitude,
  //         location.coords.longitude,
  //         marker.latitude,
  //         marker.longitude
  //       ) <= 500
  //     );
  //   });
  // };
  // if (location?.coords?.latitude && location?.coords?.longitude) {
  //   filterMarkers();
  // }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        region={{
          latitude: location?.coords?.latitude,
          longitude: location?.coords?.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.0016,
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
      >
        {markers.map((marker, index) => (
          <Marker
            key={marker.id}
            onPress={() => handleMarkerPress(index)}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            image={
              selectedMarker === index
                ? require("../../assets/active.png")
                : require("../../assets/map.png")
            }
            tracksViewChanges={false}
            ref={markerRefs[index]}
          />
        ))}
      </MapView>

      {showInfo && (
        <View style={{ position: "absolute", bottom: 10 }} className="px-2">
          <Pressable
            className="absolute"
            style={{
              right: 20,
              top: -30,
              zIndex: 10,
            }}
            onPress={() => setShowInfo(false)}
          >
            <FontAwesome name="close" size={32} color="black" />
          </Pressable>
          <FlatList
            data={markers}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <MapUserView
                user={item}
                index={index}
                handleInfoClick={handleInfoClick}
              />
            )}
            keyExtractor={(item) => item.id}
            ref={flatListRef}
            getItemLayout={(_, index) => {
              return {
                length: Dimensions.get("window").width,
                offset: Dimensions.get("window").width * index,
                index,
              };
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
export const INITIAL_REGION = {
  latitude: 17.490141,
  longitude: 78.349036,
  latitudeDelta: 0.0001,
  longitudeDelta: 0.0008,
};

// open google maps app with directions from react native app
