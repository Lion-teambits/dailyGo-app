import { Box, HStack, Heading, Image, Text, VStack } from "native-base";
import { PROFILE_AVATAR_LIST } from "../../constants/imagePaths";

const FriendsCard = ({ member, displayTitle }) => {
  return (
    <VStack>
      {displayTitle ? <Heading size={"sm"}>Friends</Heading> : null}
      <HStack>
        {member.map((person) => {
          return (
            <Box margin={1} key={person} borderRadius="full" overflow="hidden">
              <Image
                alt="member avatar"
                source={parseInt(
                  PROFILE_AVATAR_LIST[
                    Math.floor(Math.random() * PROFILE_AVATAR_LIST.length)
                  ]
                )}
                style={{ width: 32, height: 32 }}
              />
            </Box>
          );
        })}
      </HStack>
    </VStack>
  );
};

export default FriendsCard;
