import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import PredictiveAlertCard from '@/app/components/charts/PredictiveAlertCard';
import AttendanceChart from '@/app/components/charts/AttendaceChart';
import DonationExpenseChart from '@/app/components/charts/DonationVsExpense';
import VolunteerStatsChart from '@/app/components/charts/volunteerStats';

export default function ReportsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}> Admin Dashboard</Text>
      
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
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  chartCard: { marginBottom: 20, backgroundColor: '#f5f5f5', borderRadius: 12, padding: 12 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
});
