import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

import { topicVerses } from "../data/topicVerses";
import VerseCard from "../components/quranHadith/VerseCard";
import BackHeader from "../components/common/BackHeader";

export default function TopicDetailScreen() {
  const route = useRoute();
  const { topicKey, topicLabel } = route.params;

  const verses = topicVerses[topicKey];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* 🔙 BACK HEADER */}
      <BackHeader title={topicLabel} />

      {/* VERSES */}
      {!verses || verses.length === 0 ? (
        <Text style={styles.empty}>No verse found</Text>
      ) : (
        verses.map((item, index) => (
          <VerseCard
            key={index}
            type={item.type}
            arabic={item.arabic}
            translation={item.translation}
            reference={item.reference}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
});