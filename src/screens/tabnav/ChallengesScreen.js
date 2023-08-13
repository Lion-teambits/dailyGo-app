import React, { useCallback, useLayoutEffect, useState } from "react";
import ChallengeList from "../../components/list/ChallengeList";
import { Box, HStack, ScrollView } from "native-base";
import GroupEventCard from "../../components/cards/GroupEventCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveUserInfo } from "../../api/userService";
import GroupChallengeList from "../../components/list/GroupChallengeList";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { screenTitleOption } from "../../styles/commonStyles";
import Typography from "../../components/typography/typography";
import { StyleSheet } from "react-native";
import { PRIMARY_MEDIUM } from "../../constants/colorCodes";
import { TimeUp } from "../../../assets/images/icons/challengesIcons";

const ChallengesScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions(screenTitleOption("Challenges"));
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const getUserInfo = async () => {
        const uid = await AsyncStorage.getItem("@uid");
        const userInfo = await retrieveUserInfo(uid);
        setUserData(userInfo);
      };
      getUserInfo();
    }, [])
  );

  return (
    <ScrollView>
      <Box bg="white">
        <Box marginX={3} marginTop={3}>
          <HStack space={2}>
            <Typography type="body2Bold" style={styles.label}>
              Sort by Event Date
            </Typography>
            <TimeUp />
          </HStack>
        </Box>

        <ChallengeList userData={userData} />
        <GroupChallengeList userData={userData} />
        <GroupEventCard />
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: PRIMARY_MEDIUM,
  },
});

export default ChallengesScreen;
