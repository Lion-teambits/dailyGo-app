import { Box, HStack, Image, VStack } from "native-base";
import { badges } from "../../data/badgeData";
import { StyleSheet } from "react-native";
import { BG_DARK, PRIMARY_DARK } from "../../constants/colorCodes";
import Typography from "../typography/typography";

const BadgeToAchieve = ({ badgeId, steps }) => {
  const badgeInfo = badges.find((badge) => badge.id == badgeId);

  return (
    <Box
      paddingY={4}
      paddingX={4}
      margin={3}
      borderRadius={16}
      bg="white"
      shadow={4}
    >
      <VStack space={3}>
        <Typography
          type="subtitles"
          style={styles.titles}
        >
          Badge to Achieve
        </Typography>
        <HStack>
          <Box
            width={"40%"}
            marginRight={2}
          >
            <Image
              alt="Badge Image"
              source={parseInt(badgeInfo.badgeImage)}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
          </Box>
          <Box width={"60%"}>
            <VStack space={4}>
              <Box>
                <Typography
                  type="smallTextBold"
                  style={styles.subtitles}
                >
                  {badgeInfo.badgeTitle}
                </Typography>
                <Typography
                  type="smallTextRegular"
                  style={styles.body}
                >
                  {badgeInfo.description}
                </Typography>
              </Box>
              <Box>
                <Typography
                  type="smallTextBold"
                  style={styles.subtitles}
                >
                  Goal: {steps} Steps
                </Typography>
                <Typography
                  type="smallTextRegular"
                  style={styles.body}
                >
                  Est. distance: {parseInt(steps * 0.0007)} Km
                </Typography>
              </Box>
            </VStack>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  titles: {
    color: PRIMARY_DARK,
  },
  subtitles: {
    color: PRIMARY_DARK,
  },
  body: {
    color: BG_DARK,
  },
});

export default BadgeToAchieve;
