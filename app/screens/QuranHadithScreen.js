import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import VerseCard from "../components/quranHadith/VerseCard";
import TabSwitch from "../components/quranHadith/TabSwitch";
import MoodCard from "../components/quranHadith/MoodCard";


export default function QuranHadithScreen() {
  const [activeTab, setActiveTab] = useState("Daily");

  return (
    <ScrollView style={styles.container}>
      <TabSwitch active={activeTab} setActive={setActiveTab} />

      {activeTab === "Daily" && <VerseCard />}

      {activeTab === "By Mood" && (
        <View>
          <Text style={styles.sectionTitle}>
            How are you feeling today?
          </Text>

          <View style={styles.moodGrid}>
            <MoodCard icon="alert-circle-outline" label="Anxious" color="#E57373" />
            <MoodCard icon="emoticon-sad-outline" label="Sad" color="#64B5F6" />
            <MoodCard icon="heart-outline" label="Grateful" color="#81C784" />
            <MoodCard icon="flash-outline" label="Motivated" color="#FFB74D" />
            <MoodCard icon="account-outline" label="Lonely" color="#9575CD" />
            <MoodCard icon="clock-outline" label="Need Patience" color="#4DB6AC" />
          </View>
        </View>
      )}

      {activeTab === "Topics" && (
        <Text style={styles.placeholder}>
          Topics list (Patience, Gratitude…)
        </Text>
      )}

      {activeTab === "Saved" && (
        <Text style={styles.placeholder}>
          Saved verses & hadith
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  placeholder: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 14,
    color: "#333",
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});