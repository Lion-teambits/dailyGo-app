import { ScrollView } from "native-base";
import CreateGroupChallengeContainer from "../../components/containers/CreateGroupChallengeContainer";
import { challengeStyles } from "../../styles/challengeStyles";

const CreateGroupChallengeScreen = () => {
  return (
    <ScrollView style={challengeStyles.container}>
      <CreateGroupChallengeContainer />
    </ScrollView>
  );
};

export default CreateGroupChallengeScreen;
