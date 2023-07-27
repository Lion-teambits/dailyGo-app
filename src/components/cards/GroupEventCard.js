import { Box, HStack, Image, VStack } from "native-base";
import { IMAGE_GROUP_EVENT_LIST } from "../../constants/imagePaths";
import { useNavigation } from "@react-navigation/native";
import { BG_DARK, TXT_LIGHT_BG } from "../../constants/colorCodes";
import { StyleSheet } from "react-native";
import Typography from "../typography/typography";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";

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
        <Typography type="subtitles" style={styles.subtitles} size={"sm"}>
          Team event
        </Typography>
        <Typography type="body2" style={styles.body}>
          Join to your friends to beat monsters in personalized event.
        </Typography>
        <HStack>
          <Box width={"55%"} justifyContent="center" alignItems="center">
            <Image
              alt="Group event icon"
              source={IMAGE_GROUP_EVENT_LIST}
              style={{ width: 154, height: 80 }}
            />
          </Box>
          <Box width={"45%"}>
            <VStack>
              <SecondaryButton
                onPressFunc={navigateToGroupSearch}
                isDisabled={false}
                text={"Join Event"}
              />
              <PrimaryButton
                onPressFunc={navigateToCreateGroupChallenge}
                isDisabled={false}
                text={"Create Event"}
              />
            </VStack>
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

export default GroupEventCard;
