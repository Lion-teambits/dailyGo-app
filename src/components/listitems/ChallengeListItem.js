import { Box, HStack, Heading, Image, Text, VStack, View } from "native-base";

const ChallengeListItem = ({ challenge }) => {
  return (
    <Box paddingY={2} paddingLeft={4}>
      <HStack space={1}>
        <Box minWidth={"80%"}>
          <VStack>
            <Text>{challenge.status}</Text>
            <Heading size={"sm"}>{challenge.title}</Heading>
            <Text>{challenge.description}</Text>
            <Text>
              {challenge.targetSteps} | {challenge.currentSteps}
            </Text>
            <View
              style={{ width: 100, height: 10, backgroundColor: "green" }}
            />
          </VStack>
          <HStack space={1} marginTop={1}>
            <Image
              source={challenge.badgeImage}
              style={{ width: 50, height: 50 }}
            />
            <Text>{challenge.badgeTitle}</Text>
          </HStack>
        </Box>
        <Box maxWidth={"30%"} minWidth={"30%"}>
          <Image source={challenge.image} size="xl" />
        </Box>
      </HStack>
    </Box>
  );
};

export default ChallengeListItem;
