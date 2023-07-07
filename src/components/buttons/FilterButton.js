import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

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
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    marginHorizontal: 5,
    backgroundColor: "lightgray",
  },
  activeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    marginHorizontal: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#000",
  },
  activeLabel: {
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default FilterButton;
