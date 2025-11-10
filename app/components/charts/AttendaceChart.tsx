import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function AttendanceChart() {
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const chartData = {
    daily: {
      labels: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
      datasets: [{ data: [70, 85, 75, 90, 88], color: () => '#129696' }],
      legend: ['Today Attendance'],
    },
    weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        { data: [350, 420, 390, 450, 500, 470, 440], color: () => '#129696' },
        { data: [300, 370, 340, 410, 460, 430, 400], color: () => '#3B82F6' },
        { data: [340, 410, 370, 440, 490, 460, 430], color: () => '#7C3AED' },
      ],
      legend: ['Fajr', 'Asr', 'Isha'],
    },
    monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        { data: [2200, 2400, 2300, 2500], color: () => '#129696' },
        { data: [1800, 2000, 1950, 2100], color: () => '#3B82F6' },
      ],
      legend: ['Men', 'Women'],
    },
  };

  const currentData = chartData[view];

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="calendar-outline" size={20} color="#129696" />
        <Text style={styles.title}> Prayer Attendance Overview</Text>
      </View>

      {/* View Switcher */}
      <View style={styles.switcher}>
        {(['daily', 'weekly', 'monthly'] as const).map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setView(type)}
            style={[styles.tab, view === type && styles.activeTab]}
          >
            <Text style={[styles.tabText, view === type && styles.activeTabText]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chart */}
      <BarChart
        data={currentData}
        width={screenWidth - 40}
        height={260}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        showValuesOnTopOfBars={false}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(18, 150, 150, ${opacity})`, // changed to #129696
          labelColor: () => '#4B5563',
          barPercentage: 0.6,
        }}
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#129696', // changed from navy blue
  },
  switcher: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#129696', // changed from navy blue
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4B5563',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  chart: {
    borderRadius: 16,
    marginTop: 10,
  },
});
