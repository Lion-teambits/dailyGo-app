import { Box, Center, HStack, Progress, Slider } from "native-base";
import FireFly from "../../../assets/images/icons/firefly.svg";
import {
  ACCENT_DARK,
  ACCENT_LIGHT,
  ACCENT_MEDIUM,
  BG_DARK,
  BG_LIGHT,
  TXT_DARK_BG,
} from "../../constants/colorCodes";
import { TouchableWithoutFeedback } from "react-native";
import Typography from "../typography/typography";

const ProgressBarHome = ({
  progressRate,
  getReward,
  challengeType,
  targetSteps,
}) => {
  return (
    <Center w="100%">
      {getReward ? null : (
        <Box
          w="82%"
          marginBottom={1}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <Slider
              size="sm"
              value={progressRate}
              minValue={0}
              maxValue={100}
            >
              <Slider.Track bg="transparent">
                <Slider.FilledTrack bg="transparent" />
              </Slider.Track>
              <Slider.Thumb
                borderWidth="0"
                bg="transparent"
              >
                <FireFly
                  width={24}
                  height={24}
                />
              </Slider.Thumb>
            </Slider>
          </TouchableWithoutFeedback>
        </Box>
      )}

      <Box
        w="90%"
        paddingY={2}
      >
        <Progress
          size="xl"
          bg={BG_LIGHT}
          _filledTrack={{
            bg: getReward ? ACCENT_LIGHT : ACCENT_MEDIUM,
          }}
          value={progressRate}
        />
        <HStack justifyContent="space-between">
          <Typography
            type="smallTextBold"
            style={{ color: getReward ? ACCENT_DARK : BG_DARK }}
          >
            0
          </Typography>
          <Typography
            type="smallTextBold"
            style={{ color: getReward ? ACCENT_DARK : BG_DARK }}
          >
            {targetSteps}
          </Typography>
        </HStack>

        {getReward && challengeType === "daily" && (
          <Typography
            type="button"
            style={{ color: ACCENT_DARK, textAlign: "center" }}
          >
            Firefly collected!
          </Typography>
        )}
      </Box>
    </Center>
  );
};

export default ProgressBarHome;
