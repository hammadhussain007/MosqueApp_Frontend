import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome5 } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width - 32;

export default function FinancialOverview() {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const labels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const donations = [12000, 13500, 14000, 15500, 15000, 18000, 17500, 16000, 19000, 20000, 21000, 23000];
  const expenses = [9000, 9500, 9800, 9700, 11000, 11800, 12000, 12500, 13000, 13500, 13800, 14500];

  const data = {
    labels,
    datasets: [
      {
        data: donations,
        color: () => '#001F3F', // Navy blue for Donations
        strokeWidth: 2,
      },
      {
        data: expenses,
        color: () => '#EF4444', // Red for Expenses
        strokeWidth: 2,
      },
    ],
    legend: ['Donations', 'Expenses'],
  };

  const totalDonations = donations.reduce((a, b) => a + b, 0);
  const totalExpenses = expenses.reduce((a, b) => a + b, 0);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <FontAwesome5 name="dollar-sign" size={18} color="#001F3F" />
        <Text style={styles.headerTitle}> Financial Overview</Text>
      </View>
      <Text style={styles.subHeader}>Donations vs Expenses (Last 12 Months)</Text>

      {/* Summary Boxes */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total Donations</Text>
          <Text style={[styles.summaryValue, { color: '#001F3F' }]}>
            ₨{totalDonations.toLocaleString()}
          </Text>
        </View>
        <View style={[styles.summaryBox, styles.summaryBoxRight]}>
          <Text style={styles.summaryLabel}>Total Expenses</Text>
          <Text style={[styles.summaryValue, { color: '#EF4444' }]}>
            ₨{totalExpenses.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Line Chart */}
      <LineChart
        data={data}
        width={screenWidth}
        height={260}
        yAxisLabel="₨"
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => '#4B5563',
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#fff',
          },
        }}
        bezier
        style={styles.chart}
        onDataPointClick={({ index }) => {
          setSelectedMonth({
            month: labels[index],
            donation: donations[index],
            expense: expenses[index],
          });
        }}
      />

      {/* Interactive Tooltip */}
      {selectedMonth && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipTitle}>{selectedMonth.month}</Text>
          <Text style={styles.tooltipText}>
            Donations:{' '}
            <Text style={{ color: '#001F3F' }}>
              ₨{selectedMonth.donation.toLocaleString()}
            </Text>
          </Text>
          <Text style={styles.tooltipText}>
            Expenses:{' '}
            <Text style={{ color: '#EF4444' }}>
              ₨{selectedMonth.expense.toLocaleString()}
            </Text>
          </Text>
          <TouchableOpacity onPress={() => setSelectedMonth(null)}>
            <Text style={styles.closeBtn}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerTitle: {
    color: '#001F3F', // ✅ Navy Blue header
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 6,
  },
  subHeader: {
    color: '#6B7280',
    fontSize: 13,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 14,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryBoxRight: {
    marginRight: 0,
  },
  summaryLabel: {
    color: '#4B5563',
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  chart: {
    borderRadius: 10,
  },
  tooltip: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 14,
    marginTop: 16,
  },
  tooltipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  tooltipText: {
    fontSize: 14,
    color: '#374151',
  },
  closeBtn: {
    color: '#3B82F6',
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'right',
  },
});
