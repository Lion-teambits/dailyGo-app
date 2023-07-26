import { Box, HStack, Image, VStack } from "native-base";
import { eventDateStatus } from "../../utils/dateUtils";
import StepsBarGraph from "../graphs/StepsBarGraph";
import { TimeDiffTextBox } from "../textBoxes/TimeDiffTextBox";
import Typography from "../../components/typography/typography";
import { StyleSheet } from "react-native";
import { BG_DARK, TXT_LIGHT_BG } from "../../constants/colorCodes";

const ChallengeListItem = ({ challenge, joinedUserProgress }) => {
  const { status, timeDifference, color } = eventDateStatus(
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
            <Box paddingY={1}>
              <Typography type="capitalized" style={{ color: color }}>
                {status}
              </Typography>
            </Box>
            <TimeDiffTextBox timeDifference={timeDifference} />
          </HStack>
        </Box>
        <HStack space={1}>
          <Box width={"65%"}>
            <VStack>
              <Typography type="subtitles" style={styles.subtitles}>
                {challenge.title}
              </Typography>
              <Typography type="body2" style={styles.body}>
                {challenge.monster_desc}
              </Typography>
              {joinedUserProgress ? (
                <StepsBarGraph
                  currentSteps={currentSteps}
                  targetSteps={targetSteps}
                  progressBarWidth={progressBarWidth}
                />
              ) : (
                <Box>
                  <Typography type="smallTextRegular" style={styles.body}>
                    Goal
                  </Typography>
                  <Typography type="body2Bold" style={styles.body}>
                    {challenge.target_steps} steps
                  </Typography>
                </Box>
              )}
              <Typography type="smallTextRegular" style={styles.body}>
                Get a special badge
              </Typography>
            </VStack>
          </Box>
          <Box width={"35%"} justifyContent="center" alignItems="center">
            <Image
              alt={challenge.title}
              source={challenge.monster_image}
              size="lg"
            />
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  subtitles: {
    color: TXT_LIGHT_BG,
  },
  body: {
    color: BG_DARK,
  },
});

export default ChallengeListItem;
