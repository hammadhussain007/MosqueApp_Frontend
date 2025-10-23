import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Text, Card, IconButton, Divider, TextInput as RNTextInput, Button, Chip } from 'react-native-paper';
import { forumService } from '../services/api';
import { theme } from '../core/theme';

export default function ForumDetailScreen({ route, navigation }) {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await forumService.getPostById(postId);
      setPost(data);
    } catch (e) {
      console.error('Failed to load post', e);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => { load(); }, [load]);

  const onAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const newComment = await forumService.addComment(postId, commentText.trim());
      setPost(prev => ({
        ...prev,
        comments: [...prev.comments, newComment],
        _count: { ...prev._count, comments: prev._count.comments + 1 },
      }));
      setCommentText('');
    } catch (e) {
      console.error('Add comment failed', e);
    }
  };

  const onToggleLike = async () => {
    try {
      const result = await forumService.toggleLike(postId);
      setPost(prev => ({
        ...prev,
        _count: {
          ...prev._count,
          likes: result.liked ? prev._count.likes + 1 : prev._count.likes - 1
        }
      }));
    } catch (e) {
      console.error('Toggle like failed', e);
    }
  };

  if (!post) {
    return (
      <View style={styles.center}> 
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{post.title}</Text>
          <View style={styles.authorRow}>
            {post.author?.avatar ? (
              <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
            ) : <View style={[styles.avatar, styles.avatarPlaceholder]} />}
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.authorName}>{post.author?.fullName}</Text>
              <Text style={styles.meta}>{new Date(post.createdAt).toLocaleString()}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <Chip icon="heart" style={styles.statChip} textStyle={{ color: theme.colors.primary }}>{post._count?.likes || 0}</Chip>
            <Chip icon="comment" style={styles.statChip}>{post._count?.comments || 0}</Chip>
          </View>
          <Divider style={{ marginVertical: 12 }} />
          <Text style={styles.content}>{post.content}</Text>
        </Card.Content>
        <Card.Actions>
          <IconButton icon="heart" onPress={onToggleLike} />
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Comments" />
        <Card.Content>
          <FlatList
            data={post.comments}
            keyExtractor={(c) => c.id.toString()}
            ItemSeparatorComponent={() => <Divider style={{ marginVertical: 8 }} />}
            renderItem={({ item }) => (
              <View style={styles.commentRow}>
                {item.author?.avatar ? (
                  <Image source={{ uri: item.author.avatar }} style={styles.avatarSmall} />
                ) : <View style={[styles.avatarSmall, styles.avatarPlaceholder]} />}
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={styles.commentAuthor}>{item.author?.fullName}</Text>
                  <Text style={styles.commentText}>{item.content}</Text>
                  <Text style={styles.meta}>{new Date(item.createdAt).toLocaleString()}</Text>
                </View>
              </View>
            )}
          />
          <View style={{ marginTop: 12 }}>
            <RNTextInput
              mode="outlined"
              placeholder="Write a comment..."
              value={commentText}
              onChangeText={setCommentText}
            />
            <Button mode="contained" style={{ marginTop: 8 }} onPress={onAddComment}>Post Comment</Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f7f8fa' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: { marginBottom: 16, borderRadius: 12, overflow: 'hidden' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  content: { fontSize: 16, lineHeight: 22 },
  authorRow: { flexDirection: 'row', alignItems: 'center' },
  authorName: { fontWeight: '600' },
  meta: { color: '#6b7280', fontSize: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e5e7eb' },
  avatarSmall: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#e5e7eb' },
  avatarPlaceholder: { backgroundColor: '#e5e7eb' },
  commentRow: { flexDirection: 'row', alignItems: 'flex-start' },
  commentAuthor: { fontWeight: '600' },
  statChip: { marginLeft: 6, backgroundColor: '#eef2ff' },
});