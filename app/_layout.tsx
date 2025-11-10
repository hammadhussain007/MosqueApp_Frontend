// app/layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Redirect } from 'expo-router';

const isLoggedIn = true; 

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
     
      <Stack screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="(tabs)" />

        
        {!isLoggedIn && <Redirect href="/login" />}
        {isLoggedIn && <Redirect href="/(tabs)/community" />}
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
