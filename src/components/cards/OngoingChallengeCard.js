import {
  Progress,
  Center,
  Box,
  HStack,
  VStack,
  Image,
  Divider,
  Button,
  Text,
  View,
} from "native-base";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import RewardModal from "../modals/RewardModal";
import ConfirmationModal from "../modals/ConfirmationModal";
import receiveReward from "../../services/receiveReward";
import { deleteChallengeProgress } from "../../api/challengeProgressService";
import { retrieveUserInfo, updateUserInfo } from "../../api/userService";
import UserContext from "../../state/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OngoingChallengeCard = ({ challenge, totalPageCount, currentPage }) => {
  const [progressRate, setProgressRate] = useState(0);
  const [showRewardButton, setShowRewardButton] = useState(false);

  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { setIsLoading } = useContext(UserContext);

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

    // Demove challenge progress
    await deleteChallengeProgress(challenge._id);
    // Remove single challenge progress from array in user info
    const updatedUserInfo = await removeChallengeProgress(
      uid,
      challenge.type,
      challenge._id
    );

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
      console.log("Conglatulation! Receive reward later :D");
      // update get_reward in challenge progress
    }
  }

  function handleCopyCode() {
    console.log("Pressed copy code");
  }

  return (
    <View style={[styles.card, showCancelModal ? styles.blur : null]}>
      <Text>{challenge.type} Goal</Text>
      <Text>Time left: {challenge.remainingTime}</Text>
      <Image
        source={challenge.monsterImg}
        alt="testImage"
        size="lg"
      />
      <PagenationIndicator
        totalPageCount={totalPageCount}
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
      {challenge.type !== "daily" && (
        <>
          <Text>badge info: empty now{challenge.badgeInfo}</Text>
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
      {challenge.type === "group" && (
        <Text>Group challenge component is under construction... :D</Text>
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

        return (
          <View
            key={index}
            style={[
              styles.indicator,
              isCurrentPage ? styles.selectedIndicator : null,
            ]}
          >
            {isCurrentPage ? <Text>{monsterName}</Text> : null}
          </View>
        );
      })}
    </View>
  );
}

const removeChallengeProgress = async (user_id, challengeType, removeID) => {
  try {
    const userInfo = await retrieveUserInfo(user_id);
    console.log(
      "removeChallengeProgress userInfo array",
      userInfo.event_challenge_progress
    );

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

    return updatedUserInfo;
  } catch (error) {
    console.log("Error in removeChallengeProgress");
    throw error;
  }
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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
    height: 40,
    backgroundColor: "grey",
  },
});
