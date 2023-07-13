import { Box,  HStack, Modal } from "native-base";
import Typography from "../typography/typography";
import { StyleSheet } from "react-native";
import {  PRIMARY_MEDIUM } from "../../constants/colorCodes";
import FireFlyIcon from "../../../assets/images/icons/firefly-icon.svg";
import HeartIcon from "../../../assets/images/icons/heart-icon.svg";
import AccentButton from "../buttons/AccentButton";

const RewardModal = ({
  eventType,
  showModal,
  setShowModal,
  size,
  reward,
  onSubmit,
}) => {
  if (eventType === "daily") {
    return (
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size={size}
      >
        <Modal.Content
          height="100%"
          backgroundColor={PRIMARY_MEDIUM}
          borderRadius={24}
        >
          <Modal.Body>
            <Text>Congratulations!</Text>
            <Text>You’ve reached {reward.streakDays} days streak</Text>
            <Text>Collected</Text>
            <Text>{reward.firefliesToday}x firefries</Text>
            <Text>{reward.heartToday}x hearts</Text>
            <Text>Tomorrow</Text>
            <Text>
              You will get {reward.firefliesTmr} Fireflies and {reward.heartTmr}{" "}
              heart after reaching your daily goal.
            </Text>
            <Text>Stay active!</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                onPress={() => {
                  onSubmit();
                  setShowModal(false);
                }}
              >
                OK
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  } else {
    return (
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size={size}
      >
        <Modal.Content
          height="44%"
          backgroundColor={PRIMARY_MEDIUM}
          borderRadius={24}
        >
          <Modal.Body>
            <Text>Congratulations!</Text>
            <Text>You’ve reached the targeted steps and collected the badge.</Text>
            <Text>Check achievement page :)</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                onPress={() => {
                  onSubmit();
                  setShowModal(false);
                }}
              >
                OK
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  }
};

export default RewardModal;

const styles = StyleSheet.create({
  color: { color: "white" },
  heading: { marginBottom: 24 },
  subtitle: { marginBottom: 44, textAlign: "center" },
});