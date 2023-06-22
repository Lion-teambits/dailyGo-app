import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const FilterButton = ({ label, onPress, isActive }) => {
  const buttonStyle = isActive ? styles.activeButton : styles.button;
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
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: "lightgray",
  },
  activeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginHorizontal: 5,

    backgroundColor: "gray",
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
