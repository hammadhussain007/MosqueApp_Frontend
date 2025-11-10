import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, FlatList, Animated } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function VolunteerStatsChart() {
  const [selected, setSelected] = useState<number | null>(null);
  const [insight, setInsight] = useState('Fetching data...');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const volunteerData = [
    { id: 1, name: 'Food Drive', volunteers: 45, color: '#2563EB' },
    { id: 2, name: 'Cleaning', volunteers: 32, color: '#10B981' },
    { id: 3, name: 'Teaching', volunteers: 28, color: '#F59E0B' },
    { id: 4, name: 'Events', volunteers: 56, color: '#8B5CF6' },
    { id: 5, name: 'Fundraising', volunteers: 38, color: '#EF4444' },
  ];

  const totalVolunteers = volunteerData.reduce((a, b) => a + b.volunteers, 0);

  // Simulate fetching insight from DB
  useEffect(() => {
    const timer = setTimeout(() => {
      const maxVolunteers = Math.max(...volunteerData.map(d => d.volunteers));
      const highestActivity = volunteerData.find(d => d.volunteers === maxVolunteers);
      if (highestActivity) {
        setInsight(`${highestActivity.name} has the highest volunteers!`);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (index: number) => {
    if (selected === index) {
      setSelected(null);
    } else {
      setSelected(index);
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.05, duration: 150, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    }
  };

  const pieData = volunteerData.map((item, index) => ({
    name: item.name,
    population: item.volunteers,
    color: item.color,
    legendFontColor: '#4B5563',
    legendFontSize: 0,
  }));

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#129696' }]}>
        <Ionicons name="people-outline" size={20} color="#FFFFFF" />
        <Text style={[styles.title, { color: '#FFFFFF' }]}> Volunteer Statistics</Text>
      </View>
      <Text style={styles.subtitle}>Volunteer distribution by activity</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        {/* Animated Pie Chart */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <PieChart
            data={pieData}
            width={screenWidth - 200} // reduce width to bring insight closer
            height={240}
            chartConfig={{
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              color: () => '#000',
              decimalPlaces: 0,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="0"
            absolute
            hasLegend={false}
          />
        </Animated.View>

        {/* Insight Box */}
        <View style={[styles.insightBox, { alignSelf: 'center', marginLeft: 5 }]}>
          <Text style={styles.insightText}>{insight}</Text>
        </View>
      </View>

      {/* Info Box */}
      {selected !== null && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>{volunteerData[selected].name}</Text>
          <Text style={styles.infoText}>
            {volunteerData[selected].volunteers} volunteers (
            {((volunteerData[selected].volunteers / totalVolunteers) * 100).toFixed(1)}%)
          </Text>
          <Text style={styles.infoText}>
            Contribution: {((volunteerData[selected].volunteers / totalVolunteers) * 100).toFixed(1)}%
          </Text>
        </View>
      )}

      {/* Detailed Breakdown List */}
      <Text style={styles.sectionTitle}>Detailed Breakdown</Text>
      <FlatList
        data={volunteerData}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[styles.row, selected === index && styles.activeRow]}
            activeOpacity={0.7}
            onPress={() => handleSelect(index)}
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
    padding: 10,
    borderRadius: 10,
  },
  title: { fontSize: 18, fontWeight: '700', marginLeft: 6 },
  subtitle: { fontSize: 13, color: '#6B7280', marginBottom: 10 },
  infoBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    marginTop: 10,
  },
  infoTitle: { fontSize: 15, fontWeight: '700', color: '#001F3F' },
  infoText: { fontSize: 13, color: '#4B5563' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#001F3F', marginTop: 16, marginBottom: 6 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeRow: { backgroundColor: '#F3F4F6', borderRadius: 6 },
  left: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  label: { fontSize: 14, color: '#374151', fontWeight: '500' },
  value: { fontSize: 14, fontWeight: '600', color: '#001F3F' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  totalLabel: { fontSize: 15, fontWeight: '700', color: '#111827' },
  totalValue: { fontSize: 15, fontWeight: '700', color: '#001F3F' },
  insightBox: {
    width: 120,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },
  insightText: { fontSize: 14, color: '#001F3F', fontWeight: '600' },
});
