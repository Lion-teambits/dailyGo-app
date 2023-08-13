import { Box, HStack, Text } from "native-base";
import FireFly from "../../../assets/images/icons/firefly-small.svg";
import Streak from "../../../assets/images/icons/streak-small.svg";
import Heart from "../../../assets/images/icons/heart-small.svg";
import {
  PRIMARY_DARK,
  SECONDARY_LIGHT,
  SECONDARY_MEDIUM,
} from "../../constants/colorCodes";
import Typography from "../typography/typography";
import { StyleSheet } from "react-native";

const StatusChip = ({ type, number }) => {
  let component;

  if (type === "firefly") {
    component = (
      <>
        <FireFly
          width={16}
          height={16}
        />
        <Typography
          type="smallTextBold"
          style={styles.text}
        >
          {number.toString()}
        </Typography>
      </>
    );
  } else if (type === "streak") {
    component = (
      <>
        <Streak
          width={16}
          height={16}
        />
        <Typography
          type="smallTextBold"
          style={styles.text}
        >
          {number.toString()} days
        </Typography>
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

const styles = StyleSheet.create({
  text: {
    color: PRIMARY_DARK,
  },
});
