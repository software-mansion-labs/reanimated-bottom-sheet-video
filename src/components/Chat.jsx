import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SettingsIcon from "../icons/SettingsIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import MicrophoneIcon from "../icons/MicrophoneIcon";
import SendIcon from "../icons/SendIcon";
import { messages } from "../misc/messages";
import {
  ACCENT_COLOR,
  BACKGROUND_COLOR,
  BORDER_COLOR,
  PRIMARY_COLOR,
} from "../misc/colors";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

function Chat(props) {
  const { toggleSheet, accent } = props;

  return (
    <>
      <SafeAreaView style={styles.headerContainer} edges={["top"]}>
        <View style={styles.wrapper}>
          <ArrowLeftIcon />
          <Text style={styles.title}>Casper</Text>
          <TouchableOpacity onPress={toggleSheet}>
            <SettingsIcon />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message key={item.id} message={item} accent={accent} />
        )}
        keyExtractor={(item) => item.id}
      />
      <SafeAreaView style={styles.footerContainer} edges={["bottom"]}>
        <View style={styles.wrapper}>
          <MicrophoneIcon />
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Message</Text>
          </View>
          <SendIcon />
        </View>
      </SafeAreaView>
    </>
  );
}

function Message(props) {
  const { message, accent } = props;
  const color = useDerivedValue(() => accent.value);

  const messagesToAnimate = messages.filter((msg) => msg.from === "me");
  const index = messagesToAnimate.findIndex((msg) => msg.id === message.id);

  const background = useAnimatedStyle(() => ({
    backgroundColor: withDelay(150 * index, withTiming(color.value)),
  }));

  const textColor = useAnimatedStyle(() => ({
    color: withDelay(
      150 * index,
      isDarkColor(color.value) ? withTiming("white") : withTiming("black")
    ),
  }));

  return (
    <Animated.View
      style={
        message.from === "me"
          ? [styles.message, styles.messageMe, background]
          : [styles.message, styles.messageThem]
      }
    >
      <Animated.Text
        style={[
          styles.messageText,
          message.from === "me" ? textColor : { color: "black" },
        ]}
      >
        {message.message}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  headerContainer: {
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
  },
  footerContainer: {
    backgroundColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#C1C6E5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
  },
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
  textWrapper: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    fontSize: 15,
    borderRadius: 24,
    marginHorizontal: 4,
  },
  text: {
    color: BORDER_COLOR,
    fontSize: 15,
    padding: 8,
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

export default Chat;
