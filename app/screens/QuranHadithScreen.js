import React, { useState, useMemo } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { addMood, addTopic } from "../store/slices/activitySlice";
import { buildDailyPrompt } from "../services/aiPrompt";
import { getMockDailyRecommendation } from "../services/mockAi";

import VerseCard from "../components/quranHadith/VerseCard";
import TabSwitch from "../components/quranHadith/TabSwitch";
import MoodCard from "../components/quranHadith/MoodCard";
import TopicCard from "../components/quranHadith/TopicCard";

export default function QuranHadithScreen() {
  const [activeTab, setActiveTab] = useState("Daily");

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const activity = useSelector((state) => state.activity);

  // 🔹 AI prompt (for later real AI)
  const aiPrompt = buildDailyPrompt(activity);
  console.log("🤖 AI PROMPT:", aiPrompt);

  // 🔹 MOCK DAILY VERSE
  const dailyRecommendation = useMemo(() => {
    return getMockDailyRecommendation({
      selectedMood: activity.selectedMood,
      selectedTopic: activity.selectedTopic,
    });
  }, [activity.selectedMood, activity.selectedTopic]);

  // ✅ CLEAN & SAFE
  const handleTopicPress = (topicKey, topicLabel) => {
    dispatch(addTopic(topicKey));
    navigation.navigate("TopicDetail", {
      topicKey,
      topicLabel,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Tabs */}
      <TabSwitch active={activeTab} setActive={setActiveTab} />

      {/* DAILY */}
      {activeTab === "Daily" && (
        <VerseCard
          type={dailyRecommendation.type}
          arabic={dailyRecommendation.arabic}
          translation={dailyRecommendation.translation}
          reference={dailyRecommendation.reference}
        />
      )}

      {/* BY MOOD */}
      {activeTab === "By Mood" && (
        <View>
          <Text style={styles.sectionTitle}>
            How are you feeling today?
          </Text>

          <View style={styles.moodGrid}>
            <MoodCard icon="alert-circle-outline" label="Anxious" color="#E57373"
              onPress={() => dispatch(addMood("Anxious"))}
            />
            <MoodCard icon="emoticon-sad-outline" label="Sad" color="#64B5F6"
              onPress={() => dispatch(addMood("Sad"))}
            />
            <MoodCard icon="heart-outline" label="Grateful" color="#81C784"
              onPress={() => dispatch(addMood("Grateful"))}
            />
            <MoodCard icon="flash-outline" label="Motivated" color="#FFB74D"
              onPress={() => dispatch(addMood("Motivated"))}
            />
            <MoodCard icon="account-outline" label="Lonely" color="#9575CD"
              onPress={() => dispatch(addMood("Lonely"))}
            />
            <MoodCard icon="clock-outline" label="Need Patience" color="#4DB6AC"
              onPress={() => dispatch(addMood("Need Patience"))}
            />
          </View>
        </View>
      )}

      {/* TOPICS */}
      {activeTab === "Topics" && (
        <View style={styles.topicsGrid}>
          <TopicCard
            title="Patience (Sabr)"
            count={45}
            onPress={() =>
              handleTopicPress("Patience", "Patience (Sabr)")
            }
          />
          <TopicCard
            title="Gratitude (Shukr)"
            count={38}
            onPress={() =>
              handleTopicPress("Gratitude", "Gratitude (Shukr)")
            }
          />
          <TopicCard
            title="Trust in Allah"
            count={52}
            onPress={() =>
              handleTopicPress("Trust in Allah", "Trust in Allah")
            }
          />
          <TopicCard
            title="Forgiveness"
            count={34}
            onPress={() =>
              handleTopicPress("Forgiveness", "Forgiveness")
            }
          />
          <TopicCard
            title="Family"
            count={29}
            onPress={() =>
              handleTopicPress("Family", "Family")
            }
          />
          <TopicCard
            title="Charity"
            count={41}
            onPress={() =>
              handleTopicPress("Charity", "Charity")
            }
          />
          <TopicCard
            title="Prayer"
            count={67}
            onPress={() =>
              handleTopicPress("Prayer", "Prayer")
            }
          />
          <TopicCard
            title="Sincerity"
            count={23}
            onPress={() =>
              handleTopicPress("Sincerity", "Sincerity")
            }
          />
        </View>
      )}

      {activeTab === "Saved" && (
        <View>
          {activity.savedVerses.length === 0 ? (
            <Text style={styles.placeholder}>
              No saved verses yet
            </Text>
          ) : (
            activity.savedVerses.map((verse, index) => (
              <VerseCard
                key={index}
                type={verse.type}
                arabic={verse.arabic}
                translation={verse.translation}
                reference={verse.reference}
              />
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
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
  topicsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  placeholder: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
});
