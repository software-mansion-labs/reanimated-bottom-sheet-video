import "react-native-gesture-handler";
import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
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
  FadeIn,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AccentPicker from "./src/components/AccentPicker";
import Chat from "./src/components/Chat";
import { HEIGHT, OVERDRAG } from "./src/misc/consts";
import { BACKDROP_COLOR, BACKGROUND_COLOR } from "./src/misc/colors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function App() {
  const [isOpen, setOpen] = useState(false);
  const [accent, setAccent] = useState("#782AEB");

  const offset = useSharedValue(0);

  const toggleSheet = () => {
    setOpen(!isOpen);
    offset.value = 0;
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;

      const clamp = Math.max(-OVERDRAG, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(HEIGHT, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const opacity = useAnimatedStyle(() => ({
    opacity: interpolate(offset.value, [0, HEIGHT], [1, 0]),
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Chat toggleSheet={toggleSheet} accent={accent} />
        {isOpen && (
          <>
            <AnimatedPressable
              style={[styles.backdrop, opacity]}
              entering={FadeIn}
              onPress={toggleSheet}
            />
            <GestureDetector gesture={pan}>
              <Animated.View
                style={[styles.sheet, translateY]}
                entering={SlideInDown.springify().damping(15)}
                exiting={SlideOutDown}
              >
                <AccentPicker
                  onPick={(color) => {
                    setAccent(color);
                    toggleSheet();
                  }}
                />
              </Animated.View>
            </GestureDetector>
          </>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
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
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BACKDROP_COLOR,
  },
});

export default App;
