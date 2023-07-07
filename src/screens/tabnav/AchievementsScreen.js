import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import BadgeDetailContainer from "../../components/containers/BadgeDetailContainer";
import StatisticsContainer from "../../components/containers/StatisticsContainer";
import StatsContainer from "../../components/containers/StatsContainer";
import StreakContainer from "../../components/containers/StreakContainer";

const AchievementsScreen = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}>Achievements</Text>

      <StatsContainer />
      <StreakContainer />
      <StatisticsContainer />
      <BadgeDetailContainer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "white",
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "darkblue",
    textAlign: "center",
    marginBottom: 20,
  },
  streakContainer: {
    marginBottom: 20,
  },
  streakHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  streakItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  streakIcon: {
    width: 50,
    height: 50,
    marginRight: 3,
    borderRadius: 50,
  },
});

export default AchievementsScreen;
