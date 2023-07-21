import { Box, HStack, Text } from "native-base";
import FireFly from "../../../assets/images/icons/firefly-small.svg";
import Streak from "../../../assets/images/icons/streak-small.svg";
import Heart from "../../../assets/images/icons/heart-small.svg";
import { SECONDARY_LIGHT, SECONDARY_MEDIUM } from "../../constants/colorCodes";

const StatusChip = ({ type, number }) => {
  let component;

  if (type === "firefly") {
    component = (
      <>
        <FireFly
          width={16}
          height={16}
        />
        <Text>{number.toString()}</Text>
      </>
    );
  } else if (type === "streak") {
    component = (
      <>
        <Streak
          width={16}
          height={16}
        />
        <Text>{number.toString()}</Text>
      </>
    );
  } else {
    const hearts = [];
    for (let i = 0; i < 3; i++) {
      hearts.push(
        <Heart
          key={i}
          width={16}
          height={16}
          fill={i < number ? SECONDARY_MEDIUM : SECONDARY_LIGHT}
        />
      );
    }
    component = <>{hearts}</>;
  }

  return (
    <Box
      paddingY={1}
      paddingX={3}
      rounded={50}
      background="white"
    >
      <HStack
        space={2}
        justifyContent="center"
        alignItems="center"
      >
        {component}
      </HStack>
    </Box>
  );
};

export default StatusChip;
