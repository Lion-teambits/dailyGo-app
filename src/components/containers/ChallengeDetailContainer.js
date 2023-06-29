import { useNavigation } from "@react-navigation/native";
import {
  Button,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  View,
} from "native-base";

const ChallengeDetailContainer = (props) => {
  const { challenge } = props;
  const navigation = useNavigation();

  const startEvent = () => {
    // Handle start event button press
    console.log("Event started!");
  };

  const goBackToChallenges = () => {
    navigation.goBack();
  };

  return (
    <VStack space={1} margin={4} alignItems="center">
      <Text>{challenge.status}</Text>
      <Heading size={"lg"}>{challenge.title}</Heading>
      <Image
        alt={challenge.title}
        source={challenge.monster_image}
        size="2xl"
      />
      <Text>{challenge.description}</Text>
      <View style={{ width: 100, height: 10, backgroundColor: "green" }} />
      <Text>Rewards</Text>
      <HStack space={1} marginTop={1}>
        <Image
          alt={challenge.badgeTitle}
          source={challenge.badgeImage}
          style={{ width: 50, height: 50 }}
        />
        <Text>{challenge.badgeTitle}</Text>
      </HStack>
      <Button width={"100%"} borderRadius={50} onPress={startEvent}>
        Join Event
      </Button>
      <Button width={"100%"} borderRadius={50} onPress={goBackToChallenges}>
        Go Back to Challenges
      </Button>
    </VStack>
  );
};

export default ChallengeDetailContainer;
