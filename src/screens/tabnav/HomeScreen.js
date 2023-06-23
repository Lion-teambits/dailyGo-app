import React, { useEffect, useState } from "react";
import { View, Text, Platform, ScrollView } from "react-native";
import saveActivityDataToDatabase from "../../services/saveActivityDataAndCheckChallengeProgress";
import { TEST_UID } from "../../api/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Get activity data & update DB & store updated userInfo & challengeInfo

// Check challenge achievement & update DB

// setTimer to get data in foregraound

const HomeScreen = () => {
  const [os, setOs] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dailyChallenge, setDailyChallenge] = useState({});
  const [ongoingChallengesState, setOngoingChallengesState] = useState([]);

  useEffect(() => {
    async function initActivityDataInDB(user_id) {
      // const uid = await AsyncStorage.getItem("@uid");
      const ongoingChallenges = await saveActivityDataToDatabase(user_id);

      setIsLoading(false);
      console.log("Home: ", ongoingChallenges);
      setDailyChallenge(ongoingChallenges.dailyChallenge);
      setOngoingChallengesState([
        ...ongoingChallengesState,
        ongoingChallenges.eventAndCoopChallenge,
      ]);
    }

    // Please uncomment to test database sync
    // Need to get all data what I need it here (challenge data, modal trigger)
    initActivityDataInDB(TEST_UID);
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text>Daily Challenge: {JSON.stringify(dailyChallenge)}</Text>
      <View>
        <Text>Event Challenge & Coop Challenge</Text>
      {ongoingChallengesState.map((item, index) => (
        <Text key={index}>{JSON.stringify(item)}</Text>
      ))}
    </View>
    </ScrollView>
  );
};

export default HomeScreen;
