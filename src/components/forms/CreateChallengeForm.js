import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { SECONDARY_MEDIUM } from "../../constants/colorCodes";
import {
  GROUP_CHALLENGE_BADGE_INFO,
  groupChallengeMosters,
} from "../../data/challengeData";
import { TouchableOpacity } from "react-native-gesture-handler";
import BadgeToAchieve from "../cards/BadgeToAchieve";

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
      <Text>Team event title</Text>
      <Input
        marginRight={1}
        variant="rounded"
        width={"100%"}
        onChangeText={handleTitleChange}
      />
      <Box marginY={2}>
        <Text>Monster Challenge</Text>
        <HStack space={1} justifyContent="space-around">
          {groupChallengeMosters.map((imageData, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImageSelect(imageData)}
            >
              <Center>
                <Box
                  padding={1}
                  backgroundColor={"blue.100"}
                  borderColor={
                    selectImgInfo.source === imageData.source
                      ? "red"
                      : undefined
                  }
                  borderWidth={
                    selectImgInfo.source === imageData.source ? 2 : 0
                  }
                >
                  <Image
                    alt={imageData.title}
                    source={imageData.source}
                    style={{ width: 72, height: 70 }}
                  />
                </Box>
                <Text>{imageData.steps} steps</Text>
              </Center>
            </TouchableOpacity>
          ))}
        </HStack>
      </Box>

      <Box marginY={2}>
        <Text>Rewards</Text>
        <Text>TODO: Badge Info</Text>
        <BadgeToAchieve
          badgeId={GROUP_CHALLENGE_BADGE_INFO}
          steps={selectImgInfo ? selectImgInfo.steps : 0}
        />
      </Box>

      <Button
        margin={1}
        width={"100%"}
        borderRadius={50}
        onPress={handleCreateGroupEvent}
        backgroundColor={SECONDARY_MEDIUM}
      >
        Create Team Event
      </Button>
      <Button
        margin={1}
        width={"100%"}
        borderRadius={50}
        onPress={goBackToChallenges}
        variant="unstyled"
      >
        Cancel
      </Button>
    </VStack>
  );
};

export default CreateChallengeForm;
