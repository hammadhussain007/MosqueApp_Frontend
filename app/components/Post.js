import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Paragraph, IconButton, Text, TextInput as RNTextInput, Button } from "react-native-paper";
import { theme } from "../core/theme";
import { useSelector } from "react-redux";

export default function Post({ post, onLike, onAddComment, onPress }) {
  const [comment, setComment] = useState("");
  const currentUser = useSelector(state => state.user.userData);

  const isLiked = post.likes?.some(like => like.userId === currentUser?.id);

  return (
  <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.headerRow}>
          <View style={styles.authorInfo}>
            <Text style={styles.author}>{post.author.fullName}</Text>
            <Text style={styles.date}>{new Date(post.createdAt).toLocaleString()}</Text>
          </View>
        </View>

        <Text style={styles.title}>{post.title}</Text>
        <Paragraph style={styles.content} numberOfLines={3}>{post.content}</Paragraph>
      </Card.Content>
      
      <Card.Actions>
        <IconButton 
          icon={isLiked ? "heart" : "heart-outline"} 
          onPress={(e) => {
            e?.stopPropagation?.();
            onLike?.();
          }}
          color={isLiked ? theme.colors.primary : undefined}
        />
        <Text>{post._count?.likes || 0} likes</Text>
        <IconButton icon="comment-outline" />
        <Text>{post._count?.comments || 0} comments</Text>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { 
    marginBottom: 12,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  authorInfo: {
    flex: 1,
  },
  author: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  comments: {
    marginTop: 16,
  },
  commentContainer: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
  },
  commentDate: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  commentInput: {
    paddingTop: 8,
  },
  commentButton: {
    marginTop: 8,
    marginBottom: 8,
  },
});
