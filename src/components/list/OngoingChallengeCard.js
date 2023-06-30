import { Progress, Center, Box } from "native-base";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import image1 from "../../../assets/images/image1.jpeg";

const OngoingChallengeCard = ({ ongoingChallenge, type, width }) => {
  // console.log("OngoingChallengeCard", ongoingChallenge);
  const [challengeType, setChallengeType] = useState("Daily");
  const [progressRate, setProgressRate] = useState(null);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [timeLeft, setLeftTime] = useState("");

  useEffect(() => {
    setProgressRate(
      (ongoingChallenge.activityData.steps / ongoingChallenge.daily_goal) * 100
    );
    setSteps(ongoingChallenge.activityData.steps);
    setDistance(ongoingChallenge.activityData.distance);
    setCalories(ongoingChallenge.activityData.calories);
    setLeftTime(ongoingChallenge.timeLeft);
  }, [ongoingChallenge]);

  return (
    <View style={[styles.card, { width: width }]}>
      <Text style={styles.cardTitle}>{challengeType} Goal</Text>
      <Text>Time left: {timeLeft}</Text>
      <Image
        source={image1}
        style={styles.image}
      />
      <Text>Indicater with monster's name</Text>
      <Center w="100%">
        <Box
          w="90%"
          maxW="400"
        >
          <Progress
            value={progressRate}
            mx="4"
          />
        </Box>
      </Center>
      <Text>Distance {distance}</Text>
      <Text>Steps {steps}</Text>
      <Text>Calories {calories}</Text>
    </View>
  );
};

export default OngoingChallengeCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
  },
});
