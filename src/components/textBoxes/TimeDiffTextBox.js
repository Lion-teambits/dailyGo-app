import { Box } from "native-base";
import { BG_PRIMARY, PRIMARY_DARK } from "../../constants/colorCodes";
import Typography from "../typography/typography";
import { StyleSheet } from "react-native";

export const TimeDiffTextBox = ({ timeDifference }) => {
  return (
    <Box paddingY={1} paddingX={3} bg={BG_PRIMARY} rounded={50}>
      <Typography type="smallTextBold" style={styles.label}>
        {timeDifference}
      </Typography>
    </Box>
  );
};

const styles = StyleSheet.create({
  label: {
    color: PRIMARY_DARK,
  },
});
