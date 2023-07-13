import { Box, HStack, Heading, Image, Text, VStack } from "native-base";
import {
  AVATAR_LIST,
  IMAGE_MONSTER_TAKOYAKI,
} from "../../constants/imagePaths";

const FriendsCard = ({ member, displayTitle }) => {
  return (
    <VStack>
      {displayTitle ? <Heading size={"sm"}>Friends</Heading> : null}
      <HStack>
        {member.map((person) => {
          return (
            <Box key={person}>
              <Image
                alt="member avatar"
                // TODO: update image file after Data's code merged.
                source={parseInt(AVATAR_LIST[Math.floor(Math.random() * 4)])}
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
