import { ScrollView } from "native-base";
import CreateGroupChallengeContainer from "../../components/containers/CreateGroupChallengeContainer";
import {
  challengeStyles,
  challengeTitleOption,
} from "../../styles/challengeStyles";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

const CreateGroupChallengeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(challengeTitleOption("Create Team Challenge"));
  }, [navigation]);

  return (
    <ScrollView style={challengeStyles.container}>
      <CreateGroupChallengeContainer />
    </ScrollView>
  );
};

export default CreateGroupChallengeScreen;
