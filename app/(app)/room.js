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
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
const RoomScreen = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  const { name, roomId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontFamily: "M-Medium",
      },
    });
  }, [navigation]);

  //*fetch messages from firebase chat and set it to messages or create new chat if not exists
  useEffect(() => {
    setLoading(true);
    (async () => {
      const docRef = doc(db, "rooms", roomId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { messages } = docSnap.data();
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const docRef = doc(db, "rooms", roomId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const { messages } = doc.data();
        setMessages(messages);
      }
    });
    return unsubscribe;
  }, []);
  const updateDocument = useCallback(async (messages = []) => {
    const docRef = doc(db, "rooms", roomId);
    const lastMessage = messages[0];
    const lastUpdated = new Date().toString();
    lastMessage.createdAt = lastUpdated;
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
              backgroundColor: "#2e64e5",
            },
            left: {
              backgroundColor: "#fff",
            },
          }}
          textStyle={{
            right: {
              color: "#fff",
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
        <ActivityIndicator size="large" color="#2e64e5" />
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
        name: user?.name,
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

export default RoomScreen;
