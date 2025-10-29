import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import AttendanceChart from '../components/charts/AttendanceChart';
import DonationVsExpenseChart from '../components/charts/DonationVsExpenseChart';
import VolunteerStatsChart from '../components/charts/VolunteerStatsChart';
import PredictiveAlertCard from '../components/charts/PredictiveAlertCard'; 

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Text style={styles.pageTitle}>📊 Dashboard Analytics</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Attendance Overview</Text>
          <AttendanceChart />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Donations vs Expenses</Text>
          <DonationVsExpenseChart />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Volunteer Statistics</Text>
          <VolunteerStatsChart />
        </View>

        
        <PredictiveAlertCard />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  scrollContainer: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
});
