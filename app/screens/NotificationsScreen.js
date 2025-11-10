import React, { useEffect, useState, useCallback } from 'react';
import { View, RefreshControl, StyleSheet, StatusBar } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { List, Text, ActivityIndicator, Divider, Avatar, Card } from 'react-native-paper';

import { notificationService } from '../services/api';
import { theme } from '../core/theme';

export default function NotificationsScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const res = await notificationService.getNotifications({ sinceDays: 30, limit: 50 });
      setItems(res.items || []);
    } catch (e) {
      setError(e.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderItem = ({ item }) => {
    const isForumComment = item.type === 'forum_comment';
    const iconName = isForumComment ? 'comment-text-outline' : 'bullhorn-outline';
    const iconBg = isForumComment ? theme.colors.primary + '15' : theme.colors.accent + '15';
    const iconColor = isForumComment ? theme.colors.primary : theme.colors.accent;

    return (
      <Card style={styles.notificationCard} mode="elevated">
        <Card.Content style={styles.cardContent}>
          <Avatar.Icon
            size={44}
            icon={iconName}
            style={[styles.icon, { backgroundColor: iconBg }]}
            color={iconColor}
          />
          <View style={styles.textContent}>
            <Text style={styles.message} numberOfLines={2}>
              {item.message}
            </Text>
            <Text style={styles.time}>{formatTime(item.createdAt)}</Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Activity</Text>
      <Text style={styles.subtitle}>Stay updated with your community</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Avatar.Icon
        size={80}
        icon="bell-outline"
        style={styles.emptyIcon}
        color={theme.colors.primary}
      />
      <Text style={styles.emptyTitle}>No Activity Yet</Text>
      <Text style={styles.emptyText}>
        When someone interacts with your posts or new announcements are made, you'll see them here.
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
        {renderHeader()}
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </View>
    );
  }

  if (error && !refreshing) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
        {renderHeader()}
        <View style={styles.center}>
          <Avatar.Icon
            size={64}
            icon="alert-circle-outline"
            style={{ backgroundColor: theme.colors.error + '15' }}
            color={theme.colors.error}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <FlatList
        data={items}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    ...theme.shadows.small,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  notificationCard: {
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.sm,
    borderRadius: theme.roundness.medium,
    backgroundColor: theme.colors.surface,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  textContent: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: theme.spacing.xs,
  },
  time: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl * 2,
    paddingHorizontal: theme.spacing.xl,
  },
  emptyIcon: {
    backgroundColor: theme.colors.primary + '15',
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  errorText: {
    fontSize: 14,
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
});
