import React, { useEffect, useState } from "react";
import { View, Text, Platform } from "react-native";
import saveActivityDataToDatabase from "../../services/saveActivityDataAndCheckChallengeProgress";
import { TEST_UID } from "../../api/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Get activity data & update DB & store updated userInfo & challengeInfo

// Check challenge achievement & update DB

// setTimer to get data in foregraound

const HomeScreen = () => {
  const [os, setOs] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initActivityDataInDB(user_id) {
      // const uid = await AsyncStorage.getItem("@uid");
      const userInfo = await saveActivityDataToDatabase(user_id);

      setUserInfo(userInfo);
      setIsLoading(false);
      console.log("Home: ", userInfo);
    }

    // Please uncomment to test database sync
    // Need to get all data what I need it here (challenge data, modal trigger)
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
