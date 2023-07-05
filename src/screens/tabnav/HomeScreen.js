import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import saveActivityData from "../../services/saveActivityData";
import { TEST_UID } from "../../api/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveUserInfo } from "../../api/userService";
import OngoingChallengeContainer from "../../components/containers/OngoingChallengeContainer";
import {
  checkDailyChallengeProgress,
  checkEventChallengeProgress,
  checkGroupChallengeProgress,
} from "../../services/checkChallengeProgress";
import { Image, ScrollView } from "native-base";

// Done
// Get activity data & update DB & store updated userInfo & challengeInfo
// Check challenge achievement & update DB

// Todo
// setTimer to get data in foregraound

const HomeScreen = () => {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [ongoingChallenges, setOngoingChallenges] = useState([]);

  useEffect(() => {
    async function initActivityDataInDB(user_id) {
      setOngoingChallenges([]);
      // user real uid
      // const user_id = await AsyncStorage.getItem("@uid");

      // Save activity data to Database
      await saveActivityData(user_id);

      // Check daily, event, group challenge progress
      const dailyChallengeStatus = await checkDailyChallengeProgress(user_id);
      const eventChallengeObj = await checkEventChallengeProgress(user_id);
      const groupChallengeObj = await checkGroupChallengeProgress(user_id);
      const newOngoingChallenges = [];

      newOngoingChallenges.push(dailyChallengeStatus);
      if (eventChallengeObj) {
        newOngoingChallenges.push(...eventChallengeObj);
      }
      if (groupChallengeObj) {
        newOngoingChallenges.push(...groupChallengeObj);
      }

      setOngoingChallenges((prevChallenges) => [
        ...prevChallenges,
        ...newOngoingChallenges,
      ]);

      // Store synced user info in local storage
      const responseUserInfo = await retrieveUserInfo(user_id);
      const jsonValue = JSON.stringify(responseUserInfo);
      await AsyncStorage.setItem("@userInfo", jsonValue);

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
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Text>streak_days: {userInfo.streak_days}</Text>
        <Text>hearts: {userInfo.hearts}</Text>
        <Text>fireflies: {userInfo.fireflies}</Text>
      </View>
      <OngoingChallengeContainer ongoingChallenges={ongoingChallenges} />
    </ScrollView>
  );
};

export default HomeScreen;
