import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import * as Location from "expo-location";
import { Alert } from "react-native";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // Listen for user authentication changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("🔥 User Authenticated => ", user.email);
        setIsAuthenticated(true);
        setUser({ ...user, id: user.uid });
        // fetch back the user details from firebase and update the user state with the new data
        fetchUser(user.uid);
      } else {
        console.log("😓 Not Auth => ");

        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  // get user location every 10 seconds and update it in firebase database (if user is logged in)

  useEffect(() => {
    const interval = setInterval(async () => {
      if (user) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Location Access Blocked",
            "Please Allow Location Access in Settings"
          );
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            timestamp: new Date(),
          },
        });
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [user]);

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("🔥 New User => ", email);
      // create a new user in the database with the response.user.uid if you want more details
      await setDoc(doc(db, "users", response?.user.uid), {
        email: response?.user.email,
        name: response?.user.email.split("@")[0],
        id: response?.user.uid,
        profileUrl: "https://picsum.photos/seed/696/3000/2000",
      });
      return { success: true, user: response?.user };
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  // Sign in an existing user
  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: response?.user };
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  // Sign out the current user
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  //password reset function firebase

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  const fetchUser = async (uid) => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.error("No such document!");
    }
  };

  // Provide the AuthContext value to the children components
  const authContextValue = {
    user,
    setUser,
    isAuthenticated,
    register,
    login,
    logout,
    resetPassword,
    location,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return value;
};

const handleFirebaseError = (error) => {
  console.error(error);
  let msg = error.message;
  if (msg.includes("auth/email-already-in-use")) {
    msg = "Email already in use";
  } else if (msg.includes("auth/invalid-email")) {
    msg = "Invalid email";
  } else if (msg.includes("auth/weak-password")) {
    msg = "Password should be at least 6 characters";
  } else if (msg.includes("auth/user-not-found")) {
    msg = "User not found";
  } else if (msg.includes("auth/wrong-password")) {
    msg = "Wrong password";
  } else if (msg.includes("auth/too-many-requests")) {
    msg = "Too many requests, please try again later";
  } else if (msg.includes("auth/network-request-failed")) {
    msg = "Network request failed, please try again later";
  }

  return msg;
};
