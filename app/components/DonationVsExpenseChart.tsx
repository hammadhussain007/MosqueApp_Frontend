import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function DonationVsExpenseChart() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      { data: [21000, 23000, 25000, 28000], color: () => 'rgba(54, 162, 235, 1)' }, // Donations
      { data: [13000, 15000, 17000, 18000], color: () => 'rgba(255, 99, 132, 1)' }, // Expenses
    ],
    legend: ['Donations', 'Expenses'],
  };

  return (
    <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Donation vs Expense</Text>
      <BarChart
        data={data}
        width={screenWidth - 40}
        height={230}
        fromZero
        showBarTops
        yAxisLabel="Rs "
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => 'rgba(0, 0, 0, 0.7)',
          barPercentage: 0.5,
        }}
        style={{ marginTop: 10, borderRadius: 8 }}
      />
    </View>
  );
}
