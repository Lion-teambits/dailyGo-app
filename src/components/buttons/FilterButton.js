import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { TXT_DARK_BG, TXT_LIGHT_BG } from "../../constants/colorCodes";

const FilterButton = ({
  label,
  onPress,
  isActive,
  activeColor,
  inactiveColor,
}) => {
  const buttonStyle = isActive
    ? [styles.activeButton, { backgroundColor: activeColor }]
    : [styles.button, { backgroundColor: inactiveColor }];
  const labelStyle = isActive ? styles.activeLabel : styles.label;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 4,
    backgroundColor: TXT_LIGHT_BG,
  },
  activeButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  label: {
    fontWeight: "bold",
    color: TXT_LIGHT_BG,
  },
  activeLabel: {
    fontWeight: "bold",
    color: TXT_DARK_BG,
  },
});

export default FilterButton;
