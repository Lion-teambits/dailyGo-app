import { Box, Text } from "native-base";
import { ACCENT_MEDIUM, BG_MEDIUM } from "../../constants/colorCodes";

const StepsBarGraph = ({ currentSteps, targetSteps, progressBarWidth }) => {
  return (
    <Box>
      <Text>
        {currentSteps}/{targetSteps} steps
      </Text>
      <Box bg={BG_MEDIUM} height={6} borderRadius="full" overflow="hidden">
        <Box
          bg={ACCENT_MEDIUM}
          width={progressBarWidth}
          height={6}
          borderRadius="full"
        />
      </Box>
    </Box>
  );
};

export default StepsBarGraph;
