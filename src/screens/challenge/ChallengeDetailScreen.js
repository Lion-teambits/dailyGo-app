import { ScrollView } from "native-base";
import ChallengeDetailContainer from "../../components/containers/ChallengeDetailContainer";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import {
  challengeStyles,
  challengeTitleOption,
} from "../../styles/challengeStyles";

const ChallengeDetailScreen = ({ route }) => {
  const { challenge } = route.params;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(challengeTitleOption(challenge.title));
  }, [navigation, challenge]);

  return (
    <ScrollView style={challengeStyles.container}>
      <ChallengeDetailContainer
        challenge={challenge}
        isGroupChallenge={false}
      />
    </ScrollView>
  );
};

export default ChallengeDetailScreen;
