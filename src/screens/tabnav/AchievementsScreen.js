import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import BadgeDetailContainer from "../../components/containers/BadgeDetailContainer";
import StatisticsContainer from "../../components/containers/StatisticsContainer";
import StatsContainer from "../../components/containers/StatsContainer";
import StreakContainer from "../../components/containers/StreakContainer";
import { PRIMARY_DARK } from "../../constants/colorCodes";
import Typography from "../../components/typography/typography";

const AchievementsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Typography type="subtitles" style={styles.header}>
        Achievements
      </Typography>
      <View style={styles.contentContainer}>
        <StatsContainer />
        <StreakContainer />
        <StatisticsContainer />
        <BadgeDetailContainer />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "white",
  },
  header: {
    color: PRIMARY_DARK,
    textAlign: "center",
    marginBottom: 32,
  },
  contentContainer: {
    paddingLeft: 20,
  },
});

export default AchievementsScreen;
