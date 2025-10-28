import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function VolunteerStatsChart() {
  const data = [
    {
      name: 'Active',
      population: 60,
      color: 'rgba(54, 162, 235, 1)',
      legendFontColor: '#333',
      legendFontSize: 13,
    },
    {
      name: 'Inactive',
      population: 25,
      color: 'rgba(255, 99, 132, 1)',
      legendFontColor: '#333',
      legendFontSize: 13,
    },
    {
      name: 'Event-based',
      population: 15,
      color: 'rgba(255, 206, 86, 1)',
      legendFontColor: '#333',
      legendFontSize: 13,
    },
  ];

  return (
    <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Volunteer Statistics</Text>
      <PieChart
        data={data}
        width={screenWidth - 40}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: () => '#000',
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}
