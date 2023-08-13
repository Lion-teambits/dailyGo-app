import { useNavigation } from "@react-navigation/native";
import { Box, Button, HStack, Image, VStack } from "native-base";
import { eventDateStatus } from "../../utils/dateUtils";
import {
  DISABLED,
  PRIMARY_DARK,
  SECONDARY_MEDIUM,
} from "../../constants/colorCodes";
import { createChallengeProgress } from "../../api/challengeProgressService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveUserInfo, updateUserInfo } from "../../api/userService";
import BadgeToAchieve from "../cards/BadgeToAchieve";
import FriendsCard from "../cards/FriendsCard";
import { updateGroupChallenge } from "../../api/groupChallengeService";
import { TimeDiffTextBox } from "../textBoxes/TimeDiffTextBox";
import { MonsterNameTextBox } from "../textBoxes/MonsterNameTextBox";
import Typography from "../typography/typography";
import ActiveDetailBG from "../../../assets/images/challenge/activeChallengeDetailBG.svg";
import UpcomingDetailBG from "../../../assets/images/challenge/upcomingChallengeDetailBG.svg";
import BackToPreviousButton from "../buttons/BackToPreviousButton";
import ChallengeJoinButton from "../buttons/SecondaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

const ChallengeDetailContainer = (props) => {
  const { challenge, isGroupChallenge } = props;
  const navigation = useNavigation();

  const { status, timeDifference, color } = eventDateStatus(
    props.challenge.start_date,
    props.challenge.expired_date,
    false
  );

  const joinEvent = async () => {
    try {
      // 1. Make challengeProgress event
      const challengProgressData = await createChallengeProgress(
        challenge,
        isGroupChallenge
      );

      // 2. Add challengeProgress id to event_challenge_id attribute of user document
      const uid = await AsyncStorage.getItem("@uid");
      const userData = await retrieveUserInfo(uid);

      const isIdAlreadyExists = userData.event_challenge_progress.includes(
        challengProgressData._id
      );

      if (!isIdAlreadyExists) {
        if (isGroupChallenge) {
          userData.group_challenge_progress.push(challengProgressData._id);
          await updateUserInfo(uid, {
            group_challenge_progress: userData.group_challenge_progress,
          });
        } else {
          userData.event_challenge_progress.push(challengProgressData._id);
          await updateUserInfo(uid, {
            event_challenge_progress: userData.event_challenge_progress,
          });
        }
      }

      // 3. Add uid to groupchallenge document
      if (isGroupChallenge) {
        challenge.member_list.push(uid);
        await updateGroupChallenge(challenge._id, {
          member_list: challenge.member_list,
        });
      }

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const goBackToChallenges = () => {
    navigation.goBack();
  };

  const isJoinDisabled = status === "UPCOMING EVENT";

  let BackgroundComponent;

  if (status === "ACTIVE EVENT") {
    BackgroundComponent = ActiveDetailBG;
  } else if (status === "UPCOMING EVENT") {
    BackgroundComponent = UpcomingDetailBG;
  } else {
    // default value
    BackgroundComponent = null;
  }

  return (
    <Box>
      {BackgroundComponent ? (
        <BackgroundComponent
          width="100%"
          style={{
            position: "absolute",
          }}
        />
      ) : null}
      <VStack space={1} margin={4}>
        {isGroupChallenge ? (
          <Box alignItems="center">
            <Typography type="subtitles" style={{ color: PRIMARY_DARK }}>
              {challenge.title}
            </Typography>
          </Box>
        ) : (
          <HStack justifyContent="space-between">
            <Typography type="capitalized" style={{ color: color }}>
              {status}
            </Typography>
            <TimeDiffTextBox timeDifference={timeDifference} />
          </HStack>
        )}

        <Box space={1} alignItems="center">
          <Image
            marginBottom={4}
            alt={challenge.title}
            source={parseInt(challenge.monster_image)}
            style={{ width: 198, height: 192 }}
          />
          <MonsterNameTextBox name={challenge.monster_name} />
        </Box>
        {isGroupChallenge ? (
          <FriendsCard member={challenge.member_list} displayTitle={true} />
        ) : null}
        <Box space={1} alignItems="center">
          <BadgeToAchieve
            badgeId={challenge.badge_info}
            steps={challenge.target_steps}
          />
          <SecondaryButton
            onPressFunc={joinEvent}
            isDisabled={isJoinDisabled}
            text={"Join Event"}
          />
          <BackToPreviousButton
            callbackFunc={goBackToChallenges}
            text={"Go Back to Challenges"}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default ChallengeDetailContainer;
