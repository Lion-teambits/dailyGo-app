import { Box, Button, HStack, Modal, Text } from "native-base";
import GhostButton from "../buttons/GhostButton";
import Typography from "../typography/typography";
import { SECONDARY_MEDIUM } from "../../constants/colorCodes";

const ConfirmationModal = ({
  showModal,
  setShowModal,
  size,
  children,
  onSubmit,
  cancelBtnLabel,
  submitBtnLabel,
}) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      size={size}
    >
      <Modal.Content
        height="26%"
        borderRadius={24}
        paddingY={2}
      >
        <Modal.Body>
          <Box
            alignItems="center"
            padding={0}
          >
            <Typography
              type="button"
              style={{ textAlign: "center", width: "40%", paddingVertical: 50 }}
            >
              {children}
            </Typography>

            <HStack
              alignContent="space-between"
              width="100%"
            >
              <Box width={40}>
                <GhostButton
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  {cancelBtnLabel}
                </GhostButton>
              </Box>

              <Box width={40}>
                <Button
                  paddingX={6}
                  paddingY={12}
                  onPress={() => {
                    onSubmit(), setShowModal(false);
                  }}
                  borderRadius={50}
                  backgroundColor={SECONDARY_MEDIUM}
                >
                  <Typography
                    type="button"
                    style={{ color: "white" }}
                  >
                    {submitBtnLabel}
                  </Typography>
                </Button>
              </Box>
            </HStack>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmationModal;
