import React from "react";

import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

const colors = [
  "#ff0064",
  "#8e3dff",
  "#f94d55",
  "#f1c11d",
  "#0bbebb",
  "#0d61ff",
  "#24a248",
  "#a5f0b5",
  "#9ef0f2",
  "#bce6fe",
  "#d0e1ff",
  "#e9dcff",
  "#ffd8e9",
  "#f3f5f9",
];

const HEIGHT = 220;

function AccentPicker() {
  return (
    <>
      <Text style={accentStyles.label}>Choose accent</Text>
      <View style={accentStyles.container}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={{ backgroundColor: color, ...accentStyles.swatch }}
          />
        ))}
      </View>
    </>
  );
}

const accentStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    flex: 1,
    height: HEIGHT / 2,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#001A72",
  },
  swatch: {
    height: "30%",
    aspectRatio: 1,
    borderRadius: 4,
  },
});

export default AccentPicker;
