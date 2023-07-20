import {
  Progress,
  Center,
  Box,
  HStack,
  VStack,
  Divider,
  Button,
  Text,
  View,
  useClipboard,
} from "native-base";
import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import RewardModal from "../modals/RewardModal";
import ConfirmationModal from "../modals/ConfirmationModal";
import receiveReward from "../../services/receiveReward";
import { deleteChallengeProgress } from "../../api/challengeProgressService";
import { retrieveUserInfo, updateUserInfo } from "../../api/userService";
import UserContext from "../../state/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BadgeToAchieve from "./BadgeToAchieve";
import FriendsCard from "./FriendsCard";
import LottieView from "lottie-react-native";
import { updateGroupChallenge } from "../../api/groupChallengeService";

const OngoingChallengeCard = ({ challenge, totalPageCount, currentPage }) => {
  const [progressRate, setProgressRate] = useState(0);
  const [showRewardButton, setShowRewardButton] = useState(false);

  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { setIsLoading } = useContext(UserContext);
  const { value, onCopy } = useClipboard();

  const animation = useRef(null);

  useEffect(() => {
    setProgressRate(
      Math.floor((challenge.currentSteps / challenge.targetSteps) * 100)
    );
    if (challenge.finishChallenge && !challenge.getReward) {
      setShowRewardButton(true);
    }
  }, [challenge.currentSteps, challenge.targetSteps]);

  function handleCancel() {
    setShowCancelModal(true);
  }

  async function handleLeaveChallenge() {
    const uid = await AsyncStorage.getItem("@uid");
    // Remove single challenge progress from array in user info
    const updatedUserInfo = await removeChallengeProgress(
      uid,
      challenge.type,
      challenge._id
    );

    if (challenge.type === "group") {
      await removeIDFromMembers(uid, challenge);
    }

    setIsLoading(true);
  }

  async function handleRewardModal() {
    setShowRewardModal(true);
  }

  async function handleReceiveReward(eventType) {
    if (eventType === "daily") {
      const uid = await AsyncStorage.getItem("@uid");
      const updatedUserInfo = await receiveReward(uid);
      setIsLoading(true);
    } else {
      const uid = await AsyncStorage.getItem("@uid");
      const userInfo = await retrieveUserInfo(uid);
      // Update user info (populate badge, remove challenge progress from Array)
      userInfo.badges.push(challenge.reward);
      const updatedUserInfo = await updateUserInfo(uid, {
        badges: userInfo.badges,
      });

      await removeChallengeProgress(uid, challenge.type, challenge._id);

      if (challenge.type === "group") {
        await removeIDFromMembers(uid, challenge);
      }

      setIsLoading(true);
    }
  }

  return (
    <View style={[styles.card, showCancelModal ? styles.blur : null]}>
      <Text>{challenge.type} Goal</Text>
      <Text>Time left: {challenge.remainingTime}</Text>
      <LottieView
        autoPlay
        loop
        ref={animation}
        style={{
          width: 350,
          height: 350,
          backgroundColor: "#eee",
        }}
        source={challenge.monsterImg}
      />

      <PagenationIndicator
        totalPageCount={Math.min(totalPageCount, 5)}
        currentPage={currentPage}
        monsterName={challenge.monsterName}
      />
      <Center w="100%">
        <Box w="90%">
          <Progress
            colorScheme="primary"
            value={progressRate}
          />
        </Box>
      </Center>
      {/* Switch button visibility depends on challenge status */}
      <Box p={4}>
        {showRewardButton && (
          <Button onPress={handleRewardModal}>Receive Reward</Button>
        )}
        {showRewardModal && (
          <RewardModal
            eventType={challenge.type}
            showModal={showRewardModal}
            setShowModal={setShowRewardModal}
            size="xl"
            reward={challenge.reward}
            onSubmit={handleReceiveReward}
          />
        )}
        {challenge.getReward && <Text>Firefly collected!</Text>}
      </Box>
      <Text>Current Progress</Text>
      <HStack
        space="1"
        backgroundColor="amber.100"
        padding="3"
      >
        <VStack>
          <Text>{challenge.currentDistance}</Text>
          <Text>KM</Text>
        </VStack>
        <Divider
          orientation="vertical"
          mx="3"
          _light={{
            bg: "muted.800",
          }}
          _dark={{
            bg: "muted.50",
          }}
        />
        <VStack>
          <Text>{challenge.currentSteps}</Text>
          <Text>Steps</Text>
        </VStack>
        <Divider
          orientation="vertical"
          mx="3"
          _light={{
            bg: "muted.800",
          }}
          _dark={{
            bg: "muted.50",
          }}
        />
        <VStack>
          <Text>{challenge.currentCalories}</Text>
          <Text>Kcal</Text>
        </VStack>
      </HStack>
      {challenge.type === "group" && (
        <>
          <Text>Friends</Text>
          <HStack>
            <FriendsCard member={challenge.memberList} />
          </HStack>
          <HStack>
            <Text>Code: {challenge.shareCode}</Text>
            <Button
              bordered
              onPress={() => onCopy(challenge._id)}
            >
              Copy
            </Button>
          </HStack>
        </>
      )}
      {challenge.type !== "daily" && (
        <>
          <BadgeToAchieve
            badgeId={challenge.badgeInfo}
            steps={challenge.targetSteps}
          />
          <Button onPress={handleCancel}>Cancel</Button>
          <ConfirmationModal
            showModal={showCancelModal}
            setShowModal={setShowCancelModal}
            size="xl"
            onSubmit={handleLeaveChallenge}
            submitBtnLabel="Leave event"
          >
            Are you sure you want to leave?
          </ConfirmationModal>
        </>
      )}
    </View>
  );
};

