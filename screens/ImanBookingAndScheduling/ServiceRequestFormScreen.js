// app/screens/ImamBookingAndScheduling/ServiceRequestFormScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";

export default function ServiceRequestFormScreen({ navigation, route }) {
  const { serviceName } = route.params || {};
  const user = useSelector((state) => state.user.profile);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleNext = () => {
    // Trim fields and validate
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      Alert.alert("Missing Information", "Please fill all required fields.");
      return;
    }

    if (phone.trim().length < 10) {
      Alert.alert("Invalid Phone", "Please enter a valid phone number.");
      return;
    }

    navigation.navigate("NearbyImams", {
      serviceName,
      fullName: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      notes: notes.trim(),
      date: date.trim(),
      time: time.trim(),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Service Request</Text>
      <Text style={styles.subtitle}>
        Service: {serviceName || "Selected Service"}
      </Text>
      {user && (
        <Text style={styles.autofillNote}>
          Fields autofilled from your profile. You can edit them.
        </Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Your Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Complete Address"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Preferred Date (e.g., 2026-01-22)"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Preferred Time (e.g., 10:00 AM)"
        value={time}
        onChangeText={setTime}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Additional Notes (Optional)"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
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
    marginBottom: 10,
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  autofillNote: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    color: "#007bff",
    fontStyle: "italic",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 15,
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
