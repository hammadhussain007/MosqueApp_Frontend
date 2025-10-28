import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ForgotPasswordScreen({ navigation }) {
  const [method, setMethod] = useState("email");
  const [inputValue, setInputValue] = useState("");

  const handleSendOTP = () => {
    if (!inputValue) {
      Alert.alert("Missing Info", `Please enter your ${method}.`);
      return;
    }

    Alert.alert("OTP Sent", `OTP sent to your ${method}: ${inputValue}`);
    navigation.navigate("ResetPassword", { method, inputValue });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email or phone number to receive an OTP.
      </Text>

      <Picker
        selectedValue={method}
        style={styles.picker}
        onValueChange={(value) => setMethod(value)}
      >
        <Picker.Item label="Email" value="email" />
        <Picker.Item label="Phone Number" value="phone" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder={
          method === "email" ? "Enter your email" : "Enter your phone number"
        }
        value={inputValue}
        onChangeText={setInputValue}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { textAlign: "center", color: "#555", marginBottom: 20 },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  picker: { width: "100%", marginBottom: 15 },
  button: {
    backgroundColor: "#007bff",
    width: "100%",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
  link: { color: "#007bff", marginTop: 15 },
});
