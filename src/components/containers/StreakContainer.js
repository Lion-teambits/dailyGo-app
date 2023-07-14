import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { retrieveDailyRecord } from "../../api/dailyRecordService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TXT_LIGHT_BG } from "../../constants/colorCodes";

const StreakContainer = () => {
  const [streakData, setStreakData] = useState([]);

  useEffect(() => {
    const getDailyRecord = async () => {
      try {
        const uid = await AsyncStorage.getItem("@uid");
        const dailyRecord = await retrieveDailyRecord(`uid/${uid}`);
        setStreakData(dailyRecord);
      } catch (error) {
        console.log(error);
      }
    };

    getDailyRecord();
  }, []);

  const renderStreakIcons = () => {
    const lastSevenDaysData = streakData.slice(-7);
    const streakIcons = [];
    let stopIndex = -1;

    for (let i = lastSevenDaysData.length - 1; i >= 0; i--) {
      if (lastSevenDaysData[i].streak_status === "stop") {
        stopIndex = i;
        break;
      }
    }

    if (stopIndex !== -1) {
      lastSevenDaysData.splice(0, stopIndex + 1);
    }

    let missingIconCount = 7 - lastSevenDaysData.length;

    if (lastSevenDaysData.length === 0) {
      streakIcons.push(
        <Image
          key={-1}
          style={styles.streakIcon}
          source={require("../../../assets/images/icons/streak-current.png")}
        />
      );
      missingIconCount--;
    }

    lastSevenDaysData.forEach((dayData, index) => {
      let streakIcon;

      if (index === lastSevenDaysData.length - 1) {
        streakIcon = (
          <Image
            key={index}
            style={styles.streakIcon}
            source={require("../../../assets/images/icons/streak-current.png")}
          />
        );
      } else {
        switch (dayData.streak_status) {
          case "skip":
            streakIcon = (
              <Image
                key={index}
                style={styles.streakIcon}
                source={require("../../../assets/images/icons/streak-skipped.png")}
              />
            );
            break;
          case "continue":
            streakIcon = (
              <Image
                key={index}
                style={styles.streakIcon}
                source={require("../../../assets/images/icons/streak-on.png")}
              />
            );
            break;
          default:
            streakIcon = (
              <Image
                key={index}
                style={styles.streakIcon}
                source={require("../../../assets/images/icons/streak-blank.png")}
              />
            );
            break;
        }
      }

      streakIcons.push(streakIcon);
    });

    for (let i = 0; i < missingIconCount; i++) {
      streakIcons.push(
        <Image
          key={lastSevenDaysData.length + i}
          style={styles.streakIcon}
          source={require("../../../assets/images/icons/streak-blank.png")}
        />
      );
    }

    return streakIcons;
  };

  return (
    <View style={styles.streakContainer}>
      <Text style={styles.streakHeader}>Streak (Last 7 days)</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContainer}
      >
        <View style={styles.streakItem}>{renderStreakIcons()}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  streakContainer: {
    marginBottom: 16,
  },
  streakHeader: {
    color: TXT_LIGHT_BG,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  streakItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  streakIcon: {
    width: 34,
    height: 34,
    marginTop: 16,
    marginRight: 16,
    borderRadius: 50,
  },
});

export default StreakContainer;
