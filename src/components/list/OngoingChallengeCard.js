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
import { TEST_UID } from "../../api/constants";
import UserContext from "../../state/context";

const OngoingChallengeCard = ({ challenge, totalPageCount, currentPage }) => {
  const { setUserInfo } = useContext(UserContext);
  const [progressRate, setProgressRate] = useState(0);
  const [showRewardButton, setShowRewardButton] = useState(false);

  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  function handleCancel() {
    setShowCancelModal(true);
  }
  function handleLeaveChallenge() {
    // [TODO] Remove challenge progress from Database
    console.log("handleLeaveChallenge pressed!!!!!!!!");
  }

  async function handleShowRewardModal(value) {
    setShowRewardModal(true);

    // use TEST_UID for testing
    const updatedUserInfo = await receiveReward(TEST_UID);
    setUserInfo(updatedUserInfo);
  }

  function handleCopyCode() {
    console.log("Pressed copy code");
  }

  const renderCommonContent = () => {
    return (
      <>
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
            <Button onPress={handleShowRewardModal}>Receive Reward</Button>
          )}
          {challenge.reward && (
            <RewardModal
              showModal={showRewardModal}
              setShowModal={setShowRewardModal}
              size="xl"
              reward={challenge.reward}
            />
          )}
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
      </>
    );
  };

  const renderDailyChallenge = () => {
    useEffect(() => {
      setProgressRate(
        Math.floor((challenge.currentSteps / challenge.targetSteps) * 100)
      );
      if (challenge.finishChallenge && !challenge.getReward) {
        setShowRewardButton(true);
      }
    }, [challenge.currentSteps, challenge.targetSteps]);
    return (
      <View style={[styles.card, showCancelModal ? styles.blur : null]}>
        {renderCommonContent()}
      </View>
    );
  };

  const renderEventChallenge = () => {
    useEffect(() => {}, []);

    return (
      <View style={[styles.card, showCancelModal ? styles.blur : null]}>
        {renderCommonContent()}
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
      </View>
    );
  };

  const renderGroupChallenge = () => {
    return (
      <View style={[styles.card, showCancelModal ? styles.blur : null]}>
        {renderCommonContent()}
        <Text>Avator icons: test, test, test</Text>
        <Text>code: testtest</Text>
        <Button
          title="Copy"
          onPress={handleCopyCode}
        />
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
      </View>
    );
  };

  switch (challenge.type) {
    case "daily":
      return renderDailyChallenge();

    case "event":
      return renderEventChallenge();

    case "group":
      return renderGroupChallenge();

    default:
      return <Text>Error... something's going on TT</Text>;
  }
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
