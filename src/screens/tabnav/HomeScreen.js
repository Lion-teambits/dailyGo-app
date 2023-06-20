import React, { useEffect, useState } from "react";
import { View, Text, Platform } from "react-native";
import updateDatabase from "../../services/updateDatabase";
import { TEST_UID } from "../../api/constants";

// Get activity data & update DB & store updated userInfo & challengeInfo

// Check challenge achievement & update DB

// setTimer to get data in foregraound

const HomeScreen = () => {
  const [os, setOs] = useState("");
  const [userInfo, setUserInfo] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initActivityDataInDB(user_id) {
      const userInfo = await updateDatabase(user_id);
      setUserInfo(userInfo);
      setIsLoading(false);
    }

    initActivityDataInDB(TEST_UID);

    if (Platform.OS === "ios") {
      setOs("iOS");
    } else {
      setOs("Android");
    }
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>This is {os}</Text>
      <Text>{JSON.stringify(userInfo)}</Text>
    </View>
  );
};

export default HomeScreen;
