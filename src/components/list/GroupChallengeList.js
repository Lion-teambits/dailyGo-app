import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Box, View } from "native-base";
import GroupChallengeListItem from "../listitems/GroupChallengeListItem";
import { retrieveGroupChallengeInfo } from "../../api/groupChallengeService";
import { retrieveChallengeProgressInfo } from "../../api/challengeProgressService";

const GroupChallengeList = ({ userData }) => {
  const navigation = useNavigation();
  const [groupChallengeList, setGroupChallengeList] = useState();
  const [groupChallengeProgressDds, setGroupChallengeProgressDds] = useState();

  const navigateToHome = (challenge, index) => {
    if (challenge._id) {
      navigation.navigate("HomeScreen", {
        screen: "Home",
        params: { challengeProgressID: groupChallengeProgressDds[index] },
      });
    } else {
      console.log("[Error]Team progress id not found.");
    }
  };

  useEffect(() => {
    const fetchGroupChallengeProgressList = async () => {
      if (userData !== "") {
        const groupChallengeIds = userData?.group_challenge_progress || [];
        const groupChallengeList = await Promise.all(
          groupChallengeIds.map(async (progressId) => {
            const groupChallengeProgress = await retrieveChallengeProgressInfo(
              progressId
            );
            return await retrieveGroupChallengeInfo(
              groupChallengeProgress.group_challenge_info
            );
          })
        );
        setGroupChallengeProgressDds(groupChallengeIds);
        setGroupChallengeList(groupChallengeList);
      }
    };
    fetchGroupChallengeProgressList();
  }, [userData]);

  return (
    <View>
      {groupChallengeList ? (
        <Box>
          {groupChallengeList.map((item, index) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => navigateToHome(item, index)}
            >
              <Box
                borderRadius={10}
                margin={3}
                bg="white"
                shadow={2}
                overflow="hidden"
              >
                <GroupChallengeListItem challenge={item} />
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      ) : null}
    </View>
  );
};

export default GroupChallengeList;
