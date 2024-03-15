import React, { useState, useEffect, useContext } from "react";
import { Text } from "react-native";
import SearchBar from "../../components/SearchBar";
import List from "../../components/MessagesList";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/authcontext";

const Messages = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "chats"),
          where("members", "array-contains", user?.id)
        ),
        (snapshot) => {
          const snapMessages = snapshot.docs.map((doc) => {
            const { chatId, lastMessage, lastUpdated, membersDetails } =
              doc.data();
            const { name, id, profileUrl } = membersDetails.find(
              (member) => member.id !== user.id
            );
            return {
              chatId,
              lastMessage,
              lastUpdated,
              name,
              id,
              profileUrl,
            };
          });
          setMessages(snapMessages);
        }
      ),
    []
  );
  return (
    <>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {messages.length <= 0 ? (
        <Text className="text-center text-lg font-bold">No Chats</Text>
      ) : (
        <List
          searchPhrase={searchPhrase}
          data={messages}
          setClicked={setClicked}
        />
      )}
    </>
  );
};

export default Messages;
