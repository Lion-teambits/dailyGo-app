import { useNavigation } from "@react-navigation/native";
import { Box } from "native-base";
import { challenges } from "../../data/challengeData";
import { TouchableOpacity } from "react-native";
import ChallengeListItem from "../listitems/ChallengeListItem";
import { useEffect, useState } from "react";
import { retrieveChallengeProgressInfo } from "../../api/challengeProgressService";

const ChallengeList = ({ userData }) => {
  const navigation = useNavigation();
  const [joinedChallengeList, setJoinedChallengeList] = useState([]);

  const navigateToDetail = (challenge, joinedUserProgress) => {
    if (joinedUserProgress) {
      navigation.navigate("HomeScreen", {
        screen: "Home",
        params: { challengeProgressID: joinedUserProgress._id },
      });
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
            const progress = await retrieveChallengeProgressInfo(progressId);
            return {
              event_challenge_info: progress?.event_challenge_info,
              _id: progress?._id,
              current_steps: progress?.current_steps,
            };
          })
        );
        setJoinedChallengeList(challengeProgressList);
      }
    };
    fetchChallengeProgressInfoList();
  }, [userData]);

  const getJoinedUserProgress = (challengeId) => {
    const foundProgress = joinedChallengeList.find(
      (progress) => progress.event_challenge_info === String(challengeId)
    );
    return foundProgress;
  };

  return (
    <Box>
      {challenges.map((item) => {
        const joinedUserProgress = getJoinedUserProgress(item._id);
        return (
          <TouchableOpacity
            key={item._id}
            onPress={() => navigateToDetail(item, joinedUserProgress)}
          >
            <Box
              borderRadius={10}
              margin={3}
              bg="white"
              shadow={2}
            >
              <ChallengeListItem
                challenge={item}
                joinedUserProgress={joinedUserProgress}
              />
            </Box>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

export default ChallengeList;
