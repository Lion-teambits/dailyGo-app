import { Box, HStack, Image, VStack } from "native-base";
import { PROFILE_AVATAR_LIST } from "../../constants/imagePaths";
import { PRIMARY_DARK } from "../../constants/colorCodes";
import Typography from "../typography/typography";

const FriendsCard = ({ member, displayTitle }) => {
  return (
    <VStack>
      {displayTitle ? (
        <Typography type="subtitles" style={{ color: PRIMARY_DARK }}>
          Friends
        </Typography>
      ) : null}
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
