import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MoodCard({ icon, label, color, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Icon name={icon} size={22} color={color} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#F6F6F6",
    borderRadius: 14,
    paddingVertical: 22,
    alignItems: "center",
    marginBottom: 12,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
});