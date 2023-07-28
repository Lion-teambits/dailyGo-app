import {
  ACCENT_MEDIUM,
  DISABLED,
  TXT_LIGHT_BG,
} from "../../constants/colorCodes";
import Typography from "../typography/typography";
import { Button, HStack } from "native-base";
import FireFly from "../../../assets/images/icons/firefly-small.svg";

const CollectFireFlyButton = ({ onPress, isDisabled }) => {
  return (
    <Button
      width="100%"
      backgroundColor={isDisabled ? DISABLED : ACCENT_MEDIUM}
      onPress={onPress}
      disabled={isDisabled}
      borderRadius={50}
      paddingX="6"
      paddingY="12"
    >
      <HStack
        alignItems="center"
        space={1}
      >
        <Typography
          type="button"
          style={{ color: TXT_LIGHT_BG }}
        >
          Collect Firefly
        </Typography>
        <FireFly
          width={24}
          height={24}
        />
      </HStack>
    </Button>
  );
};

export default CollectFireFlyButton;
