import { Button, Modal, Text } from "native-base";

const ConfirmationModal = ({
  showModal,
  setShowModal,
  size,
  children,
  onSubmit,
  submitBtnLabel,
}) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      size={size}s
    >
      <Modal.Content maxWidth="400px">
        <Modal.Body>
          <Text>{children}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                onSubmit(), setShowModal(false);
              }}
            >
              {submitBtnLabel}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ConfirmationModal;
