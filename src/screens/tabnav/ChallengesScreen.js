import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ChallengeList from "../../components/list/ChallengeList";
import { ScrollView } from "native-base";
import GroupEventCard from "../../components/cards/GroupEventCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveUserInfo } from "../../api/userService";
import GroupChallengeList from "../../components/list/GroupChallengeList";

const ChallengesScreen = () => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      const uid = await AsyncStorage.getItem("@uid");
      const userInfo = await retrieveUserInfo(uid);
      setUserData(userInfo);
    };
    getUserInfo();
  }, []);

  return (
    <ScrollView>
      <View>
        <ChallengeList userData={userData} />
        <GroupChallengeList userData={userData} />
        <GroupEventCard />
      </View>
    </ScrollView>
  );
};

export default ChallengesScreen;
