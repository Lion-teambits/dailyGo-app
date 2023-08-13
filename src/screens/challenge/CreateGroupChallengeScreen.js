import { ScrollView } from "native-base";
import CreateGroupChallengeContainer from "../../components/containers/CreateGroupChallengeContainer";
import { challengeStyles } from "../../styles/challengeStyles";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { screenTitleOption } from "../../styles/commonStyles";

const CreateGroupChallengeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(screenTitleOption("Create Team Challenge"));
  }, [navigation]);

  return (
    <ScrollView style={challengeStyles.container}>
      <CreateGroupChallengeContainer />
    </ScrollView>
  );
};

export default CreateGroupChallengeScreen;
