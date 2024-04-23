import React, { useState, useEffect, useCallback, useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";

import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../context/authcontext";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Image } from "expo-image";
import { blurhash } from "../../constants";
import { db } from "../../firebase";
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import Colors from "../../constants/Colors";
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  const { name, id, profileUrl } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const profileUrlU = profileUrl?.includes("firebase")
    ? profileUrl.toString().replace(/\/(?=[^\/]*$)/, "%2F")
    : profileUrl;
  const navigation = useNavigation();
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: "M-Bold",
      },
    });
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const docRef = doc(db, "chats", getChatId(user?.id, id));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
      } else {
        console.log("Creating New Chat");
        setDoc(doc(db, "chats", getChatId(user.id, id)), {
          chatId: getChatId(user.id, id),
          membersDetails: [
            {
              name: user?.name,
              id: user?.id,
              profileUrl: user?.profileUrl,
            },
            {
              name: name,
              id: id,
              profileUrl: profileUrlU,
            },
          ],
          members: [user.id, id],
          lastUpdated: Timestamp.fromDate(new Date()),
          messages: [],
          lastMessage: null,
        });
      }
      setLoading(false);
    })();
  }, []);

  // useEffect(
  //   () =>
  //     onSnapshot(
  //       doc(db, "chats", getChatId(user.id, id)),
  //       (snapshot) =>
  //         snapshot.exists() && setMessages(snapshot.data()?.messages)
  //     ),
  //   []
  // );

  useEffect(() => {
    const docRef = doc(db, "chats", getChatId(user.id, id));
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const { messages } = doc.data();
        setMessages(messages);
      }
    });
    return unsubscribe;
  }, []);

  const updateDocument = useCallback(async (messages = []) => {
    const docRef = doc(db, "chats", getChatId(user.id, id));
    const lastMessage = messages[0];
    const lastUpdated = new Date().toString();
    lastMessage.createdAt = lastUpdated;
    lastMessage.user.name = user.name;
    lastMessage.text = lastMessage.text + " ";
    await updateDoc(docRef, {
      messages: arrayUnion(lastMessage),
      lastMessage: lastMessage,
      lastUpdated,
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    updateDocument(messages);
  }, []);
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <View style={{ marginBottom: 5 }}>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: Colors.green,
              borderWidth: 1.5,
            },
            left: {
              backgroundColor: Colors.yellow,
              borderWidth: 1.5,
            },
          }}
          textStyle={{
            right: {
              color: "#000",
              fontFamily: "M-Bold",
            },
            left: {
              color: "#000",
              fontFamily: "M-Bold",
            },
          }}
          timeTextStyle={{
            right: {
              color: "#000",
            },
            left: {
              color: "#000",
            },
          }}
        />
      </View>
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="chevron-down" color="#333" />;
  };
  const renderAvatar = ({ currentMessage }) => {
    return (
      <View
        style={{
          width: 35,
          height: 35,
          borderRadius: 100,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            height: "100%",
            aspectRatio: 1,
            borderRadius: 50,
            backgroundColor: "#0553",
          }}
          source={
            currentMessage?.user?.profileUrl ||
            "https://cdn3d.iconscout.com/3d/premium/thumb/user-3711728-3105450.png?f=webp"
          }
          placeholder={blurhash}
          transition={500}
        />
      </View>
    );
  };
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user?.id,
        profileUrl: user?.profileUrl,
      }}
      inverted={false}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderAvatar={renderAvatar}
    />
  );
};

export default ChatScreen;

const getChatId = (uid1, uid2) => {
  if (uid1.localeCompare(uid2) === 1) {
    return uid1 + "-" + uid2;
  } else {
    return uid2 + "-" + uid1;
  }
};
