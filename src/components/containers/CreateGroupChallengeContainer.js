import { useNavigation } from "@react-navigation/native";
import { Box, Text, VStack } from "native-base";
import { useState } from "react";
import CreateChallengeForm from "../forms/CreateChallengeForm";
import { createGroupChallenge } from "../../api/groupChallengeService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GroupChallengeListItem from "../listitems/GroupChallengeListItem";

const CreateGroupChallengeContainer = () => {
  const navigation = useNavigation();
  const [groupInfo, setGroupInfo] = useState("");

  const createGroupEvent = async (title, selectImgInfo) => {
    console.log("title:" + title + " | selectImgInfo: " + selectImgInfo.title);
    if (title === "" || selectImgInfo === "") {
      setGroupInfo("");
      alert("Input title or select monster!");
      return;
    }

    try {
      // 1. Make team challenge event
      const uId = await AsyncStorage.getItem("@uid");
      const groupChallengeInfo = await createGroupChallenge(
        title,
        selectImgInfo,
        uId
      );
      setGroupInfo(groupChallengeInfo);
      // 2. Add  team challenge event id to the user documnet.
    } catch (error) {
      console.log("[dev]Error: ", error);
      setGroupInfo("");
      alert("Team event not created!");
    }
  };

  const goBackToChallenges = () => {
    navigation.goBack();
  };

  return (
    <VStack marginX={4}>
      {groupInfo ? (
        <VStack>
          <Text>Event Created</Text>
          <Text>: {groupInfo.member_list}</Text>
          <GroupChallengeListItem challenge={groupInfo} />
        </VStack>
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
