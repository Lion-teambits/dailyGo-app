import React from "react";
import { View, Text } from "react-native";
import ChallengeList from "../../components/list/ChallengeList";
import { ScrollView } from "native-base";

const ChallengesScreen = () => {
  return (
    <ScrollView>
      <View>
        <ChallengeList />
      </View>
    </ScrollView>
  );
};

export default ChallengesScreen;
