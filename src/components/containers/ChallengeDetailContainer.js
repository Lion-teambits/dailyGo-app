import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  View,
} from "native-base";
import { eventDateStatus } from "../../utils/dateUtils";

const ChallengeDetailContainer = (props) => {
  const { challenge } = props;
  const navigation = useNavigation();

  const { status, timeDifference } = eventDateStatus(
    props.challenge.start_date,
    props.challenge.expired_date,
    false
  );

  const startEvent = () => {
    // Handle start event button press
    console.log("Event started!");
  };

  const goBackToChallenges = () => {
    navigation.goBack();
  };

  return (
    <VStack space={1} margin={4}>
      <HStack justifyContent="space-between">
        <Text>{status}</Text>
        <Text>{timeDifference}</Text>
      </HStack>
      <Box space={1} alignItems="center">
        <Heading size={"lg"}>{challenge.title}</Heading>
        <Image
          alt={challenge.title}
          source={challenge.monster_image}
          size="2xl"
        />
        <Heading size={"md"}>{challenge.monster_name}</Heading>
        <Button
          margin={1}
          width={"100%"}
          borderRadius={50}
          onPress={startEvent}
        >
          Join Event
        </Button>
        <Button
          margin={1}
          width={"100%"}
          borderRadius={50}
          onPress={goBackToChallenges}
        >
          Go Back to Challenges
        </Button>
      </Box>
    </VStack>
  );
};

export default ChallengeDetailContainer;
