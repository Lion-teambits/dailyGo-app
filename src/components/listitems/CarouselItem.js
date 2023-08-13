import React from "react";
import { View, Image, Dimensions } from "react-native";
import { TXT_DARK_BG } from "../../constants/colorCodes";
import Typography from "../typography/typography";

const windowWidth = Dimensions.get("window").width;

const CarouselItem = ({ item }) => {
  return (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.image} />
      <Typography type="subtitles" style={styles.description}>
        {item.description}
      </Typography>
      <Typography type="body2" style={styles.description2}>
        {item.description2}
      </Typography>
    </View>
  );
};

const styles = {
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth,
    marginTop: "50%",
  },
  image: {
    width: 360,
    height: 243,
    resizeMode: "contain",
    marginBottom: 10,
  },
  description: {
    color: TXT_DARK_BG,
    textAlign: "center",
    padding: "10%",
  },
  description2: {
    textAlign: "center",
    color: TXT_DARK_BG,
    paddingLeft: "10%",
    paddingRight: "10%",
  },
};

export default CarouselItem;
