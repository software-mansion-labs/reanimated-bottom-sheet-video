import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { PRIMARY_COLOR, colors } from "../misc/colors";
import { HEIGHT } from "../misc/consts";

const { width: windowWidth } = Dimensions.get("window");
const gap = 10;

function AccentPicker({ onPick }) {
  return (
    <>
      <Text style={styles.label}>Choose accent</Text>
      <View style={styles.container}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={{ backgroundColor: color, ...styles.swatch }}
            onPress={() => onPick(color)}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: gap,
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
    height: (windowWidth - 10 * gap) / 7,
    aspectRatio: 1,
    borderRadius: 4,
  },
});

export default AccentPicker;
