import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text, Avatar, Chip } from "react-native-paper";
import { theme } from "../core/theme";
import { useSelector } from "react-redux";

export default function Post({ post, onLike, onPress }) {
  const currentUser = useSelector(state => state.user.profile);
  const isLiked = post.likes?.some(like => like.userId === currentUser?.id) || post.isLiked;

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <View style={styles.header}>
            <Avatar.Text
              size={40}
              label={getInitials(post.author?.fullName || 'User')}
              style={styles.avatar}
              color="#FFFFFF"
            />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>
                {post.author?.fullName || 'Anonymous'}
              </Text>
              <Text style={styles.date}>{formatDate(post.createdAt)}</Text>
            </View>
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {post.title}
          </Text>
          
          <Text style={styles.content} numberOfLines={3}>
            {post.content}
          </Text>

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={(e) => {
                e?.stopPropagation?.();
                onLike?.();
              }}
              style={styles.actionButton}
            >
              <Chip
                icon={isLiked ? "heart" : "heart-outline"}
                style={[
                  styles.chip,
                  isLiked && styles.likedChip
                ]}
                textStyle={[
                  styles.chipText,
                  isLiked && styles.likedChipText
                ]}
                selectedColor={isLiked ? theme.colors.error : theme.colors.textSecondary}
              >
                {post._count?.likes || 0}
              </Chip>
            </TouchableOpacity>

            <Chip
              icon="comment-outline"
              style={styles.chip}
              textStyle={styles.chipText}
            >
              {post._count?.comments || 0}
            </Chip>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderRadius: theme.roundness.large,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  authorInfo: {
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text,
  },
  date: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    lineHeight: 24,
  },
  content: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  actionButton: {
    marginRight: theme.spacing.xs,
  },
  chip: {
    backgroundColor: theme.colors.background,
    height: 32,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  likedChip: {
    backgroundColor: theme.colors.error + '15',
  },
  likedChipText: {
    color: theme.colors.error,
    fontWeight: '600',
  },
});
