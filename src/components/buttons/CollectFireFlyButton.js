import {
  ACCENT_MEDIUM,
  DISABLED,
  TXT_LIGHT_BG,
} from "../../constants/colorCodes";
import Typography from "../typography/typography";
import { HStack } from "native-base";
import FireFly from "../../../assets/images/icons/firefly-small.svg";
import { TouchableOpacity } from "react-native";

const CollectFireFlyButton = ({ onPress, isDisabled }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: isDisabled ? DISABLED : ACCENT_MEDIUM,
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 12,
        justifyContent: "center",
        alignItem: "center",
      }}
      onPress={onPress}
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
    </TouchableOpacity>
  );
};

export default CollectFireFlyButton;
