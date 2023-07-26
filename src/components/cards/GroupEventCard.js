import { Box, Button, HStack, Image, VStack } from "native-base";
import { IMAGE_GROUP_EVENT_LIST } from "../../constants/imagePaths";
import { useNavigation } from "@react-navigation/native";
import {
  BG_DARK,
  PRIMARY_MEDIUM,
  SECONDARY_MEDIUM,
  TXT_LIGHT_BG,
} from "../../constants/colorCodes";
import { StyleSheet } from "react-native";
import Typography from "../typography/typography";

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
              <Button
                borderRadius={50}
                margin={1}
                onPress={navigateToGroupSearch}
                backgroundColor={SECONDARY_MEDIUM}
              >
                Join Event
              </Button>
              <Button
                borderRadius={50}
                margin={1}
                onPress={navigateToCreateGroupChallenge}
                backgroundColor={PRIMARY_MEDIUM}
              >
                Create Event
              </Button>
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
