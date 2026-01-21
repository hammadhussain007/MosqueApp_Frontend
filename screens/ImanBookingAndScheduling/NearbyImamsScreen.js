// app/screens/ImamBookingAndScheduling/NearbyImamsScreen.js
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// ✅ Updated Dummy Data (with phone numbers, feedback, rating, address)
const dummyImams = [
  {
    id: "1",
    name: "Imam Ahmed",
    masjid: "Masjid Noor",
    distance: "1.2 km",
    experience: "10 years",
    phone: "+923001234567",
    feedback: [
      "Excellent service and knowledge.",
      "Very helpful and punctual.",
      "Highly recommended for religious guidance."
    ],
    rating: 4.8,
    address: "F-10 Markaz, Islamabad, Pakistan",
  },
  {
    id: "2",
    name: "Imam Bilal",
    masjid: "Masjid Rahman",
    distance: "2.5 km",
    experience: "7 years",
    phone: "+923111234567",
    feedback: [
      "Very helpful and punctual.",
      "Great communication skills.",
      "Reliable for community events."
    ],
    rating: 4.6,
    address: "F-10/1, Islamabad, Pakistan",
  },
  {
    id: "3",
    name: "Imam Usman",
    masjid: "Masjid Huda",
    distance: "3.1 km",
    experience: "12 years",
    phone: "+923221234567",
    feedback: [
      "Great experience, highly recommended.",
      "Knowledgeable and patient.",
      "Excellent for Quran teaching."
    ],
    rating: 4.9,
    address: "F-10/2, Islamabad, Pakistan",
  },
  {
    id: "4",
    name: "Imam Salman",
    masjid: "Masjid Al-Falah",
    distance: "0.8 km",
    experience: "5 years",
    phone: "+923331234567",
    feedback: [
      "Good communication and expertise.",
      "Friendly and approachable.",
      "Good for youth programs."
    ],
    rating: 4.5,
    address: "F-10/3, Islamabad, Pakistan",
  },
  {
    id: "5",
    name: "Imam Tariq",
    masjid: "Masjid Al-Noor",
    distance: "4.0 km",
    experience: "8 years",
    phone: "+923441234567",
    feedback: [
      "Reliable and knowledgeable.",
      "Great for lectures.",
      "Punctual and dedicated."
    ],
    rating: 4.7,
    address: "F-10/4, Islamabad, Pakistan",
  },
  {
    id: "6",
    name: "Imam Zaid",
    masjid: "Masjid Al-Rahim",
    distance: "2.2 km",
    experience: "6 years",
    phone: "+923551234567",
    feedback: [
      "Friendly and professional.",
      "Good listener.",
      "Helpful in counseling."
    ],
    rating: 4.4,
    address: "F-10 Sector, Islamabad, Pakistan",
  },
  {
    id: "7",
    name: "Imam Yaseen",
    masjid: "Masjid Al-Huda",
    distance: "3.5 km",
    experience: "9 years",
    phone: "+923661234567",
    feedback: [
      "Outstanding service.",
      "Very experienced.",
      "Great community leader."
    ],
    rating: 4.8,
    address: "F-10 Main Boulevard, Islamabad, Pakistan",
  },
  {
    id: "8",
    name: "Imam Farhan",
    masjid: "Masjid Al-Salam",
    distance: "1.5 km",
    experience: "11 years",
    phone: "+923771234567",
    feedback: [
      "Very satisfied with the guidance.",
      "Excellent teaching skills.",
      "Reliable and trustworthy."
    ],
    rating: 4.9,
    address: "F-10 Park Road, Islamabad, Pakistan",
  },
  {
    id: "9",
    name: "Imam Hassan",
    masjid: "Masjid Al-Iman",
    distance: "2.8 km",
    experience: "4 years",
    phone: "+923881234567",
    feedback: [
      "Good experience overall.",
      "Eager to help.",
      "Promising young imam."
    ],
    rating: 4.3,
    address: "F-10 Commercial Area, Islamabad, Pakistan",
  },
  {
    id: "10",
    name: "Imam Omar",
    masjid: "Masjid Al-Quran",
    distance: "3.7 km",
    experience: "15 years",
    phone: "+923991234567",
    feedback: [
      "Highly experienced and helpful.",
      "Master of Islamic studies.",
      "Invaluable for the community."
    ],
    rating: 5.0,
    address: "F-10 Residential Area, Islamabad, Pakistan",
  },
];

export default function NearbyImamsScreen({ navigation, route }) {
  const { serviceName } = route.params || {};
  const flatListRef = useRef(null);

  const renderImam = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.distance}>Distance: {item.distance}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("ImamDetail", {
            imam: item,
            serviceName,
          })
        }
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nearby Imams</Text>
      <Text style={styles.subtitle}>Service: {serviceName}</Text>

      <FlatList
        ref={flatListRef}
        data={dummyImams}
        keyExtractor={(item) => item.id}
        renderItem={renderImam}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity
        style={styles.selectButton}
        onPress={() =>
          navigation.navigate("BookingStatus", {
            serviceName,
          })
        }
      >
        <Text style={styles.selectButtonText}>Select Imam</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
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
    marginBottom: 15,
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    color: "#222",
  },
  distance: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  button: {
    marginTop: 10,
    height: 40,
    backgroundColor: "#007bff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  selectButton: {
    height: 50,
    backgroundColor: "#28a745",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  selectButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  scrollButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  scrollButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
