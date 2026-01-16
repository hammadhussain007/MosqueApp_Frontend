import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, RefreshControl, StatusBar } from "react-native";
import { FAB, Portal, Dialog, Button, TextInput, Text, Searchbar, Chip, Avatar } from "react-native-paper";
import { useSelector } from 'react-redux';

import Post from "../components/Post";
import { theme } from "../core/theme";
import { forumService } from "../services/api";

export default function ForumScreen({ navigation }) {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const currentUser = useSelector((state) => state.user.profile);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await forumService.getAllPosts();
      setForums(response);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!title.trim() || !content.trim()) return;
    
    try {
      const response = await forumService.createPost(title, content);
      setForums(prevForums => [response, ...prevForums]);
      setTitle('');
      setContent('');
      setShowDialog(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const response = await forumService.toggleLike(postId);
      setForums(prevForums => {
        return prevForums.map(forum => {
          if (forum.id === postId) {
            const newLikesCount = response.liked ? forum._count.likes + 1 : forum._count.likes - 1;
            return {
              ...forum,
              _count: {
                ...forum._count,
                likes: newLikesCount
              },
              isLiked: response.liked
            };
          }
          return forum;
        });
      });
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      console.log('Deleting post:', postId);
      const response = await forumService.deletePost(postId);
      if (response.success) {
        setForums(prevForums => prevForums.filter(forum => forum.id !== postId));
        console.log('Post deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert(error.message || 'Failed to delete post');
    }
  };

  const filteredForums = forums.filter(forum =>
    forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    forum.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.titleRow}>
        <Text style={styles.screenTitle}>Community Forum</Text>
        <Chip
          icon="forum"
          style={styles.countChip}
          textStyle={styles.chipText}
        >
          {forums.length} Topics
        </Chip>
      </View>
      <Searchbar
        placeholder="Search discussions..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor={theme.colors.primary}
        inputStyle={styles.searchInput}
      />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Avatar.Icon
        size={80}
        icon="forum-outline"
        style={styles.emptyIcon}
        color={theme.colors.primary}
      />
      <Text style={styles.emptyTitle}>No Discussions Yet</Text>
      <Text style={styles.emptyText}>
        Be the first to start a conversation!
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.surface} />
      
      <FlatList
        data={filteredForums}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!loading && renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadPosts}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Post 
            post={item} 
            onLike={() => handleLikePost(item.id)}
            onPress={() => navigation.navigate('ForumDetail', { postId: item.id })}
            onDelete={() => handleDeletePost(item.id)}
            currentUser={currentUser}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Portal>
        <Dialog
          visible={showDialog}
          onDismiss={() => setShowDialog(false)}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.dialogTitle}>Create New Discussion</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Topic Title"
              value={title}
              onChangeText={setTitle}
              mode="outlined"
              style={styles.dialogInput}
              outlineColor={theme.colors.border}
              activeOutlineColor={theme.colors.primary}
              placeholder="What would you like to discuss?"
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
              activeOutlineColor={theme.colors.primary}
              placeholder="Share your thoughts..."
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
              onPress={createPost}
              disabled={!title.trim() || !content.trim()}
              mode="contained"
              style={styles.createButton}
            >
              Post
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowDialog(true)}
        color="#FFFFFF"
        customSize={56}
      />
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
  },
  countChip: {
    backgroundColor: theme.colors.primaryLight + '20',
  },
  chipText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  searchBar: {
    elevation: 0,
    backgroundColor: theme.colors.background,
    borderRadius: theme.roundness.medium,
  },
  searchInput: {
    fontSize: 14,
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
    backgroundColor: theme.colors.primaryLight + '20',
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
  createButton: {
    borderRadius: theme.roundness.small,
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.md,
    bottom: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    ...theme.shadows.large,
  },
});
