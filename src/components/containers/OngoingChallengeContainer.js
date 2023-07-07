import { View, ScrollView, Dimensions } from "react-native";
import OngoingChallengeCard from "../cards/OngoingChallengeCard";
import { useEffect, useRef, useState } from "react";

const OngoingChallengeContainer = ({ ongoingChallenges, focusChallengeID }) => {
  const windowWidth = Dimensions.get("window").width;
  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (focusChallengeID) {
      // Reset scroll position
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });

      // Adjust scroll position
      const targetIndex = ongoingChallenges.findIndex(
        (challenge) => challenge._id === focusChallengeID
      );
      const offsetX = targetIndex * windowWidth;
      scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
    }
  }, [focusChallengeID, ongoingChallenges]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setScrollPosition(offsetX);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={50}
      >
        {ongoingChallenges.map((challenge, index) => (
          <View
            style={{ width: windowWidth }}
            key={index}
          >
            <OngoingChallengeCard
              challenge={challenge}
              totalPageCount={ongoingChallenges.length}
              currentPage={Math.floor(scrollPosition / windowWidth) + 1}
              isFocused={challenge._id === focusChallengeID}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default OngoingChallengeContainer;
