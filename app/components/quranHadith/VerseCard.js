import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function VerseCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.arabic}>
        وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ
      </Text>

      <Text style={styles.translation}>
        “And whoever relies upon Allah – then He is sufficient for him.”
      </Text>

      <Text style={styles.reference}>
        — Surah At-Talaq (65:3)
      </Text>

      <View style={styles.reflectionBox}>
        <Text style={styles.reflectionTitle}>Reflection</Text>
        <Text style={styles.reflectionText}>
          This verse reminds us that complete trust in Allah brings peace,
          protection, and guidance during difficulties.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#EAF6F5",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  arabic: {
    fontSize: 20,
    textAlign: "right",
    color: "#1B5E5E",
    marginBottom: 10,
  },
  translation: {
    fontSize: 15,
    color: "#333",
    marginBottom: 6,
  },
  reference: {
    fontSize: 13,
    color: "#129696",
    marginBottom: 12,
  },
  reflectionBox: {
    backgroundColor: "#F3FBFA",
    padding: 12,
    borderRadius: 12,
  },
  reflectionTitle: {
    fontWeight: "600",
    marginBottom: 4,
  },
  reflectionText: {
    fontSize: 14,
    color: "#555",
  },
});