// app/screens/BookingConfirmationScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function BookingConfirmationScreen({ navigation, route }) {
  const { imam, serviceName, selectedDate, selectedTime } = route.params || {};

  if (!imam || !selectedDate || !selectedTime) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Incomplete Booking Details</Text>
      </View>
    );
  }

  const handleConfirm = () => {
    // Here you would call your backend API to create the booking
    // After success, navigate to BookingStatusScreen
    navigation.replace("BookingStatus");
  };

  const handleEdit = () => {
    // Go back to BookingDateTimeScreen to change date/time
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Confirm Your Booking</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Service:</Text>
        <Text style={styles.value}>{serviceName}</Text>

        <Text style={styles.label}>Imam:</Text>
        <Text style={styles.value}>{imam.name}</Text>

        <Text style={styles.label}>Masjid:</Text>
        <Text style={styles.value}>{imam.masjid}</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{selectedDate}</Text>

        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{selectedTime}</Text>
      </View>

      <TouchableOpacity style={styles.buttonConfirm} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonEdit} onPress={handleEdit}>
        <Text style={styles.buttonText}>Edit Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#222",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
    marginBottom: 4,
  },
  buttonConfirm: {
    height: 45,
    backgroundColor: "#28a745",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonEdit: {
    height: 45,
    backgroundColor: "#ffc107",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
