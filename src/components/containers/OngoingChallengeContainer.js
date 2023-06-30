import { View, ScrollView, Dimensions, Text } from "react-native";
import OngoingChallengeCard from "../list/OngoingChallengeCard";

const OngoingChallengeContainer = ({ ongoingChallenges }) => {
  const windowWidth = Dimensions.get("window").width;
  //   console.log("Container: ", challengeArr);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        pagingEnabled
      >
        <OngoingChallengeCard
          type="daily"
          ongoingChallenge={ongoingChallenges[0].daily}
          width={windowWidth}
        />
        <View style={{width: windowWidth}}>
          <Text>Event</Text>
        </View>
        <View style={{width: windowWidth}}>
          <Text>Team</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default OngoingChallengeContainer;
