// screens/ServiceSelectionScreen.js
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";

export default function ServiceSelectionScreen({ navigation }) {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { id: "1", name: "Nikah" },
    { id: "2", name: "Janazah" },
    { id: "3", name: "Gusl" },
    { id: "4", name: "Dars / Lecture" },
    { id: "5", name: "Khatam / Quran Khani" },
    { id: "6", name: "Quran Taleem" },
  ];

  const handleNext = () => {
    if (!selectedService) {
      Alert.alert("Selection Required", "Please select a service.");
      return;
    }

    navigation.navigate("ServiceRequestForm", {
      service: selectedService,
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedService === item.name;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && styles.selectedCard,
        ]}
        onPress={() => setSelectedService(item.name)}
      >
        <Text
          style={[
            styles.cardText,
            isSelected && styles.selectedText,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Service</Text>
      <Text style={styles.subtitle}>
        Choose the service you want to request
      </Text>

      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
    textAlign: "center",
  },
  card: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  selectedCard: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  cardText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },
  button: {
    width: "100%",
    height: 45,
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
