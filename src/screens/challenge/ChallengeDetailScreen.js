import { ScrollView } from "native-base";
import ChallengeDetailContainer from "../../components/containers/ChallengeDetailContainer";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { challengeStyles } from "../../styles/challengeStyles";
import { screenTitleOption } from "../../styles/commonStyles";

const ChallengeDetailScreen = ({ route }) => {
  const { challenge } = route.params;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(screenTitleOption(challenge.title));
  }, [navigation, challenge]);

  return (
    <ScrollView
      style={challengeStyles.container}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ChallengeDetailContainer
        challenge={challenge}
        isGroupChallenge={false}
      />
    </ScrollView>
  );
};

export default ChallengeDetailScreen;
