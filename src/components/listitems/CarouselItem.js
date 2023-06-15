import React from "react";
import { View, Text, Image } from "react-native";

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
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default CarouselItem;
