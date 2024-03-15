// import React, { useState, useEffect, useCallback, useContext } from "react";
// import { View } from "react-native";
// import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";

// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
// import { AuthContext } from "../../context/authcontext";
// import { router, useLocalSearchParams, useNavigation } from "expo-router";
// import { Image } from "expo-image";
// import { blurhash } from "../../constants";
// import { db } from "../../firebase";
// import { Timestamp, doc } from "firebase/firestore";
// const RoomScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const { user } = useContext(AuthContext);

//   const { name } = useLocalSearchParams();

//   const navigation = useNavigation();

//   React.useEffect(() => {
//     navigation.setOptions({
//       headerTitle: name,
//       headerTitleAlign: "center",
//       headerTitleStyle: {
//         fontFamily: "Poppins-Bold",
//       },
//     });
//   }, [navigation]);

//   // useEffect(() => {

//   //   setMessages([
//   //     {
//   //       _id: 1,
//   //       text: "two",
//   //       createdAt: new Date(),
//   //       user: {
//   //         _id: 1,
//   //         name: "React Native",
//   //         gender: "male",
//   //       },
//   //     },
//   //   ]);
//   // }, []);

//   //*fetch messages from firebase chat and set it to messages or create new chat if not exists
//   useEffect(() => {
//     (async () => {
//       const docRef = doc(db, "chats", getChatId(user.id, id));
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         const { messages } = docSnap.data();
//         console.log("Messages Fetch for ", user.name);
//         setMessages(messages);
//       } else {
//         console.log("Creating New Chat ");
//         setDoc(doc(db, "chats", getChatId(user.id, id)), {
//           id: getChatId(user.id, id),
//           membersDetails: [
//             {
//               name: user.name,
//               id: user.id,
//             },
//             {
//               name: name,
//               id: id,
//             },
//           ],
//           members: [user.id, id],
//           lastUpdated: Timestamp.fromDate(new Date()),
//           messages: [],
//           lastMessage: null,
//         });
//       }
//     })();
//   }, []);

//   useEffect(
//     () =>
//       onSnapshot(
//         query(
//           collection(db, "chats"),
//           where("id", "==", getChatId(user.id, id))
//         ),
//         (snapshot) => {
//           snapshot.docChanges().forEach((change) => {
//             if (change.type === "modified") {
//               const { lastMessage } = change.doc.data();
//               setMessages((messages) => [...messages, lastMessage]);
//             }
//           });
//         }
//       ),
//     []
//   );
//   useEffect(
//     () =>
//       onSnapshot(doc(db, "chats", getChatId(user.id, id)), (snapshot) =>
//         setMessages(snapshot.data()?.messages)
//       ),
//     [db]
//   );

//   const updateDocument = useCallback(async (messages = []) => {
//     const docRef = doc(db, "chats", getChatId(user.id, id));
//     const lastMessage = messages[0];
//     const lastUpdated = new Date().toString();
//     lastMessage.createdAt = lastUpdated;
//     lastMessage.user.name = user.name;
//     await updateDoc(docRef, {
//       messages: arrayUnion(lastMessage),
//       lastMessage: lastMessage,
//       lastUpdated,
//     });
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(messages, previousMessages)
//     );
//   }, []);
//   const renderSend = (props) => {
//     return (
//       <Send {...props}>
//         <View>
//           <MaterialCommunityIcons
//             name="send-circle"
//             style={{ marginBottom: 5, marginRight: 5 }}
//             size={32}
//             color="#2e64e5"
//           />
//         </View>
//       </Send>
//     );
//   };

//   const renderBubble = (props) => {
//     return (
//       <View style={{ marginBottom: 5 }}>
//         <Bubble
//           {...props}
//           wrapperStyle={{
//             right: {
//               backgroundColor: "#2e64e5",
//             },
//             left: {
//               backgroundColor: "#fff",
//             },
//           }}
//           textStyle={{
//             right: {
//               color: "#fff",
//             },
//             left: {
//               color: "#000",
//             },
//           }}
//         />
//       </View>
//     );
//   };

//   const scrollToBottomComponent = () => {
//     return <FontAwesome name="chevron-down" color="#333" />;
//   };
//   const renderAvatar = ({ currentMessage }) => {
//     console.log(currentMessage);
//     return (
//       <View
//         style={{
//           width: 35,
//           height: 35,
//           borderRadius: 100,
//           backgroundColor: "#fff",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Image
//           style={{
//             height: "100%",
//             aspectRatio: 1,
//             borderRadius: 50,
//             backgroundColor: "#0553",
//           }}
//           source={
//             currentMessage?.user?.avatar ||
//             "https://picsum.photos/seed/696/3000/2000"
//           }
//           placeholder={blurhash}
//           transition={500}
//         />
//       </View>
//     );
//   };
//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(messages) => onSend(messages)}
//       user={{
//         _id: 1,
//       }}
//       inverted={false}
//       renderBubble={renderBubble}
//       alwaysShowSend
//       renderSend={renderSend}
//       scrollToBottom
//       scrollToBottomComponent={scrollToBottomComponent}
//       renderAvatar={renderAvatar}
//     />
//   );
// };

// export default RoomScreen;

// const getChatId = (uid1, uid2) => {
//   if (uid1.localeCompare(uid2) === 1) {
//     return uid1 + "-" + uid2;
//   } else {
//     return uid2 + "-" + uid1;
//   }
// };
