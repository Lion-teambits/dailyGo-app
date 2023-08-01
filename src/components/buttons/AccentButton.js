import { TouchableOpacity } from "react-native";
import {
  ACCENT_MEDIUM,
  DISABLED,
  TXT_LIGHT_BG,
} from "../../constants/colorCodes";
import Typography from "../typography/typography";

const AccentButton = ({ onPress, isDisabled, children }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: isDisabled ? DISABLED : ACCENT_MEDIUM,
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 12,
        justifyContent: 'center',
        alignItem: 'center'
      }}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Typography
        type="button"
        style={{ color: TXT_LIGHT_BG, textAlign:'center' }}
      >
        {children}
      </Typography>
    </TouchableOpacity>
  );
};

export default AccentButton;
