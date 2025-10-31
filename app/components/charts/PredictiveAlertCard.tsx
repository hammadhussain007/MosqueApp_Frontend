// ReportsAnalytics.js
import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function ReportsAnalytics() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <Text style={styles.header}>Reports & Analytics</Text>
        <Text style={styles.subHeader}>
          Track attendance, finances, and volunteers
        </Text>

        {/* Alerts & Predictions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alerts & Predictions</Text>

          {/* Low Prayer Mat Inventory */}
          <View style={styles.card}>
            <View style={styles.cardIcon}>
              <Ionicons name="warning-outline" size={24} color="#F59E0B" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Low Prayer Mat Inventory</Text>
              <Text style={styles.cardDescription}>
                Prayer mats will run out in 5 days at the current usage rate.
              </Text>
            </View>
          </View>

          {/* Peak Attendance Alert */}
          <View style={styles.card}>
            <View style={styles.cardIcon}>
              <MaterialIcons name="show-chart" size={24} color="#3B82F6" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Peak Attendance Alert</Text>
              <Text style={styles.cardDescription}>
                Friday attendance expected to increase by 15% this week.
              </Text>
            </View>
          </View>

          {/* Volunteer Shortage */}
          <View style={styles.card}>
            <View style={styles.cardIcon}>
              <FontAwesome5 name="users" size={22} color="#7C3AED" />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Volunteer Shortage</Text>
              <Text style={styles.cardDescription}>
                Need 8 more volunteers for the upcoming community event.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    color: '#001F3F',
    fontWeight: '700',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#001F3F',
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'left', // ✅ changed from 'center' to 'left'
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#001F3F',
    fontSize: 15,
    fontWeight: '600',
  },
  cardDescription: {
    color: '#4B5563',
    fontSize: 13,
    marginTop: 3,
  },
});
