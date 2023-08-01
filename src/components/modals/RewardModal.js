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
            <Box
              alignItems="center"
              paddingY={16}
            >
              <Typography
                type="heading4"
                style={[styles.heading, styles.color]}
              >
                Congratulations!
              </Typography>

              <Typography
                type="subtitles"
                style={[styles.subtitle, styles.color]}
              >
                You’ve reached {reward.streakDays} days streak
              </Typography>

              <Typography
                type="body2Bold"
                style={[styles.subtitle, styles.color]}
              >
                Collected
              </Typography>

              <HStack
                space={4}
                justifyContent="center"
                alignItems="center"
                marginBottom={20}
              >
                <HStack
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography
                    type="subtitles"
                    style={styles.color}
                  >
                    {reward.firefliesToday}x{" "}
                  </Typography>
                  <FireFlyIcon
                    width={34}
                    height={34}
                  />
                </HStack>

                <HStack
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography
                    type="subtitles"
                    style={styles.color}
                  >
                    {reward.heartToday}x{" "}
                  </Typography>
                  <HeartIcon
                    width={34}
                    height={34}
                  />
                </HStack>
              </HStack>

              <Typography
                type="body2Bold"
                style={[styles.subtitle, styles.color]}
              >
                Tomorrow
              </Typography>
              <Box
                paddingX={10}
                alignItems="center"
                textAlign="center"
              >
                <Typography
                  type="body2"
                  style={[styles.subtitle, styles.color]}
                >
                  You will get {reward.firefliesTmr} Fireflies and{" "}
                  {reward.heartTmr} heart after reaching your daily goal.
                </Typography>
                <Typography
                  type="body2"
                  style={[styles.subtitle, styles.color]}
                >
                  Stay active!
                </Typography>
              </Box>
              <Box width={40}>
                <AccentButton
                  onPress={() => {
                    onSubmit("daily");
                    setShowModal(false);
                  }}
                >
                  OK
                </AccentButton>
              </Box>
            </Box>
          </Modal.Body>
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
            <Box
              alignItems="center"
              paddingY={16}
              justifyContent="space-around"
            >
              <Typography
                type="heading4"
                style={[styles.heading, styles.color]}
              >
                Congratulations!
              </Typography>

              <Typography
                type="subtitles"
                style={[styles.subtitle, styles.color]}
              >
                You’ve reached the targeted steps!
              </Typography>

              <Typography
                type="body2Bold"
                style={[styles.subtitle, styles.color]}
              >
                Check achievement page :)
              </Typography>
              <Box width={40}>
                <AccentButton
                  onPress={() => {
                    onSubmit("event");
                    setShowModal(false);
                  }}
                >
                  OK
                </AccentButton>
              </Box>
            </Box>
          </Modal.Body>
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

const styles = StyleSheet.create({
  color: { color: "white" },
  heading: { marginBottom: 24 },
  subtitle: { marginBottom: 44, textAlign: "center" },
});