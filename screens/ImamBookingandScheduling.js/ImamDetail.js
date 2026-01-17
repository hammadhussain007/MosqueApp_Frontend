// app/screens/ImamDetailScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Linking,
  Alert,
} from "react-native";

// Dummy availability times
const dummyAvailability = [
  "09:00 AM - 11:00 AM",
  "01:00 PM - 03:00 PM",
  "05:00 PM - 07:00 PM",
];

export default function ImamDetailScreen({ navigation, route }) {
  const { imam, serviceName } = route.params || {};

  if (!imam) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Imam Selected</Text>
      </View>
    );
  }

  // 📞 Call Imam function
  const handleCallImam = () => {
    if (!imam.phone) {
      Alert.alert("Contact not available");
      return;
    }
    Linking.openURL(`tel:${imam.phone}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Imam Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{imam.name}</Text>

        <Text style={styles.label}>Masjid:</Text>
        <Text style={styles.value}>{imam.masjid}</Text>

        <Text style={styles.label}>Distance:</Text>
        <Text style={styles.value}>{imam.distance}</Text>

        <Text style={styles.label}>Experience:</Text>
        <Text style={styles.value}>{imam.experience}</Text>

        <Text style={styles.label}>Service Requested:</Text>
        <Text style={styles.value}>{serviceName}</Text>

        <Text style={styles.label}>Available Times:</Text>
        <FlatList
          data={dummyAvailability}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.value}>• {item}</Text>
          )}
        />
      </View>

      {/* 📞 Contact Imam Button */}
      <TouchableOpacity style={styles.callButton} onPress={handleCallImam}>
        <Text style={styles.callButtonText}>📞 Contact Imam</Text>
      </TouchableOpacity>

      {/* Booking Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("BookingDateTime", {
            imam,
            serviceName,
          })
        }
      >
        <Text style={styles.buttonText}>Proceed to Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
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
  callButton: {
    height: 45,
    backgroundColor: "#28a745",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  callButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    height: 45,
    backgroundColor: "#007bff",
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
