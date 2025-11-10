import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.headerTitle}>
          Mosque App
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Welcome to your community hub
        </ThemedText>
      </ThemedView>

      <View style={styles.content}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Quick Access
        </ThemedText>
        <ThemedText>
          Navigate through the tabs below to access different features of the app.
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    marginBottom: 8,
  },
  headerSubtitle: {
    opacity: 0.7,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 12,
  },
});
