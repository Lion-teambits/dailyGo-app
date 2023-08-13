import { Box } from "native-base";
import Typography from "../typography/typography";
import { PRIMARY_MEDIUM_PRESSED } from "../../constants/colorCodes";

export const MonsterNameTextBox = ({ name }) => {
  return (
    <Box paddingY={3} paddingX={2} rounded={20} shadow={2} bg="white">
      <Typography type="body2Bold" style={{ color: PRIMARY_MEDIUM_PRESSED }}>
        {name}
      </Typography>
    </Box>
  );
};
