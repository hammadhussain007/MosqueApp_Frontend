import { Pressable, Text, StyleSheet } from "react-native";

export default function TopicCard({ title, count, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count} verses</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#F3F3F3",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10
  },
  title: { fontSize: 16, fontWeight: "600" },
  count: { fontSize: 12, color: "#666" }
});