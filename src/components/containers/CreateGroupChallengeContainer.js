import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";
import { useState } from "react";
import CreateChallengeForm from "../forms/CreateChallengeForm";

const CreateGroupChallengeContainer = () => {
  const navigation = useNavigation();
  const [groupInfo, setGroupInfo] = useState("");

  const createGroupEvent = (title, imageSource) => {
    console.log("title:" + title + " | imageSource: " + imageSource);
  };

  const goBackToChallenges = () => {
    navigation.goBack();
  };

  return (
    <VStack marginX={4}>
      <CreateChallengeForm
        createGroupEvent={createGroupEvent}
        goBackToChallenges={goBackToChallenges}
      />
    </VStack>
  );
};

export default CreateGroupChallengeContainer;
