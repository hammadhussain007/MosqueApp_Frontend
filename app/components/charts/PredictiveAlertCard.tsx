// ReportsAnalytics.js
import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

interface CardData {
  id: number;
  icon: React.JSX.Element;
  title: string;
  description: string;
}

export default function ReportsAnalytics() {
  const scaleAnimRefs = [useRef(new Animated.Value(1)).current, useRef(new Animated.Value(1)).current, useRef(new Animated.Value(1)).current];

  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data from database
  useEffect(() => {
    const timer = setTimeout(() => {
      setCardsData([
        {
          id: 0,
          icon: <Ionicons name="warning-outline" size={24} color="#F59E0B" />,
          title: "Low Prayer Mat Inventory",
          description: "Prayer mats will run out in 5 days at the current usage rate.",
        },
        {
          id: 1,
          icon: <MaterialIcons name="show-chart" size={24} color="#3B82F6" />,
          title: "Peak Attendance Alert",
          description: "Friday attendance expected to increase by 15% this week.",
        },
        {
          id: 2,
          icon: <FontAwesome5 name="users" size={22} color="#7C3AED" />,
          title: "Volunteer Shortage",
          description: "Need 8 more volunteers for the upcoming community event.",
        },
      ]);
      setLoading(false);
    }, 1200); // simulate 1.2 second delay

    return () => clearTimeout(timer);
  }, []);

  const handlePressIn = (index: number) => {
    Animated.spring(scaleAnimRefs[index], {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index: number) => {
    Animated.spring(scaleAnimRefs[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={[styles.headerContainer, { backgroundColor: '#129696' }]}>
          <Text style={styles.header}>Reports & Analytics</Text>
          <Text style={styles.subHeader}>
            Track attendance, finances, and volunteers
          </Text>
        </View>

        {/* Alerts & Predictions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alerts & Predictions</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#129696" style={{ marginTop: 30 }} />
          ) : (
            cardsData.map((card, index) => (
              <TouchableWithoutFeedback
                key={card.id}
                onPressIn={() => handlePressIn(index)}
                onPressOut={() => handlePressOut(index)}
              >
                <Animated.View style={[styles.card, { transform: [{ scale: scaleAnimRefs[index] }], width: screenWidth - 40 }]}>
                  <View style={styles.cardIcon}>{card.icon}</View>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{card.title}</Text>
                    <Text style={styles.cardDescription}>{card.description}</Text>
                  </View>
                </Animated.View>
              </TouchableWithoutFeedback>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 16,
  },
  headerContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#001F3F',
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'left',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#001F3F',
    fontSize: 15,
    fontWeight: '600',
  },
  cardDescription: {
    color: '#4B5563',
    fontSize: 13,
    marginTop: 3,
  },
});
