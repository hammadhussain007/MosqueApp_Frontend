import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function VolunteerStatsChart() {
  const [selected, setSelected] = useState(null);

  // 🧭 Unified Volunteer Data
  const volunteerData = [
    { id: 1, name: 'Food Drive', volunteers: 45, color: '#2563EB' },     // Blue
    { id: 2, name: 'Cleaning', volunteers: 32, color: '#10B981' },      // Green
    { id: 3, name: 'Teaching', volunteers: 28, color: '#F59E0B' },      // Yellow
    { id: 4, name: 'Events', volunteers: 56, color: '#8B5CF6' },        // Purple
    { id: 5, name: 'Fundraising', volunteers: 38, color: '#EF4444' },   // Red
  ];

  const totalVolunteers = volunteerData.reduce((a, b) => a + b.volunteers, 0);

  // 🥧 Format for PieChart
  const pieData = volunteerData.map((item, index) => ({
    name: item.name,
    population: item.volunteers,
    color: selected === index ? '#001F3F' : item.color, // dark navy highlight
    legendFontColor: '#4B5563',
    legendFontSize: 13,
  }));

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="people-outline" size={20} color="#001F3F" />
        <Text style={styles.title}> Volunteer Statistics</Text>
      </View>
      <Text style={styles.subtitle}>Volunteer distribution by activity</Text>

      {/* Pie Chart */}
      <PieChart
        data={pieData}
        width={screenWidth - 40}
        height={240}
        chartConfig={{
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          color: () => '#000',
          decimalPlaces: 0,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        onDataPointClick={({ index }) =>
          setSelected(selected === index ? null : index)
        }
      />

      {/* Info Box */}
      {selected !== null && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>
            {volunteerData[selected].name}
          </Text>
          <Text style={styles.infoText}>
            {volunteerData[selected].volunteers} volunteers (
            {Math.round(
              (volunteerData[selected].volunteers / totalVolunteers) * 100
            )}
            % of total)
          </Text>
        </View>
      )}

      {/* Detailed Breakdown List */}
      <Text style={styles.sectionTitle}>Detailed Breakdown</Text>
      <FlatList
        data={volunteerData}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.row,
              selected === volunteerData.indexOf(item) && styles.activeRow,
            ]}
            activeOpacity={0.7}
            onPress={() =>
              setSelected(selected === volunteerData.indexOf(item) ? null : volunteerData.indexOf(item))
            }
          >
            <View style={styles.left}>
              <View style={[styles.dot, { backgroundColor: item.color }]} />
              <Text style={styles.label}>{item.name}</Text>
            </View>
            <Text style={styles.value}>{item.volunteers}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Volunteers</Text>
        <Text style={styles.totalValue}>{totalVolunteers}</Text>
      </View>
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
    shadowRadius: 5,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#001F3F',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#001F3F',
  },
  infoText: {
    fontSize: 13,
    color: '#4B5563',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#001F3F',
    marginTop: 16,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeRow: {
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#001F3F',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#001F3F',
  },
});