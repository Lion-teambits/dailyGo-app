import React from "react";
import { View, Text } from "react-native";
import ChallengeList from "../../components/list/ChallengeList";
import { ScrollView } from "native-base";
import GroupEventCard from "../../components/cards/GroupEventCard";

const ChallengesScreen = () => {
  return (
    <ScrollView>
      <View>
        <ChallengeList />
        <GroupEventCard />
      </View>
    </ScrollView>
  );
};

export default ChallengesScreen;
