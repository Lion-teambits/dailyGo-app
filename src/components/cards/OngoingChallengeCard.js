import {
  Center,
  Box,
  HStack,
  VStack,
  Divider,
  Button,
  Text,
  useClipboard,
  Container,
  View,
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
import { TimeDiffTextBox } from "../textBoxes/TimeDiffTextBox";
import {
  BG_PRIMARY,
  PRIMARY_DARK,
  PRIMARY_LIGHT,
} from "../../constants/colorCodes";
import ProgressBarHome from "../progressBar/ProgressBarHome";
import Typography from "../typography/typography";
import PageIndicator from "./pagination/PageIndicator";
import GhostButton from "../buttons/GhostButton";
import CodeShareButton from "../buttons/CodeShareButton";
import { badges } from "../../data/badgeData";

const OngoingChallengeCard = ({ challenge, totalPageCount, currentPage }) => {
  const [progressRate, setProgressRate] = useState(0);
  const [remainingTime, setRemainingTime] = useState("");
  const [showRewardButton, setShowRewardButton] = useState(false);

  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { setIsLoading } = useContext(UserContext);
  const { value, onCopy } = useClipboard();

  const animation = useRef(null);

  useEffect(() => {
    const result = Math.floor(
      (challenge.currentSteps / challenge.targetSteps) * 100
    );
    setProgressRate(result < 100 ? result : 100);
    if (challenge.finishChallenge && !challenge.getReward) {
      setShowRewardButton(true);
    }
    setRemainingTime(`Time left: ${challenge.remainingTime}`);
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
      const badge = badges.find((badge) => badge.id == challenge.reward);
      userInfo.badges.push(badge.badgeTitle);
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
    <View
      paddingX={4}
      style={[styles.card, showCancelModal && styles.blur]}
    >
      <View
        style={{ flex: 1 }}
        alignItems="center"
        width="100%"
      >
        <VStack
          paddingTop={6}
          space={2}
          alignItems="center"
        >
          <Typography
            type="subtitles"
            style={styles.cardTitle}
          >
            {challenge.type} Goal
          </Typography>
          <TimeDiffTextBox timeDifference={remainingTime} />
        </VStack>
        <Box
          style={{ flex: 1 }}
          alignItems="center"
          height="48%"
          width="60%"
        >
          <LottieView
            autoPlay
            loop
            ref={animation}
            style={{
              width: "100%",
              height: "100%",
            }}
            source={challenge.monsterImg}
          />
        </Box>
        <Box
          width="100%"
          alignItems="center"
        >
          <PageIndicator
            totalPageCount={totalPageCount}
            currentPage={currentPage}
            monsterName={challenge.monsterName}
          />
        </Box>
      </View>

      <ProgressBarHome progressRate={progressRate} />
      {/* Switch button visibility depends on challenge status */}
      <Container alignItems="center">
        <Box padding={4}>
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
      </Container>

      <Container
        alignItems="center"
        gap={3}
      >
        <Text
          fontSize="lg"
          bold
        >
          {challenge.type === "daily" ? "Daily" : "Current"} Progress
        </Text>
        <Box
          backgroundColor={BG_PRIMARY}
          padding={6}
          rounded={26}
        >
          <HStack space="2">
            <VStack
              alignItems="center"
              padding={2}
            >
              <Text>{challenge.currentDistance}</Text>
              <Text>KM</Text>
            </VStack>
            <Divider
              orientation="vertical"
              thickness="2"
              marginX="3"
              backgroundColor={PRIMARY_LIGHT}
            />
            <VStack
              alignItems="center"
              padding={2}
            >
              <Text>{challenge.currentSteps}</Text>
              <Text>Steps</Text>
            </VStack>
            <Divider
              orientation="vertical"
              thickness="2"
              marginX="3"
              bg={PRIMARY_LIGHT}
            />
            <VStack
              alignItems="center"
              padding={2}
            >
              <Text>{challenge.currentCalories}</Text>
              <Text>Kcal</Text>
            </VStack>
          </HStack>
        </Box>
      </Container>
      {challenge.type === "group" && (
        <Container
          width="70%"
          paddingY={6}
          gap={2}
        >
          <Text>Friends</Text>
          <HStack>
            <FriendsCard member={challenge.memberList} />
          </HStack>
          <HStack>
            <Text>Code: {challenge.shareCode}</Text>

            <CodeShareButton
              shareId={challenge.shareCode}
              onCopy={onCopy}
            />
          </HStack>
        </Container>
      )}
      {challenge.type !== "daily" && (
        <>
          <BadgeToAchieve
            badgeId={challenge.reward}
            steps={challenge.targetSteps}
          />
          <GhostButton onPress={handleCancel}>Leave event</GhostButton>
          <ConfirmationModal
            showModal={showCancelModal}
            setShowModal={setShowCancelModal}
            size="xl"
            onSubmit={handleLeaveChallenge}
            submitBtnLabel="Leave event"
            cancelBtnLabel="Cancel"
          >
            Are you sure you want to leave?
          </ConfirmationModal>
        </>
      )}
    </View>
  );
};

export default OngoingChallengeCard;

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
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: "auto",
  },
  blur: {
    opacity: 0.5,
  },
  cardTitle: {
    color: PRIMARY_DARK,
    textTransform: "capitalize",
  },
});
