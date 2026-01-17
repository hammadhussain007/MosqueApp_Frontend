export const buildDailyPrompt = ({ selectedMood, selectedTopic }) => {
  let prompt = "Give one Quran verse and one Hadith";

  if (selectedMood) {
    prompt += ` for a person who is feeling ${selectedMood}`;
  }

  if (selectedTopic) {
    prompt += ` related to the topic of ${selectedTopic}`;
  }

  prompt +=
    ". Include Arabic text, English translation, and reference. Keep it short and authentic.";

  return prompt;
};