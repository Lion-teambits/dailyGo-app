import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BadgeDetailContainer from "../../components/containers/BadgeDetailContainer";
import StatisticsContainer from "../../components/containers/StatisticsContainer";
import StatsContainer from "../../components/containers/StatsContainer";
import StreakContainer from "../../components/containers/StreakContainer";
import { PRIMARY_DARK } from "../../constants/colorCodes";

const AchievementsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Achievements</Text>
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
    fontSize: 18,
    fontWeight: "bold",
    color: PRIMARY_DARK,
    textAlign: "center",
    marginBottom: 32,
  },
  contentContainer: {
    paddingLeft: 20,
  },
});

export default AchievementsScreen;
