import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import PredictiveAlertCard from '@/app/components/charts/PredictiveAlertCard';
import AttendanceChart from '@/app/components/charts/AttendaceChart';
import DonationExpenseChart from '@/app/components/charts/DonationVsExpense';
import VolunteerStatsChart from '@/app/components/charts/volunteerStats';

export default function ReportsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* ✅ Updated Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        
      </View>

      <PredictiveAlertCard />
      
      <View style={styles.chartCard}>
        <Text style={styles.title}>Attendance Overview</Text>
        <AttendanceChart />
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.title}>Donation vs Expense</Text>
        <DonationExpenseChart />
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.title}>Volunteer Stats</Text>
        <VolunteerStatsChart />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },

  // ✅ Navy Blue Header Styles
  headerContainer: {
    backgroundColor: '#129696',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#E5E7EB',
    textAlign: 'center',
  },

  chartCard: { marginBottom: 20, backgroundColor: '#f5f5f5', borderRadius: 12, padding: 12 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
});
