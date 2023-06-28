import { Box, Button, HStack, Heading, Image, Text, VStack } from "native-base";
import { IMAGE_GROUP_EVENT_LIST } from "../../constants/imagePaths";

const GroupEventCard = () => {
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
        <Heading size={"sm"}>Group event</Heading>
        <Text>
          Join to your friends to beat monsters in personalized event.
        </Text>
        <HStack>
          <Box justifyContent="center" alignItems="center">
            <Image
              alt="Group event icon"
              source={IMAGE_GROUP_EVENT_LIST}
              style={{ width: 184, height: 80 }}
            />
          </Box>
          <Box>
            <VStack>
              <Button borderRadius={50} margin={1}>
                Join Event
              </Button>
              <Button borderRadius={50} margin={1}>
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
