import "react-native-gesture-handler";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const HEIGHT = 220;
const OVERDRAG = 20;

function App() {
  const [isOpen, setOpen] = useState(true);

  const offset = useSharedValue(0);

  const toggleSheet = () => {
    setOpen(!isOpen);
    offset.value = 0;
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;

      offset.value =
        offsetDelta > 0
          ? offsetDelta
          : withSpring(Math.max(-OVERDRAG, offsetDelta));
    })
    .onFinalize(() => {
      if (offset.value < HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        runOnJS(toggleSheet)();
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <Button title="Toggle Sheet" onPress={toggleSheet} />

      {isOpen && (
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[styles.sheet, animatedStyles]}
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown}
          >
            <AccentPicker />
          </Animated.View>
        </GestureDetector>
      )}
    </GestureHandlerRootView>
  );
}

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
  },
  swatch: {
    height: "30%",
    aspectRatio: 1,
    borderRadius: 4,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
  },

  sheet: {
    backgroundColor: "white",
    padding: 16,
    height: HEIGHT,
    width: "100%",
    position: "absolute",
    bottom: -OVERDRAG,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default App;
