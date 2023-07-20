import { Box, HStack, Heading, Image, Text, VStack } from "native-base";
import { eventDateStatus } from "../../utils/dateUtils";
import StepsBarGraph from "../graphs/StepsBarGraph";
import { TimeDiffTextBox } from "../textBoxes/TimeDiffTextBox";

const ChallengeListItem = ({ challenge, joinedUserProgress }) => {
  const { status, timeDifference } = eventDateStatus(
    challenge.start_date,
    challenge.expired_date,
    joinedUserProgress
  );

  const targetSteps = challenge.target_steps;
  const currentSteps = joinedUserProgress?.current_steps;
  const progressRatio = currentSteps / targetSteps;
  const progressBarWidth = `${Math.max(progressRatio * 100, 5)}%`;

  return (
    <Box paddingY={2} paddingX={4}>
      <VStack>
        <Box>
          <HStack justifyContent="space-between">
            <Text>{status}</Text>
            <TimeDiffTextBox timeDifference={timeDifference} />
          </HStack>
        </Box>
        <HStack space={1}>
          <Box width={"65%"}>
            <VStack>
              <Heading size={"sm"}>{challenge.title}</Heading>
              <Text>{challenge.monster_desc}</Text>
              {joinedUserProgress ? (
                <StepsBarGraph
                  currentSteps={currentSteps}
                  targetSteps={targetSteps}
                  progressBarWidth={progressBarWidth}
                />
              ) : (
                <Box>
                  <Text>Goal</Text>
                  <Heading size={"sm"}>{challenge.target_steps} steps</Heading>
                </Box>
              )}
              <Text>Get a special badge</Text>
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

export default ChallengeListItem;
