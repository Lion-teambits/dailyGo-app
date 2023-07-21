import { Box, Text } from "native-base";

export const MonsterNameTextBox = ({ name }) => {
  return (
    <Box paddingY={1} paddingX={3} rounded={50} shadow={2} bg="white">
      <Text>{name}</Text>
    </Box>
  );
};
