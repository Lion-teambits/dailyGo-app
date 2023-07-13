import { Button, Modal, Text } from "native-base";
import { useEffect } from "react";

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
        <Modal.Content maxWidth="400px">
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
                  onSubmit("daily");
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
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Text>Congratulations!</Text>
            <Text>You’ve reached the targeted steps and collected the badge.</Text>
            <Text>Check achievement page :)</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                onPress={() => {
                  onSubmit("event");
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
