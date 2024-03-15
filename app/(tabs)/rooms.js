import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import SearchBar from "../../components/SearchBar";
import RoomList from "../../components/RoomList";
import { fakeData } from "../../constants/data";

const Rooms = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    console.log("Rooms Screen Mounted");
  }, []);
  return (
    <>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {!fakeData ? (
        <ActivityIndicator size="large" />
      ) : (
        <RoomList
          searchPhrase={searchPhrase}
          data={fakeData}
          setClicked={setClicked}
        />
      )}
    </>
  );
};

export default Rooms;
