import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const CarouselItem = ({ item }) => {
  return (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const styles = {
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth - 120,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default CarouselItem;
