import { useNavigation } from "@react-navigation/native";
import { Box, FlatList } from "native-base";
import { challenges } from "../../data/challengeData";
import { TouchableOpacity } from "react-native";
import ChallengeListItem from "../listitems/ChallengeListItem";
import { useEffect, useState } from "react";
import { retrieveChallengeInfo } from "../../api/challengeProgressService";

const ChallengeList = ({ userData }) => {
  const navigation = useNavigation();
  const [joinedChallengeList, setJoinedChallengeList] = useState([]);

  const navigateToDetail = (challenge) => {
    if (getUserJoinStatus(challenge._id)) {
      navigation.navigate("Home", { challenge });
    } else {
      navigation.navigate("ChallengeDetail", { challenge });
    }
  };

  useEffect(() => {
    const fetchChallengeProgressInfoList = async () => {
      if (userData !== "") {
        const challengeProgressIds = userData?.event_challenge_progress || [];
        const challengeProgressList = await Promise.all(
          challengeProgressIds.map(async (progressId) => {
            return await retrieveChallengeInfo(progressId);
          })
        );
        const challengeProgressInfoList = challengeProgressList.map(
          (progress) => progress?.event_challenge_info
        );
        setJoinedChallengeList(challengeProgressInfoList);
      }
    };
    fetchChallengeProgressInfoList();
  }, [userData]);

  const getUserJoinStatus = (challengeId) => {
    return joinedChallengeList.includes(String(challengeId));
  };

  return (
    <FlatList
      data={challenges}
      keyExtractor={(challenge) => challenge._id.toString()}
      renderItem={({ item }) => {
        const userJoin = getUserJoinStatus(item._id);
        return (
          <TouchableOpacity onPress={() => navigateToDetail(item)}>
            <Box
              borderRadius={10}
              margin={3}
              bg="white"
              shadow={2}
              overflow="hidden"
            >
              <ChallengeListItem challenge={item} userJoin={userJoin} />
            </Box>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default ChallengeList;
