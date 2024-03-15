import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const saveProfileUrl = async (id, url) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      profileUrl: url,
    });
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e.message };
  }
};
