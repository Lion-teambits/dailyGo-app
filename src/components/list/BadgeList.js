import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const BadgeList = ({ route }) => {
  const { categoryBadges, userData } = route.params;
  const navigation = useNavigation();

  const filteredBadges = categoryBadges.filter((badge) => {
    if (badge.id < 6) {
      return true;
    }
    return userData?.badges.includes(badge.badgeTitle);
  });

  const renderBadgeItem = ({ item }) => {
    const hasBadge = userData?.badges.includes(item.badgeTitle);
    return (
      <TouchableOpacity
        onPress={() =>
          hasBadge &&
          navigation.navigate("BadgeItem", { badgeTitle: item.badgeTitle })
        }
        disabled={!hasBadge}
        style={hasBadge ? styles.clickableBadge : styles.disabledBadge}
      >
        <View style={styles.badgeContainer}>
          <Image
            style={styles.badgeImage}
            source={
              hasBadge
                ? item.badgeImage
                : require("../../../assets/images/badges/daily0.png")
            }
          />
          <Text style={styles.badgeName}>{item.badgeTitle}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={filteredBadges}
      renderItem={renderBadgeItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 5,
  },
  badgeContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    width: 115,
  },
  badgeImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
  },
  badgeName: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default BadgeList;
