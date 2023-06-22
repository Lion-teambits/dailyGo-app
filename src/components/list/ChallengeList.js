import { useNavigation } from "@react-navigation/native";
import { Container, FlatList, View } from "native-base";
import { challenges } from "../../data/challengeData";
import { TouchableOpacity } from "react-native";
import ChallengeListItem from "../listitems/ChallengeListItem";

const ChallengeList = () => {
  const navigation = useNavigation();

  const navigateToDetail = (challenge) => {
    navigation.navigate("ChallengeDetail", { challenge });
  };

  return (
    <FlatList
      data={challenges}
      keyExtractor={(challenge) => challenge.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigateToDetail(item)}>
          <ChallengeListItem challenge={item} />
        </TouchableOpacity>
      )}
    />
  );
};

export default ChallengeList;