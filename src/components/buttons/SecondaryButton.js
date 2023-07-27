import { TouchableOpacity } from "react-native";
import { DISABLED, SECONDARY_MEDIUM } from "../../constants/colorCodes";
import Typography from "../typography/typography";

const SecondaryButton = ({ onPressFunc, isDisabled, text }) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 6,
        width: "100%",
        borderRadius: 50,
        backgroundColor: isDisabled ? DISABLED : SECONDARY_MEDIUM,
        paddingVertical: 10,
        alignItems: "center",
      }}
      onPress={onPressFunc}
      disabled={isDisabled}
    >
      <Typography type="button" style={{ color: "white" }}>
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

export default SecondaryButton;
