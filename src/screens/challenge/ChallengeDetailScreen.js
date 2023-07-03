import { ScrollView } from "native-base";
import ChallengeDetailContainer from "../../components/containers/ChallengeDetailContainer";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

const ChallengeDetailScreen = ({ route }) => {
  const { challenge } = route.params;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: challenge.title,
    });
  }, [navigation, challenge]);

  return (
    <ScrollView>
      <ChallengeDetailContainer
        challenge={challenge}
        isGroupChallenge={false}
      />
    </ScrollView>
  );
};

export default ChallengeDetailScreen;
