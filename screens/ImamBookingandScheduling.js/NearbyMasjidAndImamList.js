// app/screens/NearbyImamsScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const dummyImams = [
  { id: "1", name: "Imam Ahmed", masjid: "Masjid Noor", distance: "1.2 km", experience: "10 years" },
  { id: "2", name: "Imam Bilal", masjid: "Masjid Rahman", distance: "2.5 km", experience: "7 years" },
  { id: "3", name: "Imam Usman", masjid: "Masjid Huda", distance: "3.1 km", experience: "12 years" },
  { id: "4", name: "Imam Salman", masjid: "Masjid Al-Falah", distance: "0.8 km", experience: "5 years" },
  { id: "5", name: "Imam Tariq", masjid: "Masjid Al-Noor", distance: "4.0 km", experience: "8 years" },
  { id: "6", name: "Imam Zaid", masjid: "Masjid Al-Rahim", distance: "2.2 km", experience: "6 years" },
  { id: "7", name: "Imam Yaseen", masjid: "Masjid Al-Huda", distance: "3.5 km", experience: "9 years" },
  { id: "8", name: "Imam Farhan", masjid: "Masjid Al-Salam", distance: "1.5 km", experience: "11 years" },
];

export default function NearbyImamsScreen({ navigation, route }) {
  const { serviceName } = route.params || {};

  const renderImam = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.text}>Masjid: {item.masjid}</Text>
      <Text style={styles.text}>Distance: {item.distance}</Text>

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
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Imams</Text>

      <FlatList
        data={dummyImams}
        keyExtractor={(item) => item.id}
        renderItem={renderImam}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#222",
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
});
