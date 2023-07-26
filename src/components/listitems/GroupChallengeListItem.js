import { Box, HStack, Image, VStack } from "native-base";
import StepsBarGraph from "../graphs/StepsBarGraph";
import FriendsCard from "../cards/FriendsCard";
import Typography from "../typography/typography";
import { StyleSheet } from "react-native";
import { BG_DARK, SUCCESS, TXT_LIGHT_BG } from "../../constants/colorCodes";

const GroupChallengeListItem = ({ challenge }) => {
  const targetSteps = challenge.target_steps;
  const currentSteps = challenge.group_current_steps;
  const progressRatio = currentSteps / targetSteps;
  const progressBarWidth = `${Math.max(progressRatio * 100, 5)}%`;

  return (
    <Box paddingY={2} paddingX={4}>
      <VStack>
        <Typography type="capitalized" style={{ color: SUCCESS }}>
          TEAM EVENT
        </Typography>
        <HStack>
          <Box width={"60%"}>
            <VStack>
              <Typography type="subtitles" style={styles.subtitles}>
                {challenge.title}
              </Typography>
              <Typography type="body2" style={styles.body}>
                Have a smashing day!
              </Typography>
              <StepsBarGraph
                currentSteps={currentSteps}
                targetSteps={targetSteps}
                progressBarWidth={progressBarWidth}
              />
              <FriendsCard
                member={challenge.member_list}
                displayTitle={false}
              />
            </VStack>
          </Box>
          <Box width={"40%"} justifyContent="center" alignItems="center">
            <Image
              alt={challenge.title}
              source={parseInt(challenge.monster_image)}
              style={{ width: 136, height: 153 }}
              resizeMode="contain"
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

export default GroupChallengeListItem;
