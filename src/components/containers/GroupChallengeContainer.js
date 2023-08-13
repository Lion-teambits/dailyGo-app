import { Box, Image, VStack } from "native-base";
import { IMAGE_GROUP_EVENT_LIST } from "../../constants/imagePaths";
import SearchForm from "../forms/SearchForm";
import { retrieveGroupChallengeInfoByShareId } from "../../api/groupChallengeService";
import { useState } from "react";
import ChallengeDetailContainer from "./ChallengeDetailContainer";
import Typography from "../typography/typography";
import { StyleSheet } from "react-native";
import { PRIMARY_DARK } from "../../constants/colorCodes";

const GroupChallengeContainer = () => {
  const [groupInfo, setGroupInfo] = useState("");

  const handleGroupChallengeSearch = async (value) => {
    if (value === "") {
      setGroupInfo("");
      alert("Input code");
      return;
    }
    try {
      const groupChallengeInfo = await retrieveGroupChallengeInfoByShareId(
        value
      );
      setGroupInfo(groupChallengeInfo);
    } catch (error) {
      console.log("[dev]Error: ", error);
      setGroupInfo("");
      alert("code not found");
    }
  };

  return (
    <VStack marginX={4} space={4}>
      <Typography type="smallTextBold" style={styles.subtitles}>
        Team event code
      </Typography>
      <SearchForm handleSubmit={handleGroupChallengeSearch} />
      {groupInfo ? (
        <Box>
          <ChallengeDetailContainer
            challenge={groupInfo}
            isGroupChallenge={true}
          />
        </Box>
      ) : (
        <Box marginTop={10} justifyContent="center" alignItems="center">
          <Typography type="heading4" style={styles.body}>
            Join your friends
          </Typography>
          <Image
            marginTop={4}
            alt="Monster Friends Image"
            source={IMAGE_GROUP_EVENT_LIST}
            style={{ width: 354, height: 186 }}
          />
        </Box>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  subtitles: {
    color: PRIMARY_DARK,
  },
  body: {
    color: PRIMARY_DARK,
  },
});

export default GroupChallengeContainer;
