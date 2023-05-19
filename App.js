import "react-native-gesture-handler";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
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
  interpolate,
} from "react-native-reanimated";
import { Easing } from "react-native-reanimated";

const HEIGHT = 300;
const OVERDRAG = -10;

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
      console.log(offsetDelta);

      offset.value =
        offsetDelta > 0 ? offsetDelta : withSpring(Math.max(-20, offsetDelta));
      // offset.value = interpolate(
      //   event.translationY,
      //   [-300, -200, -100, 0, 100, 200, 300],
      //   [-55, -50, -40, 0, 100, 200, 300]
      // );
      // offset.value = event.translationY;
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
            <Text style={styles.label}>Hello World!</Text>
          </Animated.View>
        </GestureDetector>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sheet: {
    backgroundColor: "white",
    padding: 16,
    height: HEIGHT,
    width: "100%",
    position: "absolute",
    bottom: -20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default App;
