import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ACCENT_COLOR, BORDER_COLOR } from "../misc/colors";

function Message(props) {
  const { message, accent } = props;

  return (
    <View
      style={[
        styles.message,
        message.from === "me"
          ? [styles.messageMe, { backgroundColor: accent }]
          : styles.messageThem,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          {
            color:
              message.from === "me"
                ? isDarkColor(accent)
                  ? "white"
                  : "black"
                : "black",
          },
        ]}
      >
        {message.message}
      </Text>
    </View>
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
