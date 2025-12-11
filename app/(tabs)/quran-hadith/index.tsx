// app/(tabs)/quran-hadith/index.tsx
import React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function QuranHadithHome() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Daily Verse Card */}
      <Link href="/(tabs)/quran-hadith/DailyVerseScreen" asChild>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Daily Verse</Text>
          <Text style={styles.arabic}>وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ</Text>
          <Text style={styles.translation}>"And whoever relies upon Allah — then He is sufficient for him."</Text>
        </TouchableOpacity>
      </Link>

      {/* Emotion / Mood Card */}
      <Link href="/(tabs)/quran-hadith/EmotionScreen" asChild>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>How are you feeling?</Text>
          <View style={styles.emotionRow}>
            <Text>😊 Grateful</Text>
            <Text>😞 Sad</Text>
            <Text>💪 Motivated</Text>
          </View>
        </TouchableOpacity>
      </Link>

      {/* Recommendations Card */}
      <Link href="/(tabs)/quran-hadith/RecommendationsScreen" asChild>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Recommended for you</Text>
          <Text style={styles.translation}>"If you are grateful, I will surely increase you."</Text>
        </TouchableOpacity>
      </Link>

      {/* spacer */}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 18 },
  card: {
    backgroundColor: "#f6f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8, color: "#0f766e" },
  arabic: { fontSize: 20, textAlign: "right", marginBottom: 8 },
  translation: { fontSize: 14, color: "#374151", fontStyle: "italic" },
  emotionRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
});