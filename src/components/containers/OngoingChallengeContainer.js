import { View, ScrollView, Dimensions } from "react-native";
import OngoingChallengeCard from "../list/OngoingChallengeCard";

const OngoingChallengeContainer = ({ challengeArr }) => {
  const windowWidth = Dimensions.get("window").width;
//   console.log("Container: ", challengeArr);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        pagingEnabled
      >
        {challengeArr.map((challenge, index) => (
          <OngoingChallengeCard
            key={index}
            ongoingChallenge={challenge}
            width={windowWidth}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default OngoingChallengeContainer;
