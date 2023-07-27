import { TouchableOpacity } from "react-native";
import { PRIMARY_DARK } from "../../constants/colorCodes";
import Typography from "../typography/typography";

const BackToPreviousButton = ({ callbackFunc, text }) => {
  return (
    <TouchableOpacity
      style={{
        marginVertical: 20,
        alignItems: "center",
      }}
      onPress={callbackFunc}
    >
      <Typography type="button" style={{ color: PRIMARY_DARK }}>
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

export default BackToPreviousButton;
