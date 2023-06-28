import { useNavigation } from "@react-navigation/native";
import { Box, FlatList } from "native-base";
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
          <Box
            style={{ borderRadius: 10, margin: 10 }}
            bg="white"
            shadow={2}
            overflow="hidden"
          >
            <ChallengeListItem challenge={item} />
          </Box>
        </TouchableOpacity>
      )}
    />
  );
};

export default ChallengeList;
