import { ScrollView } from "native-base";
import ChallengeDetailContainer from "../../components/containers/ChallengeDetailContainer";

const ChallengeDetailScreen = ({ route }) => {
  const { challenge } = route.params;
  return (
    <ScrollView>
      <ChallengeDetailContainer challenge={challenge} />
    </ScrollView>
  );
};

export default ChallengeDetailScreen;
