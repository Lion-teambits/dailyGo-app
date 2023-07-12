import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import saveActivityData from "../../services/saveActivityData";
import { retrieveUserInfo } from "../../api/userService";
import OngoingChallengeContainer from "../../components/containers/OngoingChallengeContainer";
import {
  checkDailyChallengeProgress,
  checkEventChallengeProgress,
  checkGroupChallengeProgress,
} from "../../services/checkChallengeProgress";
import { ScrollView } from "native-base";
import UserContext from "../../state/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// Todo
// setTimer to get data in foregraound

const HomeScreen = ({ route }) => {
  const { challengeProgressID } = route.params;

  const [userInfo, setUserInfo] = useState();
  const [joinedUserProgressId, setJoinedUserProgressId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ongoingChallenges, setOngoingChallenges] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function initActivityDataInDB() {
      setOngoingChallenges([]);
      // user real uid
      const user_id = await AsyncStorage.getItem("@uid");
      console.log("user_id", user_id);

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

      setOngoingChallenges(newOngoingChallenges);
      const responseUserInfo = await retrieveUserInfo(user_id);
      setUserInfo(responseUserInfo);
      console.log("HOME", responseUserInfo);

      setIsLoading(false);
    }

    // Rerendering when Home screen focused
    const unsubscribe = navigation.addListener("focus", () => {
      if (challengeProgressID) {
        setJoinedUserProgressId(challengeProgressID);
        navigation.setParams({
          challengeProgressID: null,
        });
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    });

    if (isLoading) {
      initActivityDataInDB();
    }

    return unsubscribe;
  }, [isLoading, challengeProgressID]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <UserContext.Provider
        value={{ userInfo, setUserInfo, isLoading, setIsLoading }}
      >
        <View>
          <Text>streak_days: {userInfo.streak_days}</Text>
          <Text>hearts: {userInfo.hearts}</Text>
          <Text>fireflies: {userInfo.fireflies}</Text>
        </View>
        <OngoingChallengeContainer
          ongoingChallenges={ongoingChallenges}
          focusChallengeID={joinedUserProgressId}
        />
      </UserContext.Provider>
    </ScrollView>
  );
};

export default HomeScreen;
