import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { badges } from "../../data/badgeData";
import { BACKEND_SERVER_URL } from "@env";

const BadgeDetailContainer = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`${BACKEND_SERVER_URL}/api/v1/user/aoxfjhh0232`)
      .then((response) => {
        const userData = response.data;
        setUserData(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const findBadgeImage = (badgeTitle) => {
    const badge = badges.find((badge) => badge.badgeTitle === badgeTitle);
    return badge ? badge.badgeImage : null;
  };

  const handleSeeMorePress = (category) => {
    let categoryBadges = [];
    if (category === "daily") {
      categoryBadges = dailyMonstersBadges;
    } else if (category === "special") {
      categoryBadges = specialMonstersBadges;
    }
    navigation.navigate("BadgeList", { categoryBadges, userData });
  };

  const dailyMonstersBadges = badges.slice(0, 6);
  const specialMonstersBadges = badges.slice(6);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.badgesContainer}>
        <Text style={styles.badgesMainHeader}>Rewards</Text>
        <View style={styles.badgesHeaderContainer}>
          <Text style={styles.badgesHeader}>Daily Badges</Text>
          <TouchableOpacity onPress={() => handleSeeMorePress("daily")}>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContainer}
        >
          {dailyMonstersBadges.map((badge) => {
            const badgeTitle = badge.badgeTitle;
            const badgeImage = findBadgeImage(badgeTitle);
            const hasBadge = userData?.badges.includes(badgeTitle);
            return (
              <TouchableOpacity
                key={badge.id}
                onPress={() =>
                  hasBadge && navigation.navigate("BadgeItem", { badgeTitle })
                }
                disabled={!hasBadge}
                style={hasBadge ? styles.clickableBadge : styles.disabledBadge}
              >
                <Image
                  style={styles.badgeImage}
                  source={
                    hasBadge
                      ? badgeImage
                      : require("../../../assets/images/badges/daily0.png")
                  }
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.badgesContainer}>
        <View style={styles.badgesHeaderContainer}>
          <Text style={styles.badgesHeader}>Special Badges</Text>
          {specialMonstersBadges.filter((badge) =>
            userData?.badges.includes(badge.badgeTitle)
          ).length > 0 && (
            <TouchableOpacity onPress={() => handleSeeMorePress("special")}>
              <Text style={styles.seeMore}>See more</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScrollContainer}
        >
          {specialMonstersBadges
            .filter((badge) => userData?.badges.includes(badge.badgeTitle))
            .map((badge) => {
              const badgeImage = findBadgeImage(badge.badgeTitle);
              return (
                <TouchableOpacity
                  key={badge.id}
                  onPress={() =>
                    navigation.navigate("BadgeItem", {
                      badgeTitle: badge.badgeTitle,
                    })
                  }
                >
                  <Image style={styles.badgeImage} source={badgeImage} />
                </TouchableOpacity>
              );
            })}
          {specialMonstersBadges.filter((badge) =>
            userData?.badges.includes(badge.badgeTitle)
          ).length === 0 && (
            <Text style={styles.noSpecialBadges}>
              No special badges available
            </Text>
          )}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  contentContainer: {
    paddingBottom: 30,
  },

  badgesContainer: {
    marginBottom: 20,
  },
  badgesMainHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  badgesHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  badgesHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  badgeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  seeMore: {
    color: "blue",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },

  noSpecialBadges: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default BadgeDetailContainer;
