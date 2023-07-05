import { Box, HStack, Heading, Image, Text, VStack } from "native-base";
import StepsBarGraph from "../graphs/StepsBarGraph";

const GroupChallengeListItem = ({ challenge }) => {
  const targetSteps = challenge.target_steps;
  const currentSteps = challenge.group_current_steps;
  const progressRatio = currentSteps / targetSteps;
  const progressBarWidth = `${progressRatio * 100}%`;
  return (
    <Box paddingY={2} paddingX={4}>
      <VStack>
        <Text>TEAM EVENT</Text>
        <HStack>
          <Box width={"65%"}>
            <VStack>
              <Heading size={"sm"}>{challenge.title}</Heading>
              <Text>Join your friends for bigger challenges!</Text>
              <StepsBarGraph
                currentSteps={currentSteps}
                targetSteps={targetSteps}
                progressBarWidth={progressBarWidth}
              />
              <Text>TODO: Display Member</Text>
            </VStack>
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

export default GroupChallengeListItem;
