import {
  ACCENT_MEDIUM,
  DISABLED,
  TXT_LIGHT_BG,
} from "../../constants/colorCodes";
import Typography from "../typography/typography";
import { Button } from "native-base";

const AccentButton = ({ onPress, isDisabled, children }) => {
  return (
    <Button
      width="100%"
      backgroundColor={isDisabled ? DISABLED : ACCENT_MEDIUM}
      onPress={onPress}
      disabled={isDisabled}
      borderRadius={50}
      alignItems="center"
      paddingX="6"
      paddingY="12"
    >
      <Typography
        type="button"
        style={{ color: TXT_LIGHT_BG }}
      >
        {children}
      </Typography>
    </Button>
  );
};

export default AccentButton;
