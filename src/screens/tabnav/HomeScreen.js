import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import saveActivityData from "../../services/saveActivityData";
import { TEST_UID } from "../../api/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveUserInfo } from "../../api/userService";
import OngoingChallengeContainer from "../../components/containers/OngoingChallengeContainer";
import { checkDailyChallengeProgress } from "../../services/checkChallengeProgress";

// Get activity data & update DB & store updated userInfo & challengeInfo

// Check challenge achievement & update DB

// setTimer to get data in foregraound

const HomeScreen = () => {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [ongoingChallenges, setOngoingChallenges] = useState([]);

  useEffect(() => {
    async function initActivityDataInDB(user_id) {
      await saveActivityData(user_id);
      const dailyChallengeStatus = await checkDailyChallengeProgress(user_id);
      setOngoingChallenges((prevChallenges) => [
        ...prevChallenges,
        { daily: dailyChallengeStatus },
      ]);

      // [TODO: Check Event and Coop challenge progress]
      // const EventAndCoopChallengeStatus = await function(user_id);
      
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
      <OngoingChallengeContainer ongoingChallenges={ongoingChallenges} />
    </SafeAreaView>
  );
};

export default HomeScreen;
