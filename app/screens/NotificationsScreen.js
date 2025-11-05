import React, { useEffect, useState, useCallback } from 'react';
import { View, RefreshControl, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { List, Text, ActivityIndicator, Divider } from 'react-native-paper';

import { notificationService } from '../services/api';

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

  const renderItem = ({ item }) => {
    if (item.type === 'forum_comment') {
      return (
        <>
          <List.Item
            title={item.message}
            description={`${item.actor?.name || 'Someone'} • ${item.post?.title || ''}`}
            left={(props) => <List.Icon {...props} icon="message-text-outline" />}
            right={() => {
              const d = new Date(item.createdAt);
              return <Text style={styles.time}>{d.toLocaleDateString()} {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>;
            }}
          />
          <Divider />
        </>
      );
    }

    if (item.type === 'announcement') {
      return (
        <>
          <List.Item
            title={item.message}
            description={`${item.actor?.name || 'Admin'}`}
            left={(props) => <List.Icon {...props} icon="bullhorn-outline" />}
            right={() => {
              const d = new Date(item.createdAt);
              return <Text style={styles.time}>{d.toLocaleDateString()} {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>;
            }}
          />
          <Divider />
        </>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <View style={styles.center}> 
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}> 
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListEmptyComponent={() => (
        <View style={styles.center}> 
          <Text>No notifications yet</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  time: {
    color: '#777',
    fontSize: 12,
    marginRight: 12,
    alignSelf: 'center',
  },
});
