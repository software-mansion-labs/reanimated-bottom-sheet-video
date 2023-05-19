import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SettingsIcon from "../icons/SettingsIcon";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";

const messages = [
  {
    id: 1,
    message: "yo! wanna grab some beer tonight?",
    from: "them",
  },
  {
    id: 2,
    message: "there's a new cool pub with open taps just down the street",
    from: "them",
  },
  {
    id: 3,
    message: "yeah sure what time?",
    from: "me",
  },
  {
    id: 4,
    message: "around 8pm?",
    from: "them",
  },
  {
    id: 5,
    message: "does that work for you?",
    from: "them",
  },
  {
    id: 6,
    message: "could we do a little bit earlier? like 7pm?",
    from: "me",
  },
  {
    id: 7,
    message: "yea sounds good",
    from: "them",
  },
  {
    id: 8,
    message: "should I bring my +1?",
    from: "me",
  },
  {
    id: 9,
    message: "yup, take Natalie with you!",
    from: "them",
  },
  {
    id: 10,
    message: "ok, see you there!",
    from: "me",
  },
  {
    id: 11,
    message: "cya!",
    from: "them",
  },
];

function Chat({ toggleSheet }) {
  return (
    <>
      <SafeAreaView style={styles.headerContainer} edges={["top"]}>
        <View style={styles.header}>
          <ArrowLeftIcon />
          <Text style={styles.title}>Casper</Text>
          <TouchableOpacity onPress={toggleSheet}>
            <SettingsIcon />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ScrollView>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.message,
              message.from === "me" ? styles.messageMe : styles.messageThem,
            ]}
          >
            <Text
              style={{
                ...styles.messageText,
                color: message.from === "me" ? "white" : "black",
              }}
            >
              {message.message}
            </Text>
          </View>
        ))}
      </ScrollView>
      <SafeAreaView
        style={styles.footerContainer}
        edges={["bottom"]}
      ></SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  headerContainer: {
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#C1C6E5",
  },
  footerContainer: {
    backgroundColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#C1C6E5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#001A72",
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
    backgroundColor: "#782AEB",
  },
  messageThem: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#C1C6E5",
  },
});

export default Chat;
