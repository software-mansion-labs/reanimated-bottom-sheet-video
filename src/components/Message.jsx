import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { ACCENT_COLOR, BORDER_COLOR } from "../misc/colors";
import { messages } from "../misc/messages";

function Message(props) {
  const { message, accent } = props;

  const messagesToAnimate = messages.filter((msg) => msg.from === "me");
  const index = messagesToAnimate.findIndex((msg) => msg.id === message.id);

  const background = useAnimatedStyle(() => ({
    backgroundColor: withDelay(150 * index, withTiming(accent.value)),
  }));

  const color = useAnimatedStyle(() => ({
    color: withDelay(
      150 * index,
      isDarkColor(accent.value) ? withTiming("white") : withTiming("black")
    ),
  }));

  return (
    <Animated.View
      style={[
        styles.message,
        message.from === "me"
          ? [styles.messageMe, background]
          : styles.messageThem,
      ]}
    >
      <Animated.Text
        style={[
          styles.messageText,
          message.from === "me" ? color : { color: "black" },
        ]}
      >
        {message.message}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  message: {
    maxWidth: "80%",
    marginVertical: 8,
    marginHorizontal: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 24,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  messageMe: {
    alignSelf: "flex-end",
    backgroundColor: ACCENT_COLOR,
  },
  messageThem: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: BORDER_COLOR,
  },
});

function isDarkColor(hex) {
  "worklet";
  // https://stackoverflow.com/a/69353003/9999202
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // https://stackoverflow.com/a/58270890/9999202
  const hsp = Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2);
  return hsp < 170;
}

export default Message;
