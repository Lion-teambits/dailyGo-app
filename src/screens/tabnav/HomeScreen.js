import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import saveActivityData from "../../services/saveActivityData";
import { retrieveUserInfo } from "../../api/userService";
import OngoingChallengeContainer from "../../components/containers/OngoingChallengeContainer";
import {
  checkDailyChallengeProgress,
  checkEventChallengeProgress,
  checkGroupChallengeProgress,
} from "../../services/checkChallengeProgress";
import { HStack, ScrollView, Center } from "native-base";
import UserContext from "../../state/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusChip from "../../components/chips/StatusChip";
import HomeBG from "../../../assets/images/homeBG.svg";
import { PRIMARY_MEDIUM } from "../../constants/colorCodes";

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
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <Center style={{flex:1}}>
          <ActivityIndicator
            size="large"
            color={PRIMARY_MEDIUM}
          />
        </Center>
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <HomeBG
            width="100%"
            style={{
              position: "absolute",
              top: -60,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <UserContext.Provider
            value={{ userInfo, setUserInfo, isLoading, setIsLoading }}
          >
            <HStack
              space="2xl"
              margin={4}
            >
              <StatusChip
                type="streak"
                number={userInfo.streak_days}
              />
              <StatusChip
                type="firefly"
                number={userInfo.fireflies}
              />
              <StatusChip
                type="heart"
                number={userInfo.hearts}
              />
            </HStack>
            <OngoingChallengeContainer
              ongoingChallenges={ongoingChallenges}
              focusChallengeID={joinedUserProgressId}
            />
          </UserContext.Provider>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
