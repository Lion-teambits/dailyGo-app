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
    const progressId = getProgressIdByChallengeId(challenge._id);
    if (progressId) {
      navigation.navigate("Home", { progressId });
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
            const progress = await retrieveChallengeInfo(progressId);
            return {
              event_challenge_info: progress?.event_challenge_info,
              _id: progress?._id,
            };
          })
        );
        setJoinedChallengeList(challengeProgressList);
      }
    };
    fetchChallengeProgressInfoList();
  }, [userData]);

  const getUserJoinStatus = (challengeId) => {
    return joinedChallengeList.some(
      (progress) => progress.event_challenge_info === String(challengeId)
    );
  };

  const getProgressIdByChallengeId = (challengeId) => {
    const foundProgress = joinedChallengeList.find(
      (progress) => progress.event_challenge_info === String(challengeId)
    );
    return foundProgress ? foundProgress._id : null;
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
