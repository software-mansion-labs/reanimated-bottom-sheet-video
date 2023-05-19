import React from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { PRIMARY_COLOR, colors } from "../misc/colors";
import { HEIGHT } from "../misc/consts";

function AccentPicker({ onPick }) {
  return (
    <>
      <Text style={accentStyles.label}>Choose accent</Text>
      <View style={accentStyles.container}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={{ backgroundColor: color, ...accentStyles.swatch }}
            onPress={() => onPick(color)}
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
    color: PRIMARY_COLOR,
  },
  swatch: {
    height: "30%",
    aspectRatio: 1,
    borderRadius: 4,
  },
});

export default AccentPicker;
