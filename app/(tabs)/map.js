import React, { useState, useEffect, useContext, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MapUserView from "../../components/MapUserView";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../context/authcontext";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { mapsStyles } from "../../constants/data";
import { Image } from "expo-image";
import RNText from "../../components/RNText";
import { Button, IconButton } from "react-native-paper";
export default function Map() {
  const [selectedMarker, setSelectedMarker] = useState("");
  const { location, user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [markers, setMarkers] = useState([]);

  const [mapRegion, setMapRegion] = useState({
    latitude: 17.3900753,
    longitude: 78.3489628,
    latitudeDelta: 0.001,
    longitudeDelta: 0.0016,
  });
  const flatListRef = useRef(null);

  const [timer, setTimer] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radius of the earth in meters
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    // console.log("Distance", distance);
    return distance;
  };

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

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

  const markerRefs = Array.from({ length: 20 }, () => useRef(null));

  const handleInfoClick = (index) => {
    if (
      markerRefs[index] &&
      markerRefs[index].current &&
      markerRefs[index].current.showCallout
    ) {
      setSelectedMarker(index);
      // center map to this marker location
      mapRef.current.animateToRegion({
        latitude: markers[index].location.latitude,
        longitude: markers[index].location.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.0016,
      });
    }
  };
  useEffect(() => {
    if (!user?.id) return;

    (async () => {
      const q = query(collection(db, "users"), where("id", "!=", user?.id));
      const users = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    })();
  }, [user]);
  //memoize the markers array to avoid unnecessary re-renders
  useEffect(() => {
    if (users.length === 0) return;

    setMarkers((prevMarkers) => {
      const updatedMarkers = users.filter((user) => {
        const lat = new RegExp("^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)$");
        const long = new RegExp(
          "^[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$"
        );
        return (
          user?.location &&
          lat.test(user.location.latitude) &&
          long.test(user.location.longitude) &&
          getDistance(
            location.coords.latitude,
            location.coords.longitude,
            user.location.latitude,
            user.location.longitude
          ) <= 1000
        );
      });
      return updatedMarkers;
    });
  }, [users]);

  useEffect(() => {
    if (!user?.id) return;

    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const docId = change.doc.id;
        if (docId === user?.id) {
          return;
        }
        if (change.type === "added") {
          setUsers((users) => {
            if (!users.find((user) => user.id === change.doc.data().id)) {
              return [...users, change.doc.data()];
            }
            return users;
          });
        }
        if (change.type === "modified") {
          setUsers((users) =>
            users.map((user) => {
              if (user.id === change.doc.data().id) {
                if (!user.location) {
                  return change.doc.data();
                } else if (!change.doc.data().location) {
                  return change.doc.data();
                } else if (
                  user.location.latitude !==
                    change.doc.data().location.latitude ||
                  user.location.longitude !==
                    change.doc.data().location.longitude
                ) {
                  return change.doc.data();
                }
              }

              return user;
            })
          );
        }
      });
    });
    return () => {
      unsub();
    };
  }, [user]);
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 35,
          left: 10,
          zIndex: 999,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/app/logo.png")}
          style={{
            width: wp(14),
            aspectRatio: 1,
          }}
        />
        <RNText style={{ color: "black", fontSize: 24 }} font={"M-Bold"}>
          onnect
        </RNText>
      </View>

      <MapView
        ref={mapRef}
        region={mapRegion}
        customMapStyle={mapsStyles}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation={location !== null}
        showsMyLocationButton={false}
        showsCompass={false}
      >
        {markers.map((marker, index) => (
          <Marker
            key={marker.id}
            onPress={() => handleMarkerPress(index)}
            coordinate={{
              latitude: marker.location.latitude,
              longitude: marker.location.longitude,
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
        {/* create a button and when user clicks move to users location */}
      </MapView>
      <IconButton
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          backgroundColor: "white",
        }}
        icon={"crosshairs-gps"}
        onPress={() => {
          mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.0008,
          });
        }}
      ></IconButton>

      {showInfo && (
        <View
          style={{ position: "absolute", bottom: 10, paddingHorizontal: 7 }}
        >
          <Pressable
            style={{
              right: 20,
              top: -30,
              zIndex: 10,
              position: "absolute",
            }}
            onPress={() => setShowInfo(false)}
          >
            <FontAwesome name="close" size={32} color="white" />
          </Pressable>
          <FlatList
            data={markers}
            horizontal
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
            getItemLayout={(data, index) => ({
              length: wp(100),
              offset: wp(90) * index,
              index,
            })}
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
