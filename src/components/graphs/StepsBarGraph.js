import { Box, Text } from "native-base";

const StepsBarGraph = ({ currentSteps, targetSteps, progressBarWidth }) => {
  return (
    <Box>
      <Text>
        {currentSteps}/{targetSteps} steps
      </Text>
      <Box bg="gray.300" height={6} borderRadius="full" overflow="hidden">
        <Box
          bg="yellow.400"
          width={progressBarWidth}
          height={6}
          borderRadius="full"
        />
      </Box>
    </Box>
  );
};

export default StepsBarGraph;
