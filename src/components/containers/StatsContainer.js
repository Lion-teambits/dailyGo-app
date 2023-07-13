import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";
import { BACKEND_SERVER_URL } from "@env";
import { TXT_LIGHT_BG } from "../../constants/colorCodes";

const StatsContainer = () => {
  const [fireflies, setFireflies] = useState(0);
  const [hearts, setHearts] = useState(0);

  useEffect(() => {
    axios
      .get(`${BACKEND_SERVER_URL}/api/v1/user/aoxfjhh0232`)
      .then((response) => {
        const { fireflies, hearts } = response.data;
        setFireflies(fireflies);
        setHearts(hearts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.statsContainer}>
      <Text style={styles.statsHeader}>Fireflies and Hearts</Text>
      <View style={styles.statsTextContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.statsText}>{fireflies}</Text>
          <Image
            style={styles.statsIconFirefly}
            source={require("../../../assets/images/icons/firefly.png")}
          />
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsText}>{hearts}</Text>
          <Image
            style={styles.statsIconHearts}
            source={
              hearts === 0
                ? require("../../../assets/images/icons/heart0.png")
                : hearts === 1
                ? require("../../../assets/images/icons/heart1.png")
                : hearts === 2
                ? require("../../../assets/images/icons/heart2.png")
                : require("../../../assets/images/icons/heart3.png")
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    marginBottom: 20,
  },
  statsTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  statsHeader: {
    color: TXT_LIGHT_BG,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statsText: {
    color: TXT_LIGHT_BG,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  statsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginRight: 24,
  },
  statsIconFirefly: {
    width: 34,
    height: 34,
    marginRight: 8,
  },
  statsIconHearts: {
    width: 85,
    height: 34,
  },
});

export default StatsContainer;
