import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title, Paragraph, Text } from "react-native-paper";
import { theme } from "../core/theme";

export default function Announcement({ item }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>{item.title}</Title>
        <View style={styles.meta}>
          <Text style={styles.author}>By {item.author?.fullName || 'Admin'}</Text>
          <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
        <Paragraph style={styles.content}>{item.content}</Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({ 
  card: { 
    marginBottom: 12,
    elevation: 2,
    borderRadius: 8
  },
  title: { 
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold'
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 8
  },
  author: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600'
  },
  date: {
    fontSize: 12,
    color: '#999'
  },
  content: {
    fontSize: 14,
    lineHeight: 20
  }
});
