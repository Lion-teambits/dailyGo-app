import { Box, Button, Center, HStack, Image, Input, VStack } from "native-base";
import { useState } from "react";
import {
  PRIMARY_DARK,
  SECONDARY_LIGHT,
  SECONDARY_MEDIUM,
} from "../../constants/colorCodes";
import {
  GROUP_CHALLENGE_BADGE_INFO,
  groupChallengeMosters,
} from "../../data/challengeData";
import { TouchableOpacity } from "react-native-gesture-handler";
import BadgeToAchieve from "../cards/BadgeToAchieve";
import { StyleSheet } from "react-native";
import Typography from "../typography/typography";
import BackToPreviousButton from "../buttons/BackToPreviousButton";
import SecondaryButton from "../buttons/SecondaryButton";

const CreateChallengeForm = ({ createGroupEvent, goBackToChallenges }) => {
  const [title, setTitle] = useState("");
  const [selectImgInfo, setSelectImgInfo] = useState("");

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleImageSelect = (value) => {
    setSelectImgInfo(value);
  };

  const handleCreateGroupEvent = () => {
    createGroupEvent(title, selectImgInfo);
  };

  return (
    <VStack>
      <Typography type="smallTextBold" style={styles.body}>
        Team event title
      </Typography>
      <Input
        marginTop={4}
        marginRight={1}
        variant="rounded"
        width={"100%"}
        onChangeText={handleTitleChange}
        placeholder="Type the event title"
        fontFamily="WorkSansRegular"
        fontSize={14}
        lineHeight={17}
      />
      <Box marginY={4}>
        <Typography type="smallTextBold" style={styles.body}>
          Monster Challenge
        </Typography>
        <HStack marginTop={4} space={1} justifyContent="space-around">
          {groupChallengeMosters.map((imageData, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImageSelect(imageData)}
            >
              <Center>
                <Box
                  padding={1}
                  backgroundColor={"blue.100"}
                  borderRadius={10}
                  borderColor={
                    selectImgInfo.source === imageData.source
                      ? SECONDARY_LIGHT
                      : undefined
                  }
                  borderWidth={
                    selectImgInfo.source === imageData.source ? 3 : 0
                  }
                >
                  <Image
                    alt={imageData.title}
                    source={imageData.source}
                    style={{ width: 72, height: 70 }}
                  />
                </Box>
                <Typography type="smallTextBold" style={styles.body}>
                  {imageData.steps} steps
                </Typography>
              </Center>
            </TouchableOpacity>
          ))}
        </HStack>
      </Box>

      <Box marginY={6}>
        <Typography type="smallTextBold" style={styles.body}>
          Rewards
        </Typography>
        <BadgeToAchieve
          badgeId={GROUP_CHALLENGE_BADGE_INFO}
          steps={selectImgInfo ? selectImgInfo.steps : 0}
        />
      </Box>

      <SecondaryButton
        onPressFunc={handleCreateGroupEvent}
        isDisabled={false}
        text={"Create Team Event"}
      />
      <BackToPreviousButton callbackFunc={goBackToChallenges} text={"Cancel"} />
    </VStack>
  );
};

const styles = StyleSheet.create({
  body: {
    color: PRIMARY_DARK,
  },
});

export default CreateChallengeForm;
