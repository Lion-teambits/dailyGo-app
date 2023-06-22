import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const BadgeList = ({ navigation, route }) => {
  const { category } = route.params;

  const getBadgeData = () => {
    if (category === "daily") {
      return [
        {
          id: 1,
          image: require("../../../assets/images/image1.jpeg"),
          name: "Badge 1",
          detail: "Badge 1 Detail",
        },
        {
          id: 2,
          image: require("../../../assets/images/image2.jpeg"),
          name: "Badge 2",
          detail: "Badge 2 Detail",
        },
      ];
    } else if (category === "event") {
      return [
        {
          id: 1,
          image: require("../../../assets/images/image3.jpeg"),
          name: "Badge 3",
          detail: "Badge 3 Detail",
        },
        {
          id: 2,
          image: require("../../../assets/images/image4.jpeg"),
          name: "Badge 4",
          detail: "Badge 4 Detail",
        },
      ];
    }
    return [];
  };

  const handleBadgePress = (badge) => {
    navigation.navigate("BadgeDetail", { badge });
  };

  const renderBadgeItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleBadgePress(item)}>
        <View style={styles.badgeItem}>
          <Image style={styles.badgeImage} source={item.image} />
          <Text style={styles.badgeName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getCategoryDisplayName = () => {
    if (category === "daily") {
      return "Daily";
    } else if (category === "event") {
      return "Event";
    }
    return "";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{getCategoryDisplayName()} Monsters</Text>
      <FlatList
        data={getBadgeData()}
        renderItem={renderBadgeItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  badgeItem: {
    alignItems: "center",
    marginBottom: 10,
    marginRight: 10,
  },
  badgeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,

    marginBottom: 10,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BadgeList;
