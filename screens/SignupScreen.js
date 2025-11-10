// screens/SignupScreen.js
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);
  const [masjidName, setMasjidName] = useState("");
  const [masjidAddress, setMasjidAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");

  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Imam", value: "imam" },
    { label: "Volunteer", value: "volunteer" },
    { label: "General User", value: "user" },
  ];

  const handleSignup = () => {
    if (!fullName || !email || !password || !role) {
      Alert.alert("Missing Info", "Please fill all required fields.");
      return;
    }

    if (role === "imam" && (!masjidName || !masjidAddress || !bio)) {
      Alert.alert(
        "Incomplete Imam Info",
        "Please fill all Imam-specific fields."
      );
      return;
    }

    Alert.alert("Signup Successful", `Welcome, ${fullName}! Role: ${role}`);
    navigation.replace("Home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/*Dropdown for Role Selection */}
      <Dropdown
        style={styles.dropdown}
        data={roleOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Role"
        value={role}
        onChange={(item) => setRole(item.value)}
      />

      {/* Imam-specific fields */}
      {role === "imam" && (
        <View style={styles.extraFields}>
          <Text style={styles.subTitle}>Imam Details</Text>

          <TextInput
            style={styles.input}
            placeholder="Masjid Name"
            value={masjidName}
            onChangeText={setMasjidName}
          />

          <TextInput
            style={styles.input}
            placeholder="Masjid Address"
            value={masjidAddress}
            onChangeText={setMasjidAddress}
          />

          <TextInput
            style={styles.input}
            placeholder="Years of Experience"
            value={experience}
            onChangeText={setExperience}
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Educational Background / Certification (e.g., Dars-e-Nizami, Islamic Studies)"
            value={bio}
            onChangeText={setBio}
            multiline
          />
        </View>
      )}

      <Button title="Sign Up" onPress={handleSignup} />
      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? Login
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  dropdown: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  extraFields: {
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  linkText: {
    marginTop: 15,
    color: "#007bff",
    textDecorationLine: "underline",
  },
});
