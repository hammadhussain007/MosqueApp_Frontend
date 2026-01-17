import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MoodCard({ icon, label, color, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      activeOpacity={0.8}
      onPress={onPress}   // ✅ THIS WAS MISSING
    >
      <Icon name={icon} size={26} color="#FFFFFF" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: 90,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginTop: 6,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});