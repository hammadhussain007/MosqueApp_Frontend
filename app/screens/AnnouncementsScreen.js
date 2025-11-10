import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, RefreshControl, StatusBar } from "react-native";
import { Portal, Dialog, Button, TextInput, Text, Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import { FAB } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';

import Announcement from "../components/Announcement";
import { theme } from "../core/theme";
import { announcementService } from "../services/api";

export default function AnnouncementsScreen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const currentUser = useSelector(state => state.user.profile);

  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => { 
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await announcementService.getAllAnnouncements();
      setItems(data);
    } catch (error) {
      console.error('Failed to load announcements', error);
    } finally {
      setLoading(false);
    }
  };

  const createAnnouncement = async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      const newItem = await announcementService.createAnnouncement(title.trim(), content.trim());
      setItems(prev => [newItem, ...prev]);
      setTitle(''); 
      setContent(''); 
      setShowDialog(false);
    } catch (error) {
      console.error('Failed to create announcement', error);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.screenTitle}>Announcements</Text>
      <Text style={styles.subtitle}>Stay informed with mosque updates</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Avatar.Icon
        size={80}
        icon="bullhorn-outline"
        style={styles.emptyIcon}
        color={theme.colors.accent}
      />
      <Text style={styles.emptyTitle}>No Announcements Yet</Text>
      <Text style={styles.emptyText}>
        Important updates and news from the mosque will appear here.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      <FlatList
        data={items}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!loading && renderEmpty}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => <Announcement item={item} />}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadAnnouncements}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Portal>
        <Dialog
          visible={showDialog}
          onDismiss={() => setShowDialog(false)}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.dialogTitle}>New Announcement</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Title"
              value={title}
              onChangeText={setTitle}
              mode="outlined"
              style={styles.dialogInput}
              outlineColor={theme.colors.border}
              activeOutlineColor={theme.colors.accent}
              placeholder="Announcement title"
            />
            <TextInput
              label="Content"
              value={content}
              onChangeText={setContent}
              mode="outlined"
              multiline
              numberOfLines={6}
              style={[styles.dialogInput, styles.contentInput]}
              outlineColor={theme.colors.border}
              activeOutlineColor={theme.colors.accent}
              placeholder="Announcement details..."
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => setShowDialog(false)}
              textColor={theme.colors.textSecondary}
            >
              Cancel
            </Button>
            <Button
              onPress={createAnnouncement}
              disabled={!title.trim() || !content.trim()}
              mode="contained"
              buttonColor={theme.colors.accent}
              style={styles.publishButton}
            >
              Publish
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {isAdmin && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => setShowDialog(true)}
          color="#FFFFFF"
          customSize={56}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    ...theme.shadows.small,
  },
  screenTitle: {
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
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xxl * 2,
    paddingHorizontal: theme.spacing.xl,
  },
  emptyIcon: {
    backgroundColor: theme.colors.accent + '20',
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
  dialog: {
    borderRadius: theme.roundness.large,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  dialogInput: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  contentInput: {
    minHeight: 120,
  },
  publishButton: {
    borderRadius: theme.roundness.small,
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.md,
    bottom: theme.spacing.lg,
    backgroundColor: theme.colors.accent,
    ...theme.shadows.large,
  },
});
