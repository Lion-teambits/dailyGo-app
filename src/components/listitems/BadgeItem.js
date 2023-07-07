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
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  badgeName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "darkblue",
    marginBottom: 10,
    textAlign: "center",
  },
  badgeDetail: {
    fontSize: 18,
    marginBottom: 20,
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
    color: "darkblue",
  },
  shareButton: {
    backgroundColor: "darkorange",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: "100%",
  },
  goBackButton: {
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
});

export default BadgeItem;
