import { Box, HStack, Image, VStack } from "native-base";
import { eventDateStatus } from "../../utils/dateUtils";
import StepsBarGraph from "../graphs/StepsBarGraph";
import { TimeDiffTextBox } from "../textBoxes/TimeDiffTextBox";
import Typography from "../../components/typography/typography";
import { StyleSheet } from "react-native";
import { BG_DARK, TXT_LIGHT_BG } from "../../constants/colorCodes";
import CurrentBG from "../../../assets/images/challenge/currentChallengeListBG.svg";
import ActiveBG from "../../../assets/images/challenge/activeChallengeListBG.svg";
import UpcomingBG from "../../../assets/images/challenge/upcomingChallengeListBG.svg";

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

  let BackgroundComponent = null;

  if (status === "CURRENT EVENT") {
    BackgroundComponent = CurrentBG;
  } else if (status === "ACTIVE EVENT") {
    BackgroundComponent = ActiveBG;
  } else if (status === "UPCOMING EVENT") {
    BackgroundComponent = UpcomingBG;
  } else {
    // default value
    BackgroundComponent = null;
  }

  return (
    <Box>
      {BackgroundComponent ? (
        <BackgroundComponent
          width="100%"
          style={{
            position: "absolute",
          }}
        />
      ) : null}

      <Box paddingY={2} paddingX={4}>
        <VStack space={2}>
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
            <Box width={"60%"}>
              <VStack space={2}>
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
            <Box width={"40%"} justifyContent="center" alignItems="center">
              <Image
                alt={challenge.title}
                source={challenge.monster_image}
                style={{ width: 136, height: 153 }}
                resizeMode="contain"
              />
            </Box>
          </HStack>
        </VStack>
      </Box>
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
