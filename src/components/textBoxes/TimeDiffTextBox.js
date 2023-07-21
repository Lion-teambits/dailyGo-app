import { Box, Text } from "native-base";
import { BG_PRIMARY } from "../../constants/colorCodes";

export const TimeDiffTextBox = ({ timeDifference }) => {
  return (
    <Box paddingY={1} paddingX={3} bg={BG_PRIMARY} rounded={50}>
      <Text>{timeDifference}</Text>
    </Box>
  );
};
