import { Box, Button, HStack, Heading, Image, Text, VStack } from "native-base";
import { IMAGE_GROUP_EVENT_LIST } from "../../constants/imagePaths";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY_MEDIUM, SECONDARY_MEDIUM } from "../../constants/colorCodes";

const GroupEventCard = () => {
  const navigation = useNavigation();

  const navigateToGroupSearch = () => {
    navigation.navigate("GroupChallenge");
  };

  const navigateToCreateGroupChallenge = () => {
    navigation.navigate("CreateGroupChallenge");
  };

  return (
    <Box
      paddingY={2}
      paddingX={4}
      margin={3}
      borderRadius={10}
      bg="white"
      shadow={2}
      overflow="hidden"
    >
      <VStack>
        <Heading size={"sm"}>Team event</Heading>
        <Text>
          Join to your friends to beat monsters in personalized event.
        </Text>
        <HStack>
          <Box width={"60%"} justifyContent="center" alignItems="center">
            <Image
              alt="Group event icon"
              source={IMAGE_GROUP_EVENT_LIST}
              style={{ width: 184, height: 80 }}
            />
          </Box>
          <Box width={"40%"}>
            <VStack>
              <Button
                borderRadius={50}
                margin={1}
                onPress={navigateToGroupSearch}
                backgroundColor={SECONDARY_MEDIUM}
              >
                Join Event
              </Button>
              <Button
                borderRadius={50}
                margin={1}
                onPress={navigateToCreateGroupChallenge}
                backgroundColor={PRIMARY_MEDIUM}
              >
                Create Event
              </Button>
            </VStack>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default GroupEventCard;
