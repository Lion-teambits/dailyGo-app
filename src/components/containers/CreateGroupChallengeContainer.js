import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  HStack,
  Text,
  VStack,
  useClipboard,
} from "native-base";
import { useState } from "react";
import CreateChallengeForm from "../forms/CreateChallengeForm";
import { createGroupChallenge } from "../../api/groupChallengeService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GroupChallengeListItem from "../listitems/GroupChallengeListItem";
import { SECONDARY_MEDIUM } from "../../constants/colorCodes";
import { Share } from "react-native";
import { retrieveUserInfo, updateUserInfo } from "../../api/userService";
import { createChallengeProgress } from "../../api/challengeProgressService";
import { GROUP_CHALLENGE_BADGE_INFO as badgeInfo } from "../../data/challengeData";
import { convertToBase32 } from "../../utils/dateUtils";

const CreateGroupChallengeContainer = () => {
  const navigation = useNavigation();
  const [groupInfo, setGroupInfo] = useState("");
  const { value, onCopy } = useClipboard();
  const isGroupChallenge = true;

  const makeShareCode = () => {
    const currentTimeStamp = new Date().getTime();
    const currentTimeStampString = currentTimeStamp.toString();
    const shortenNumber = currentTimeStampString.slice(-10);
    return convertToBase32(shortenNumber);
  };

  const createGroupEvent = async (title, selectImgInfo) => {
    if (title === "" || selectImgInfo === "") {
      setGroupInfo("");
      alert("Input title or select monster!");
      return;
    }

    try {
      const uid = await AsyncStorage.getItem("@uid");
      const userData = await retrieveUserInfo(uid);

      // 1. Make team challenge event
      const challenge = await createGroupChallenge(
        title,
        selectImgInfo,
        uid,
        badgeInfo,
        makeShareCode()
      );
      setGroupInfo(challenge);

      // 2. Make team challenge progress event
      const groupChallengeProgress = await createChallengeProgress(
        challenge,
        isGroupChallenge
      );

      // 3. Add team challenge event id to the user documnet.
      userData.group_challenge_progress.push(groupChallengeProgress._id);
      await updateUserInfo(uid, {
        group_challenge_progress: userData.group_challenge_progress,
      });
    } catch (error) {
      console.log("[dev]Error: ", error);
      setGroupInfo("");
      alert("Team event not created!");
    }
  };

  const goBackToChallenges = () => {
    navigation.goBack();
  };

  const shareCode = async () => {
    try {
      await Share.share({
        message: `${groupInfo.share_id}`,
      });
    } catch (error) {
      console.log("Error sharing code:", error);
    }
  };

  return (
    <VStack marginX={4}>
      {groupInfo ? (
        <Box>
          <Box
            borderRadius={10}
            margin={3}
            bg="white"
            shadow={2}
            overflow="hidden"
          >
            <GroupChallengeListItem challenge={groupInfo} />
          </Box>
          <Center>
            <HStack>
              <Text>Code: {groupInfo.share_id}</Text>
              <Button bordered onPress={() => onCopy(groupInfo.share_id)}>
                Copy
              </Button>
            </HStack>
            <Button
              margin={1}
              width={"100%"}
              borderRadius={50}
              onPress={shareCode}
              backgroundColor={SECONDARY_MEDIUM}
            >
              Share Invitation Code
            </Button>
            <Button
              margin={1}
              width={"100%"}
              borderRadius={50}
              onPress={goBackToChallenges}
              variant="unstyled"
            >
              Go back to Challenges
            </Button>
          </Center>
        </Box>
      ) : (
        <CreateChallengeForm
          createGroupEvent={createGroupEvent}
          goBackToChallenges={goBackToChallenges}
        />
      )}
    </VStack>
  );
};

export default CreateGroupChallengeContainer;