export default OngoingChallengeCard;

function PagenationIndicator({ totalPageCount, currentPage, monsterName }) {
  return (
    <View style={styles.indicatorContainer}>
      {Array.from({ length: totalPageCount }, (_, index) => {
        const pageNumber = index + 1;
        const isCurrentPage = pageNumber === currentPage;
        const isSmallLeft = pageNumber === currentPage - 2;
        const isMediumLeft = pageNumber === currentPage - 1;
        const isMediumRight = pageNumber === currentPage + 1;
        const isSmallRight = pageNumber === currentPage + 2;

        return (
          <View
            key={index}
            style={[
              styles.indicator,
              isCurrentPage ? styles.selectedIndicator : null,
              isSmallLeft ? styles.smallIndicatorLeft : null,
              isMediumLeft ? styles.mediumIndicatorLeft : null,
              isMediumRight ? styles.mediumIndicatorRight : null,
              isSmallRight ? styles.smallIndicatorRight : null,
            ]}
          >
            {isCurrentPage ? (
              <Text style={styles.selectedIndicatorText}>{monsterName}</Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const removeChallengeProgress = async (user_id, challengeType, removeID) => {
  try {
    const userInfo = await retrieveUserInfo(user_id);

    if (challengeType === "event") {
      userInfo.event_challenge_progress =
        userInfo.event_challenge_progress.filter(
          (challengeProgressID) => challengeProgressID !== removeID
        );
    } else {
      userInfo.group_challenge_progress =
        userInfo.group_challenge_progress.filter(
          (challengeProgressID) => challengeProgressID !== removeID
        );
    }

    const updatedUserInfo = await updateUserInfo(user_id, userInfo);

    // Remove challenge progress
    await deleteChallengeProgress(removeID);

    return updatedUserInfo;
  } catch (error) {
    console.log("Error in removeChallengeProgress");
    throw error;
  }
};

const removeIDFromMembers = async (user_id, challenge) => {
  challenge.memberList = challenge.memberList.filter(
    (member_id) => member_id !== user_id
  );

  if (challenge.memberList.length === 0) {
    // [TODO] Delete groupChallenge table
    console.log("Group challenge table will be deleted later :)");
  } else {
    await updateGroupChallenge(challenge.groupChallengeID, {
      memberList: challenge.memberList,
    });
  }
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
    backgroundColor: "aliceblue",
  },
  blur: {
    opacity: 0.5,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "lightgray",
  },
  selectedIndicator: {
    width: 72,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    // textAlign: "center",
    backgroundColor: "grey",
  },
  smallIndicatorLeft: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "gray",
  },
  mediumIndicatorLeft: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
  },
  mediumIndicatorRight: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
  },
  smallIndicatorRight: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "gray",
  },
  hiddenIndicator: { opacity: 0 },
  dummyIndicator: {
    width: 10,
    height: 10,
    margin: 5,
    backgroundColor: "transparent",
  },
});
