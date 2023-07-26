import { Box } from "native-base";
import { ACCENT_MEDIUM, BG_DARK, BG_MEDIUM } from "../../constants/colorCodes";
import Typography from "../typography/typography";

const StepsBarGraph = ({ currentSteps, targetSteps, progressBarWidth }) => {
  return (
    <Box>
      <Typography type="smallTextBold" style={{ color: BG_DARK }}>
        {currentSteps}/{targetSteps} steps
      </Typography>
      <Box bg={BG_MEDIUM} height={4} borderRadius="full" overflow="hidden">
        <Box
          bg={ACCENT_MEDIUM}
          width={progressBarWidth}
          height={4}
          borderRadius="full"
        />
      </Box>
    </Box>
  );
};

export default StepsBarGraph;
