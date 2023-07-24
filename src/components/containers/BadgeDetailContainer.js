import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { badges } from "../../data/badgeData";
import { retrieveUserInfo } from "../../api/userService";
import {
  PRIMARY_MEDIUM,
  TXT_LIGHT_BG,
  TXT_MEDIUM_BG,
} from "../../constants/colorCodes";
import Typography from "../typography/typography";

const BadgeDetailContainer = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const uid = await AsyncStorage.getItem("@uid");
        const userData = await retrieveUserInfo(uid);
        setUserData(userData);
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
  }, []);

  const findBadgeImage = (badgeTitle) => {
    const badge = badges.find((badge) => badge.badgeTitle === badgeTitle);
    return badge ? badge.badgeImage : null;
  };

  const handleSeeMorePress = (category) => {
    let categoryBadges = [];
    let headerText = "Badges";

    if (category === "daily") {
      categoryBadges = dailyMonstersBadges;
      headerText = "Daily Badges";
    } else if (category === "special") {
      categoryBadges = specialMonstersBadges;
      headerText = "Special Badges";
    }
    navigation.navigate("BadgeList", { categoryBadges, userData, headerText });
  };

  const dailyMonstersBadges = badges.slice(0, 6);
  const specialMonstersBadges = badges.slice(6);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.badgesContainer}>
        <Typography type="subtitles" style={styles.badgesMainHeader}>
          Rewards
        </Typography>
        <View style={styles.badgesHeaderContainer}>
          <Typography type="body2Bold" style={styles.badgesHeader}>
            Daily Badges
          </Typography>
          <TouchableOpacity onPress={() => handleSeeMorePress("daily")}>
            <Typography type="body2Bold" style={styles.seeMore}>
              See More
            </Typography>
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
          <Typography type="body2Bold" style={styles.badgesHeader}>
            Special Badges
          </Typography>
          {specialMonstersBadges.filter((badge) =>
            userData?.badges.includes(badge.badgeTitle)
          ).length > 5 && (
            <TouchableOpacity onPress={() => handleSeeMorePress("special")}>
              <Typography type="body2Bold" style={styles.seeMore}>
                See More
              </Typography>
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
            <Typography type="smallTextRegular" style={styles.noSpecialBadges}>
              No special badges available
            </Typography>
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
    paddingBottom: 60,
  },
  contentContainer: {
    paddingBottom: 30,
  },

  badgesContainer: {
    marginBottom: 20,
  },
  badgesMainHeader: {
    color: TXT_LIGHT_BG,
    marginBottom: 25,
  },
  badgesHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  badgesHeader: {
    color: TXT_LIGHT_BG,
    marginBottom: 10,
  },
  badgeImage: {
    width: 72,
    height: 72,
    borderRadius: 50,
    marginRight: 10,
  },
  seeMore: {
    color: PRIMARY_MEDIUM,
    alignSelf: "flex-end",
    paddingRight: 20,
  },

  noSpecialBadges: {
    color: TXT_MEDIUM_BG,
    textAlign: "center",
  },
});

export default BadgeDetailContainer;
