import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY_DARK, TXT_MEDIUM_BG } from "../../constants/colorCodes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Typography from "../typography/typography";

const BadgeList = ({ route }) => {
  const { categoryBadges, userData, headerText } = route.params;
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
          <Typography
            type="smallTextBold"
            style={[styles.badgeName, !hasBadge && styles.disabledBadgeText]}
          >
            {item.badgeTitle}
          </Typography>
        </View>
      </TouchableOpacity>
    );
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
        <Typography type="subtitles" style={styles.header}>
          {headerText}
        </Typography>
      </View>
      <FlatList
        data={filteredBadges}
        renderItem={renderBadgeItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 60,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 32,
    marginHorizontal: 8,
  },
  header: {
    flex: 1,
    color: PRIMARY_DARK,
    textAlign: "center",
    marginRight: 20,
  },
  badgeContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    width: 115,
  },
  badgeImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
  },
  badgeName: {
    marginTop: 16,
    textAlign: "center",
    color: PRIMARY_DARK,
  },
  disabledBadgeText: {
    color: TXT_MEDIUM_BG,
  },
});

export default BadgeList;
