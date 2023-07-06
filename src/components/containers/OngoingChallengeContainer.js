import { View, ScrollView, Dimensions, Text } from "react-native";
import OngoingChallengeCard from "../cards/OngoingChallengeCard";
import { useRef } from "react";

const OngoingChallengeContainer = ({ ongoingChallenges }) => {
  const windowWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef(null);
  let pageCount = ongoingChallenges.length;
  
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {ongoingChallenges.map((challenge, index) => (
          <View
            style={{ width: windowWidth }}
            key={index}
          >
            <OngoingChallengeCard
              challenge={challenge}
              totalPageCount={pageCount}
              currentPage={index + 1}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default OngoingChallengeContainer;
