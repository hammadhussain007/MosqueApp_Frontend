import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TabSwitch({ active, setActive }) {
  const tabs = ["Daily", "By Mood", "Topics", "Saved"];

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            active === tab && styles.activeTab,
          ]}
          onPress={() => setActive(tab)}
        >
          <Text
            style={[
              styles.text,
              active === tab && styles.activeText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F2F2F2",
    borderRadius: 30,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 30,
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
  },
  text: {
    color: "#777",
    fontSize: 14,
  },
  activeText: {
    color: "#000",
    fontWeight: "600",
  },
});