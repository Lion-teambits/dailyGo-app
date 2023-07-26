import { useNavigation } from "@react-navigation/native";
import { Box, Button, HStack, Image, VStack } from "native-base";
import { eventDateStatus } from "../../utils/dateUtils";
import { DISABLED, SECONDARY_MEDIUM } from "../../constants/colorCodes";
import { createChallengeProgress } from "../../api/challengeProgressService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveUserInfo, updateUserInfo } from "../../api/userService";
import BadgeToAchieve from "../cards/BadgeToAchieve";
import FriendsCard from "../cards/FriendsCard";
import { updateGroupChallenge } from "../../api/groupChallengeService";
import { TimeDiffTextBox } from "../textBoxes/TimeDiffTextBox";
import { MonsterNameTextBox } from "../textBoxes/MonsterNameTextBox";
import Typography from "../typography/typography";

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

  return (
    <VStack space={1} margin={4}>
      <HStack justifyContent="space-between">
        <Typography type="capitalized" style={{ color: color }}>
          {status}
        </Typography>
        <TimeDiffTextBox timeDifference={timeDifference} />
      </HStack>
      <Box space={1} alignItems="center">
        <Image
          alt={challenge.title}
          source={challenge.monster_image}
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
        <Button
          margin={1}
          width={"100%"}
          borderRadius={50}
          onPress={joinEvent}
          disabled={isJoinDisabled}
          backgroundColor={isJoinDisabled ? DISABLED : SECONDARY_MEDIUM}
        >
          Join Event
        </Button>
        <Button
          margin={1}
          width={"100%"}
          borderRadius={50}
          onPress={goBackToChallenges}
          variant="unstyled"
        >
          Go Back to Challenges
        </Button>
      </Box>
    </VStack>
  );
};

export default ChallengeDetailContainer;
