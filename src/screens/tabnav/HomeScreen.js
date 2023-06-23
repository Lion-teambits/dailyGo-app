import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import saveActivityDataToDatabase from "../../services/saveActivityDataAndCheckChallengeProgress";
import { TEST_UID } from "../../api/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveUserInfo } from "../../api/userService";
import OngoingChallengeContainer from "../../components/containers/OngoingChallengeContainer";

// Get activity data & update DB & store updated userInfo & challengeInfo

// Check challenge achievement & update DB

// setTimer to get data in foregraound

const HomeScreen = () => {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [ongoingChallengesState, setOngoingChallengesState] = useState([]);

  useEffect(() => {
    async function initActivityDataInDB(user_id) {
      const ongoingChallenges = await saveActivityDataToDatabase(user_id);

      console.log("Home: ", ongoingChallenges);
      setOngoingChallengesState([
        ...ongoingChallenges.eventAndCoopChallenge,
        ongoingChallenges.dailyChallenge,
      ]);

      const responseUserInfo = await retrieveUserInfo(user_id);
      setUserInfo(responseUserInfo);
      setIsLoading(false);
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
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>streak_days: {userInfo.streak_days}</Text>
        <Text>hearts: {userInfo.hearts}</Text>
        <Text>fireflies: {userInfo.fireflies}</Text>
      </View>
      <OngoingChallengeContainer challengeArr={ongoingChallengesState} />
    </SafeAreaView>
  );
};

export default HomeScreen;
