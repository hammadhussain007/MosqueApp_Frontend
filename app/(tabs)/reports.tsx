import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import AttendanceChart from '@/components/AttendanceChart';
import DonationExpenseChart from '@/components/DonationExpenseChart';
import VolunteerStatsChart from '@/components/VolunteerStatsChart';

export default function ReportsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}> Masjid Reports Dashboard</Text>

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
