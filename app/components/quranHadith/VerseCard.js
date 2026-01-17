import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { saveVerse } from "../../store/slices/activitySlice";

export default function VerseCard({ type, arabic, translation, reference }) {
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(
      saveVerse({
        type,
        arabic,
        translation,
        reference,
      })
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.type}>{type}</Text>

      {arabic ? <Text style={styles.arabic}>{arabic}</Text> : null}

      <Text style={styles.translation}>{translation}</Text>
      <Text style={styles.reference}>{reference}</Text>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  type: {
    fontSize: 12,
    color: "#777",
    marginBottom: 6,
  },
  arabic: {
    fontSize: 20,
    textAlign: "right",
    marginBottom: 10,
  },
  translation: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  reference: {
    fontSize: 12,
    color: "#666",
  },
  saveBtn: {
    marginTop: 12,
    alignSelf: "flex-end",
  },
  saveText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
});