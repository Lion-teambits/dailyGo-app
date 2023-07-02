import { Box, HStack, Heading, Image, Text, VStack } from "native-base";
import { eventDateStatus } from "../../utils/dateUtils";

const ChallengeListItem = ({ challenge }) => {
  const { status, timeDifference } = eventDateStatus(
    challenge.start_date,
    challenge.expired_date,
    false
  );

  return (
    <Box paddingY={2} paddingX={4}>
      <VStack>
        <Box>
          <HStack justifyContent="space-between">
            <Text>{status}</Text>
            <Text>{timeDifference}</Text>
          </HStack>
        </Box>
        <HStack space={1}>
          <Box width={"65%"}>
            <VStack>
              <Text>{challenge.status}</Text>
              <Heading size={"sm"}>{challenge.title}</Heading>
              <Text>{challenge.monster_desc}</Text>
              <Text>Goal</Text>
              <Heading size={"sm"}>{challenge.target_steps} steps</Heading>
            </VStack>
            <Text>Get a special badge</Text>
          </Box>
          <Box width={"35%"} justifyContent="center" alignItems="center">
            <Image
              alt={challenge.title}
              source={challenge.monster_image}
              size="xl"
            />
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ChallengeListItem;
