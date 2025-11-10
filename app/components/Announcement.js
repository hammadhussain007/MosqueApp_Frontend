import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Avatar, Chip } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from "../core/theme";

export default function Announcement({ item }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card style={styles.card} mode="elevated">
      <LinearGradient
        colors={[theme.colors.accent + '15', theme.colors.accent + '05']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Card.Content>
          <View style={styles.header}>
            <Avatar.Icon
              size={40}
              icon="bullhorn"
              style={styles.icon}
              color={theme.colors.accent}
            />
            <View style={styles.headerText}>
              <Text style={styles.badge}>Official Announcement</Text>
              <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
            </View>
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>

          <View style={styles.footer}>
            <Chip
              icon="account"
              style={styles.authorChip}
              textStyle={styles.authorText}
            >
              {item.author?.fullName || 'Admin'}
            </Chip>
          </View>
        </Card.Content>
      </LinearGradient>
    </Card>
  );
}

const styles = StyleSheet.create({ 
  card: { 
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderRadius: theme.roundness.large,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  gradient: {
    borderRadius: theme.roundness.large,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  icon: {
    backgroundColor: theme.colors.accent + '25',
  },
  headerText: {
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  badge: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  title: { 
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    lineHeight: 24,
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  authorChip: {
    backgroundColor: theme.colors.surface,
    height: 28,
  },
  authorText: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.text,
  },
});
