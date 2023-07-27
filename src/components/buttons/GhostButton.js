import { Button } from "native-base";
import { TXT_MEDIUM_BG } from "../../constants/colorCodes";
import Typography from "../typography/typography";

const GhostButton = ({ children, onPress, isDisabled }) => {
  return (
    <Button
      onPress={onPress}
      disabled={isDisabled}
      backgroundColor="transparent"
    >
      <Typography
        type="button"
        style={{ color: TXT_MEDIUM_BG }}
      >
        {children}
      </Typography>
    </Button>
  );
};

export default GhostButton;
