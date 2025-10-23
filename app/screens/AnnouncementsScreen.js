import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Portal, Dialog, Button, TextInput as RNTextInput, FAB } from "react-native-paper";
import { useSelector } from "react-redux";

import Header from "../components/Header";
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

  return (
    <View style={styles.container}>
      <Header>Announcements</Header>
      <FlatList
        data={items}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => <Announcement item={item} />}
        refreshing={loading}
        onRefresh={loadAnnouncements}
      />

      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>New Announcement</Dialog.Title>
          <Dialog.Content>
            <RNTextInput label="Title" value={title} onChangeText={setTitle} />
            <RNTextInput 
              label="Content" 
              value={content} 
              onChangeText={setContent} 
              multiline 
              numberOfLines={4}
              style={{ marginTop: 8 }} 
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)}>Cancel</Button>
            <Button onPress={createAnnouncement} disabled={!title.trim() || !content.trim()}>Publish</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {isAdmin && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => setShowDialog(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.colors.background },
  fab: { position: 'absolute', right: 16, bottom: 24 }
});
