import { MaterialIcons } from "@expo/vector-icons";
import { Box, HStack, PresenceTransition, View } from "native-base";
import Typography from "../../typography/typography";
import { StyleSheet } from "react-native";
import { PRIMARY_DARK } from "../../../constants/colorCodes";

const PageIndicator = ({ totalPageCount, currentPage, monsterName }) => {
  return (
    <View width="100%">
      <HStack
        width="100%"
        space={2}
        justifyContent="space-evenly"
        // paddingX={2}
        marginTop={-8}
        marginBottom={8}
      >
        <Box>
          <MaterialIcons
            name="circle"
            size={24}
            color={
              currentPage >= 3 && totalPageCount >= 3 ? "white" : "transparent"
            }
          />
        </Box>
        <Box marginTop={10}>
          <MaterialIcons
            name="circle"
            size={32}
            color={
              currentPage >= 2 && totalPageCount >= 2 ? "white" : "transparent"
            }
          />
        </Box>
        <PresenceTransition
          visible={true}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 250,
            },
          }}
        >
          <Box
            marginTop={10}
            backgroundColor="white"
            padding={4}
            rounded="xl"
            shadow={4}
          >
            <Typography
              type="smallTextBold"
              style={styles.monsterName}
            >
              {monsterName}
            </Typography>
          </Box>
        </PresenceTransition>
        <Box marginTop={10}>
          <MaterialIcons
            name="circle"
            size={32}
            color={
              totalPageCount - currentPage >= 1 && totalPageCount >= 3
                ? "white"
                : "transparent"
            }
          />
        </Box>
        <Box>
          <MaterialIcons
            name="circle"
            size={24}
            color={
              totalPageCount - currentPage >= 2 && totalPageCount >= 3
                ? "white"
                : "transparent"
            }
          />
        </Box>
      </HStack>
    </View>
  );
};

export default PageIndicator;

const styles = StyleSheet.create({
  monsterName: {
    color: PRIMARY_DARK,
  },
});
