import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { FAB, Portal, Dialog, Button, TextInput as RNTextInput } from "react-native-paper";

import Header from "../components/Header";
import Post from "../components/Post";
import { theme } from "../core/theme";
import { forumService } from "../services/api";

export default function ForumScreen({ navigation }) {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [displayName, setDisplayName] = useState('Guest');

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

  const handleAddComment = async (postId, commentText) => {
    try {
      const response = await forumService.addComment(postId, commentText);
      setForums(prevForums => {
        return prevForums.map(forum => {
          if (forum.id === postId) {
            return {
              ...forum,
              comments: [...forum.comments, response],
              _count: {
                ...forum._count,
                comments: forum._count.comments + 1
              }
            };
          }
          return forum;
        });
      });
    } catch (error) {
      console.error('Error adding comment:', error);
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
              }
            };
          }
          return forum;
        });
      });
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header>Community Forum</Header>

      <FlatList
        data={forums}
        refreshing={loading}
        onRefresh={loadPosts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Post 
            post={item} 
            onLike={() => handleLikePost(item.id)}
            onPress={() => navigation.navigate('ForumDetail', { postId: item.id })}
          />
        )}
      />

      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>New Topic</Dialog.Title>
          <Dialog.Content>
            <RNTextInput
              label="Title"
              value={title}
              onChangeText={setTitle}
            />
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
            <Button onPress={createPost} disabled={!title || !content}>Create</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowDialog(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: theme.colors.background },
  fab: { position: 'absolute', right: 16, bottom: 24 },
});
