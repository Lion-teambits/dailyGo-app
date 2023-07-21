import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import CarouselItem from "../listitems/CarouselItem";
import {
  ONBOARD_1,
  ONBOARD_2,
  ONBOARD_3,
  ONBOARD_4,
  ONBOARD_5,
} from "../../constants/imagePaths";
import { useNavigation } from "@react-navigation/native";
import {
  PRIMARY_DARK,
  PRIMARY_MEDIUM,
  TXT_DARK_BG,
  ACCENT_MEDIUM,
  TXT_LIGHT_BG,
} from "../../constants/colorCodes";

const CarouselList = ({ userInfo }) => {
  const navigation = useNavigation();
  const handleSkip = () => {
    navigation.navigate("Preferences", { userInfo });
  };

  const renderCarouselItem = ({ item, index }) => {
    const isLastPage = index === carouselData.length - 1;
    const isFirstPage = index === 0;
    const backgroundColor = isFirstPage ? PRIMARY_DARK : PRIMARY_MEDIUM;

    return (
      <View style={[styles.carouselItem, { backgroundColor }]}>
        <SwiperFlatList
          data={[item]}
          renderItem={({ item }) => <CarouselItem item={item} />}
          paginationStyleItem={styles.paginationContainer}
        />

        {isLastPage ? (
          <TouchableOpacity style={styles.startButton} onPress={handleSkip}>
            <Text style={styles.startButtonText}>
              Start my DailyGo challenge!
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const carouselData = [
    {
      image: ONBOARD_1,
      description: "These are the most dangerous monsters inside you.",
      description2:
        "They’re cute, but they represent your difficulty to have a more active lifestyle.",
    },
    {
      image: ONBOARD_2,
      description:
        "Every step you take will help you to collect fireflies to make the monsters happier.",
    },
    {
      image: ONBOARD_3,
      description:
        "It will also help you to keep motivated and change your life.",
    },
    {
      image: ONBOARD_4,
      description:
        "Bring your friends to walk more and have some fun together.",
    },
    {
      image: ONBOARD_5,
      description: "Get special badges on special events.",
    },
  ];

  return (
    <View style={styles.container}>
      <SwiperFlatList
        data={carouselData}
        renderItem={renderCarouselItem}
        showPagination
        paginationStyleItem={styles.paginationContainer}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: TXT_DARK_BG,
  },
  carouselItem: {
    flex: 1,
  },
  paginationContainer: {
    width: 8,
    height: 8,
    marginHorizontal: 5,
    marginVertical: -100,
  },
  startButton: {
    position: "absolute",
    backgroundColor: ACCENT_MEDIUM,
    width: "87%",
    height: 40,
    padding: 12,
    borderRadius: 24,
    bottom: "5%",
    right: "7%",
  },

  startButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: TXT_LIGHT_BG,
  },
};

export default CarouselList;
