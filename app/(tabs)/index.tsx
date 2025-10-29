// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  // 👇 This opens your tabs layout where the first tab = Community
  return <Redirect href="/(tabs)" />;
}
