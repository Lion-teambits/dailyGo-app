import { Box, Center, Progress, Slider } from "native-base";
import FireFly from "../../../assets/images/icons/firefly.svg";
import { ACCENT_MEDIUM, BG_LIGHT } from "../../constants/colorCodes";
import { TouchableWithoutFeedback } from "react-native";

const ProgressBarHome = ({ progressRate }) => {
  return (
    <Center w="100%">
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
      <Box w="90%">
        <Progress
          size="xl"
          bg={BG_LIGHT}
          _filledTrack={{
            bg: ACCENT_MEDIUM,
          }}
          value={progressRate}
        />
      </Box>
    </Center>
  );
};

export default ProgressBarHome;
