import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import AttendanceChart from '../components/AttendanceChart';
import DonationVsExpenseChart from '../components/DonationVsExpenseChart';
import VolunteerStatsChart from '../components/VolunteerStatsChart';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f7fb' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View>
          <AttendanceChart />
          <DonationVsExpenseChart />
          <VolunteerStatsChart />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
