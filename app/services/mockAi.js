export const getMockDailyRecommendation = ({ selectedMood, selectedTopic }) => {
  // default
  let data = {
    type: "QURAN",
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translation: "Indeed, Allah is with those who are patient.",
    reference: "Surah Al-Baqarah • 2:153",
  };

  if (selectedMood === "Sad" || selectedTopic === "Patience") {
    data = {
      type: "QURAN",
      arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
      translation: "Indeed, with hardship comes ease.",
      reference: "Surah Ash-Sharh • 94:6",
    };
  }

  if (selectedMood === "Grateful") {
    data = {
      type: "QURAN",
      arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
      translation: "If you are grateful, I will surely increase you.",
      reference: "Surah Ibrahim • 14:7",
    };
  }

  if (selectedTopic === "Charity") {
    data = {
      type: "HADITH",
      arabic: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ",
      translation: "Charity does not decrease wealth.",
      reference: "Sahih Muslim • 2588",
    };
  }

  return data;
};
