// app/(tabs)/quran-hadith/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function QuranHadithLayout() {
  // headerShown:false so our screens control their own headers / spacing
  return <Stack screenOptions={{ headerShown: false }} />;
}