import { ScrollView } from "native-base";
import GroupChallengeContainer from "../../components/containers/GroupChallengeContainer";
import { challengeStyles } from "../../styles/challengeStyles";

const GroupChallengeScreen = () => {
  return (
    <ScrollView style={challengeStyles.container}>
      <GroupChallengeContainer />
    </ScrollView>
  );
};

export default GroupChallengeScreen;
