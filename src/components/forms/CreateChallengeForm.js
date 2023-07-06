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
import { groupChallengeMosters } from "../../data/challengeData";
import { TouchableOpacity } from "react-native-gesture-handler";

const CreateChallengeForm = ({ createGroupEvent, goBackToChallenges }) => {
  const [title, setTitle] = useState("");
  const [imageSource, setImageSource] = useState("");

  const handleTitleChange = (value) => {
    setTitle(value);
  };

  const handleImageSelect = (value) => {
    setImageSource(value);
  };

  const handleCreateGroupEvent = () => {
    createGroupEvent(title, imageSource);
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
          {groupChallengeMosters.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImageSelect(image.source)}
            >
              <Center>
                <Box
                  padding={1}
                  backgroundColor={"blue.100"}
                  borderColor={imageSource === image.source ? "red" : undefined}
                  borderWidth={imageSource === image.source ? 2 : 0}
                >
                  <Image
                    alt={image.title}
                    source={image.source}
                    style={{ width: 72, height: 70 }}
                  />
                </Box>
                <Text>{image.steps} steps</Text>
              </Center>
            </TouchableOpacity>
          ))}
        </HStack>
      </Box>

      <Box marginY={2}>
        <Text>Rewards</Text>
        <Text>TODO: Badge Info</Text>
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
