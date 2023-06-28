import { Box, HStack, VStack } from "native-base";

const GroupEventCard = () => {
  return (
    <Box
      style={{ borderRadius: 10, margin: 10 }}
      bg="white"
      shadow={2}
      overflow="hidden"
    >
      <VStack>
        <Text>Group event</Text>
        <Text>
          Join to your friends to beat monsters in personalized event.
        </Text>
        <HStack></HStack>
      </VStack>
    </Box>
  );
};

export default GroupEventCard;
