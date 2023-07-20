import React, { useCallback, useState } from "react";
import ChallengeList from "../../components/list/ChallengeList";
import { Box, ScrollView } from "native-base";
import GroupEventCard from "../../components/cards/GroupEventCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveUserInfo } from "../../api/userService";
import GroupChallengeList from "../../components/list/GroupChallengeList";
import { useFocusEffect } from "@react-navigation/native";

const ChallengesScreen = () => {
  const [userData, setUserData] = useState("");

  useFocusEffect(
    useCallback(() => {
      const getUserInfo = async () => {
        const uid = await AsyncStorage.getItem("@uid");
        const userInfo = await retrieveUserInfo(uid);
        setUserData(userInfo);
        console.log("[ChallengesScreen]userInfo: ", userInfo);
      };
      getUserInfo();
    }, [])
  );

  return (
    <ScrollView>
      <Box bg="white">
        <ChallengeList userData={userData} />
        <GroupChallengeList userData={userData} />
        <GroupEventCard />
      </Box>
    </ScrollView>
  );
};

export default ChallengesScreen;
