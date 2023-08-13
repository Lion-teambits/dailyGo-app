import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const Typography = ({ type, style, children }) => {
  const [loaded] = useFonts({
    Apertura: require("../../../assets/fonts/Apertura-Bold.otf"),
    WorkSansBold: require("../../../assets/fonts/WorkSans-Bold.ttf"),
    WorkSansSemiBold: require("../../../assets/fonts/WorkSans-SemiBold.ttf"),
    WorkSansRegular: require("../../../assets/fonts/WorkSans-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const getStyle = () => {
    switch (type) {
      case "heading1":
        return styles.heading1;
      case "heading2":
        return styles.heading2;
      case "heading3":
        return styles.heading3;
      case "heading4":
        return styles.heading4;
      case "subtitles":
        return styles.subtitles;
      case "body1":
        return styles.body1;
      case "body2":
        return styles.body2;
      case "body1Bold":
        return styles.body1Bold;
      case "body2Bold":
        return styles.body2Bold;
      case "button":
        return styles.button;
      case "smallTextBold":
        return styles.smallTextBold;
      case "smallTextRegular":
        return styles.smallTextRegular;
      case "capitalized":
        return styles.capitalized;

      default:
        return styles.body1;
    }
  };

  return <Text style={[styles.baseText, getStyle(), style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  heading1: {
    fontFamily: "Apertura",
    fontSize: 56,
    lineHeight: 56,
  },
  heading2: {
    fontFamily: "Apertura",
    fontSize: 44,
    lineHeight: 44,
  },
  heading3: {
    fontFamily: "Apertura",
    fontSize: 36,
    lineHeight: 36,
  },
  heading4: {
    fontFamily: "Apertura",
    fontSize: 24,
    lineHeight: 24,
  },
  subtitles: {
    fontFamily: "WorkSansBold",
    fontSize: 18,
    lineHeight: 19,
  },
  body1: {
    fontFamily: "WorkSansRegular",
    fontSize: 16,
    lineHeight: 19,
  },
  body1Bold: {
    fontFamily: "WorkSansBold",
    fontSize: 16,
    lineHeight: 19,
  },
  body2: {
    fontFamily: "WorkSansRegular",
    fontSize: 14,
    lineHeight: 17,
  },
  body2Bold: {
    fontFamily: "WorkSansBold",
    fontSize: 14,
    lineHeight: 17,
  },
  button: {
    fontFamily: "WorkSansSemiBold",
    fontSize: 14,
  },
  smallTextBold: {
    fontFamily: "WorkSansBold",
    fontSize: 12,
  },
  smallTextRegular: {
    fontFamily: "WorkSansRegular",
    fontSize: 12,
  },
  capitalized: {
    fontFamily: "WorkSansBold",
    fontSize: 12,
    textTransform: "uppercase",
  },
});

export default Typography;
