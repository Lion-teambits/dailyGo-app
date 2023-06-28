import { Box, Heading, Image, Text, VStack } from "native-base";
import { IMAGE_GROUP_EVENT_LIST } from "../../constants/imagePaths";
import SearchForm from "../forms/SearchForm";

const GroupChallengeContainer = () => {
  const handleGroupChallengeSearch = (value) => {
    console.log("[dev]code: ", value);
  };

  return (
    <VStack marginX={4}>
      <Text>Group event code</Text>
      <SearchForm handleSubmit={handleGroupChallengeSearch} />
      <Box justifyContent="center" alignItems="center">
        <Heading>Join your friends</Heading>
        <Image
          alt="Monster Friends Image"
          source={IMAGE_GROUP_EVENT_LIST}
          style={{ width: 314, height: 165 }}
        />
      </Box>
    </VStack>
  );
};

export default GroupChallengeContainer;
