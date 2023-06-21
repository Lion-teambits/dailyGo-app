import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import CarouselItem from "../listitems/CarouselItem";
import image1 from "../../../assets/images/image1.jpeg";
import image2 from "../../../assets/images/image2.jpeg";
import image3 from "../../../assets/images/image3.jpeg";
import image4 from "../../../assets/images/image4.jpeg";

const CarouselList = ({ navigation }) => {
  const handleSkip = () => {
    navigation.navigate("Preferences");
  };

  const renderCarouselItem = ({ item }) => {
    return <CarouselItem item={item} />;
  };

  const carouselData = [
    {
      image: image1,
      description: "These are the most dangerous monsters that are inside you!",
    },
    {
      image: image2,
      description:
        "Reach your daily steps to collect the fireflies and defeat your inner monsters.",
    },
    {
      image: image3,
      description: "Level up yourself by choosing the special challenges.",
    },
    {
      image: image4,
      description:
        "Collect your daily fireflies and special badges, track your achievement and be new you!",
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.buttonText}>Skip</Text>
      </TouchableOpacity>
      <View style={styles.carouselContainer}>
        <SwiperFlatList
          data={carouselData}
          renderItem={renderCarouselItem}
          showPagination
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 60,
  },
  skipButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default CarouselList;
