import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMood: null,
  selectedTopic: null,
  savedVerses: [], // ⭐ NEW
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    addMood: (state, action) => {
      state.selectedMood = action.payload;
      console.log("Mood saved in Redux:", action.payload);
    },

    addTopic: (state, action) => {
      state.selectedTopic = action.payload;
      console.log("Topic saved in Redux:", action.payload);
    },

    saveVerse: (state, action) => {
      const alreadySaved = state.savedVerses.find(
        (v) => v.reference === action.payload.reference
      );

      if (!alreadySaved) {
        state.savedVerses.push(action.payload);
      }
    },

    removeVerse: (state, action) => {
      state.savedVerses = state.savedVerses.filter(
        (v) => v.reference !== action.payload
      );
    },
  },
});

export const {
  addMood,
  addTopic,
  saveVerse,
  removeVerse,
} = activitySlice.actions;

export default activitySlice.reducer;