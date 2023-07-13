import { Box, HStack, Heading, Image, Text, VStack } from "native-base";
import { badges } from "../../data/badgeData";

const BadgeToAchieve = ({ badgeId, steps }) => {
  const badgeInfo = badges.find((badge) => badge.id == badgeId);

  return (
    <Box
      paddingY={2}
      paddingX={4}
      margin={3}
      borderRadius={10}
      bg="white"
      shadow={2}
      overflow="hidden"
    >
      <VStack space={1}>
        <Heading size={"md"}>Badge to Achieve</Heading>
        <HStack>
          <Box width={"40%"} justifyContent="center" alignItems="center">
            <Image
              alt="Badge Image"
              source={parseInt(badgeInfo.badgeImage)}
              style={{ width: 100, height: 100 }}
            />
          </Box>
          <Box width={"60%"}>
            <VStack>
              <Box>
                <Heading size={"xs"}>Monster Info</Heading>
                <Text>{badgeInfo.description}</Text>
              </Box>
              <Box>
                <Heading size={"xs"}>Goal: {steps} Steps</Heading>
                <Text>Est. distance: {parseInt(steps * 0.0007)} Km</Text>
              </Box>
            </VStack>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default BadgeToAchieve;
