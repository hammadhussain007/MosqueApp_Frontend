import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function AttendanceChart() {
  const data = {
    labels: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
    datasets: [{ data: [18, 27, 21, 23, 19] }],
  };

  return (
    <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Attendance Overview</Text>
      <BarChart
        data={data}
        width={screenWidth - 40}
        height={220}
        fromZero
        showValuesOnTopOfBars
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: () => 'rgba(52, 120, 246, 1)',
          labelColor: () => 'rgba(0, 0, 0, 0.7)',
          barPercentage: 0.6,
        }}
        style={{ marginTop: 10, borderRadius: 8 }}
      />
    </View>
  );
}
