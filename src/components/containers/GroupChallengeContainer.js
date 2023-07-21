import { Box, Heading, Image, Text, VStack } from "native-base";
import { IMAGE_GROUP_EVENT_LIST } from "../../constants/imagePaths";
import SearchForm from "../forms/SearchForm";
import { retrieveGroupChallengeInfoByShareId } from "../../api/groupChallengeService";
import { useState } from "react";
import ChallengeDetailContainer from "./ChallengeDetailContainer";

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
    <VStack marginX={4}>
      <Text>Group event code</Text>
      <SearchForm handleSubmit={handleGroupChallengeSearch} />
      {groupInfo ? (
        <Box>
          <Text>{groupInfo.toString}</Text>
          <ChallengeDetailContainer
            challenge={groupInfo}
            isGroupChallenge={true}
          />
        </Box>
      ) : (
        <Box justifyContent="center" alignItems="center">
          <Heading>Join your friends</Heading>
          <Image
            alt="Monster Friends Image"
            source={IMAGE_GROUP_EVENT_LIST}
            style={{ width: 314, height: 165 }}
          />
        </Box>
      )}
    </VStack>
  );
};

export default GroupChallengeContainer;
