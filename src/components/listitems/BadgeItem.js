import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import { badges } from "../../data/badgeData";
import {
  PRIMARY_DARK,
  SECONDARY_MEDIUM,
  TXT_DARK_BG,
  TXT_LIGHT_BG,
} from "../../constants/colorCodes";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BadgeItem = ({ navigation, route }) => {
  const { badgeTitle } = route.params;
  const badge = badges.find((badge) => badge.badgeTitle === badgeTitle);

  const handleShareBadge = async () => {
    try {
      await Share.share({
        message: `Check out this awesome badge: ${badge.badgeTitle}!`,
      });
    } catch (error) {
      console.log("Error sharing badge:", error);
    }
  };

  const handleGoBack = () => {
    navigation.navigate("Achievements");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={24}
          color={PRIMARY_DARK}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.header}>Badge Details</Text>
      </View>
      <Image style={styles.badgeImage} source={badge.badgeImage} />
      <Text style={styles.badgeName}>{badge.badgeTitle}</Text>
      <Text style={styles.badgeDetail}>{badge.description}</Text>
      <TouchableOpacity style={styles.shareButton} onPress={handleShareBadge}>
        <Text style={styles.shareButtonText}>Share Badge</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Go back to Achievements</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 60,
    backgroundColor: "white",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 42,
    marginHorizontal: 8,
  },
  header: {
    flex: 1,
    color: PRIMARY_DARK,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 20,
  },
  badgeImage: {
    width: 204,
    height: 204,
    borderRadius: 100,
    marginBottom: 32,
    alignContent: "center",
  },
  badgeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: PRIMARY_DARK,
    marginBottom: 25,
    textAlign: "center",
  },
  badgeDetail: {
    fontSize: 14,
    color: TXT_LIGHT_BG,
    marginBottom: 32,
    textAlign: "center",
  },
  shareButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  backButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: PRIMARY_DARK,
  },
  shareButton: {
    backgroundColor: SECONDARY_MEDIUM,
    color: TXT_DARK_BG,
    width: 358,
    height: 40,
    padding: 10,
    marginBottom: 8,
    borderRadius: 24,
  },
  goBackButton: {
    padding: 16,
  },
});

export default BadgeItem;
