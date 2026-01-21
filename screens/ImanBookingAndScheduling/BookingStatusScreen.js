// app/screens/ImamBookingAndScheduling/BookingStatusScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BookingStatusScreen({ route }) {
  const { status } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Status</Text>
      <Text style={styles.subtitle}>{status || "Pending"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
  subtitle: { fontSize: 16, color: "#444" },
});
