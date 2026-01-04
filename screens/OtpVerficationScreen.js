import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function OtpVerificationScreen({ navigation, route }) {
  const [otp, setOtp] = useState("");
  const email = route?.params?.email || "your email";

  const handleVerify = () => {
    if (!otp) {
      Alert.alert("Missing OTP", "Please enter the verification code.");
      return;
    }
    Alert.alert("Email Verified", "Your email has been verified.");
    navigation.replace("Home");
  };

  const handleResend = () => {
    Alert.alert("OTP Sent", "A new verification code has been sent.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Verification</Text>
      <Text style={styles.infoText}>
        Enter the 6-digit code sent to {email}
      </Text>

      <TextInput
        style={styles.otpInput}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />

      <Button title="Verify" onPress={handleVerify} />

      <Text style={styles.resendText} onPress={handleResend}>
        Resend Code
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10, color: "#222" },
  infoText: { fontSize: 14, textAlign: "center", marginBottom: 20, color: "#555" },
  otpInput: { width: "100%", height: 45, borderColor: "#ccc", borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginBottom: 15, backgroundColor: "#fff", textAlign: "center", fontSize: 18, letterSpacing: 6 },
  resendText: { marginTop: 15, color: "#007bff", textDecorationLine: "underline" },
});
