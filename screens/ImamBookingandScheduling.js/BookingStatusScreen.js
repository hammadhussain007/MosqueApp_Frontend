// app/screens/BookingStatusScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

// Dummy booking statuses
const dummyBookings = [
  {
    id: "1",
    service: "Nikah",
    imam: "Imam Ahmed",
    masjid: "Masjid Noor",
    date: "2026-01-20",
    time: "10:00 AM - 12:00 PM",
    status: "Pending",
  },
  {
    id: "2",
    service: "Daras/Lecture",
    imam: "Imam Bilal",
    masjid: "Masjid Rahman",
    date: "2026-01-22",
    time: "02:00 PM - 04:00 PM",
    status: "Confirmed",
  },
  {
    id: "3",
    service: "Janazah",
    imam: "Imam Usman",
    masjid: "Masjid Huda",
    date: "2026-01-25",
    time: "11:00 AM - 01:00 PM",
    status: "Completed",
  },
];

export default function BookingStatusScreen({ navigation }) {
  const renderBooking = ({ item }) => {
    let statusColor = "#555";

    if (item.status === "Pending") statusColor = "#ffc107"; // Yellow
    if (item.status === "Confirmed") statusColor = "#28a745"; // Green
    if (item.status === "Completed") statusColor = "#17a2b8"; // Blue
    if (item.status === "Cancelled") statusColor = "#dc3545"; // Red

    return (
      <View style={styles.card}>
        <Text style={styles.service}>{item.service}</Text>
        <Text style={styles.text}>Imam: {item.imam}</Text>
        <Text style={styles.text}>Masjid: {item.masjid}</Text>
        <Text style={styles.text}>Date: {item.date}</Text>
        <Text style={styles.text}>Time: {item.time}</Text>
        <Text style={[styles.status, { color: statusColor }]}>
          Status: {item.status}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("BookingDetail", { booking: item })
          }
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookings</Text>
      <FlatList
        data={dummyBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderBooking}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#222",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  service: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    color: "#222",
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  status: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    height: 40,
    backgroundColor: "#007bff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
