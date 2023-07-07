import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";
import { BACKEND_SERVER_URL } from "@env";

const StreakContainer = () => {
  const [streakData, setStreakData] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_SERVER_URL}/api/v1/dailyRecord/uid/111`)
      .then((response) => {
        const userData = response.data;
        setStreakData(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderStreakIcons = () => {
    const lastSevenDaysData = streakData.slice(-7); // Retrieve last 7 days' data
    const streakIcons = [];
    let stopIndex = -1;

    // Find the index of the latest occurrence of "stop" streak status
    for (let i = lastSevenDaysData.length - 1; i >= 0; i--) {
      if (lastSevenDaysData[i].streak_status === "stop") {
        stopIndex = i;
        break;
      }
    }

    if (stopIndex !== -1) {
      lastSevenDaysData.splice(0, stopIndex + 1); // Remove arrays prior to the latest "stop"
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
      <View style={styles.streakItem}>{renderStreakIcons()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  streakContainer: {
    marginBottom: 20,
  },
  streakHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  streakItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  streakIcon: {
    width: 45,
    height: 45,
    marginRight: 10,
    borderRadius: 50,
  },
});

export default StreakContainer;
