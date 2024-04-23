import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC94Lt6bhgJJlBTkDDOc6SQw2h4UUVVVXQ",
  authDomain: "connect-63f5f.firebaseapp.com",
  projectId: "connect-63f5f",
  storageBucket: "connect-63f5f.appspot.com",
  messagingSenderId: "523607300076",
  appId: "1:523607300076:web:c5569d91a34dab395692c9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth, db, storage };
