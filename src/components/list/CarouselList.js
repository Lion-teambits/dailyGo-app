import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselItem from "../listitems/CarouselItem";
import image1 from "../../images/image1.jpeg";
import image2 from "../../images/image2.jpeg";
import image3 from "../../images/image3.jpeg";
import image4 from "../../images/image4.jpeg";

const CarouselList = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSkip = () => {
    navigation.navigate("Preferences");
  };

  const handleBack = () => {
    // Logic for going back
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
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.buttonText}>
          {<Ionicons name="chevron-back" />}
        </Text>
      </TouchableOpacity>
      <Carousel
        data={carouselData}
        renderItem={renderCarouselItem}
        sliderWidth={300}
        itemWidth={300}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={carouselData.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
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
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "rgba(0, 0, 0, 0.92)",
  },
  paginationInactiveDot: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
};

export default CarouselList;
