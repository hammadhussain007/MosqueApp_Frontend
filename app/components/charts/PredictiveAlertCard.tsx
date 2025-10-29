import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PredictiveAlertCard() {
  return (
    <View style={[styles.card, styles.alertCard]}>
      <Text style={styles.cardTitle}>🤖 AI Predictive Alerts</Text>

      <Text style={styles.alertText}>
         Supplies may run out in <Text style={styles.highlight}>5 days</Text>. 
        Consider scheduling a restock soon.
      </Text>

      <Text style={styles.alertText}>
         Donation trends indicate a <Text style={styles.highlight}>12% decrease</Text> this week. 
        Plan a reminder campaign.
      </Text>

      <Text style={styles.alertText}>
         Volunteer attendance expected to <Text style={styles.highlight}>rise by 8%</Text> next Friday.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  alertCard: {
    backgroundColor: '#eef7ff',
    borderLeftWidth: 4,
    borderLeftColor: '#007aff',
  },
  alertText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  highlight: {
    fontWeight: '700',
    color: '#007aff',
  },
});
