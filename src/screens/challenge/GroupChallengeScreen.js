import { ScrollView } from "native-base";
import GroupChallengeContainer from "../../components/containers/GroupChallengeContainer";
import { challengeStyles } from "../../styles/challengeStyles";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { screenTitleOption } from "../../styles/commonStyles";

const GroupChallengeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(screenTitleOption("Team Challenge"));
  }, [navigation]);

  return (
    <ScrollView style={challengeStyles.container}>
      <GroupChallengeContainer />
    </ScrollView>
  );
};

export default GroupChallengeScreen;
