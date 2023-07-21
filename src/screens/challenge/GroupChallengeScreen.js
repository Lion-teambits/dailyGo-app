import { ScrollView } from "native-base";
import GroupChallengeContainer from "../../components/containers/GroupChallengeContainer";
import {
  challengeStyles,
  challengeTitleOption,
} from "../../styles/challengeStyles";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const GroupChallengeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(challengeTitleOption("Team Challenge"));
  }, [navigation]);

  return (
    <ScrollView style={challengeStyles.container}>
      <GroupChallengeContainer />
    </ScrollView>
  );
};

export default GroupChallengeScreen;
