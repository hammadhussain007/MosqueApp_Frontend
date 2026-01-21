// app/screens/ImamBookingAndScheduling/ImamDetailScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function ImamDetailScreen({ navigation, route }) {
  const { imam, serviceName } = route.params || {};

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '☆'.repeat(emptyStars);
  };

  if (!imam) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Imam Details</Text>
        <Text>No imam data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Imam Details</Text>
      <Text style={styles.subtitle}>Service: {serviceName}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("BookingStatus", {
            imam,
            serviceName,
          })
        }
      >
        <Text style={styles.buttonText}>Select Imam</Text>
      </TouchableOpacity>

      <View style={styles.detailCard}>
        <Text style={styles.detailTitle}>Name:</Text>
        <Text style={styles.detailText}>{imam.name}</Text>

        <Text style={styles.detailTitle}>Experience:</Text>
        <Text style={styles.detailText}>{imam.experience}</Text>

        <Text style={styles.detailTitle}>Feedback:</Text>
        {imam.feedback.map((fb, index) => (
          <Text key={index} style={styles.feedbackText}>- {fb}</Text>
        ))}

        <Text style={styles.detailTitle}>Rating:</Text>
        <Text style={styles.detailText}>
          {renderStars(imam.rating)} ({imam.rating} / 5)
        </Text>

        <Text style={styles.detailTitle}>Phone Number:</Text>
        <View style={styles.phoneContainer}>
          <Text style={styles.detailText}>{imam.phone}</Text>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => Linking.openURL(`tel:${imam.phone}`)}
          >
            <Icon name="call" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.detailTitle}>Address:</Text>
        <Text style={styles.detailText}>{imam.address}</Text>

        <Text style={styles.detailTitle}>Masjid:</Text>
        <Text style={styles.detailText}>{imam.masjid}</Text>

        <Text style={styles.detailTitle}>Distance:</Text>
        <Text style={styles.detailText}>{imam.distance}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100, // Ensure button is visible
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginTop: 10,
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    marginLeft: 10,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  callButton: {
    marginLeft: 10,
  },
  button: {
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
