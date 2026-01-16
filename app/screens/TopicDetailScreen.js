import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native';
import {
  Text,
  Card,
  Button,
  Chip,
  Divider,
  ActivityIndicator,
  ProgressBar
} from 'react-native-paper';
import { theme } from '../core/theme';
import khutbahService from '../services/khutbahService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const TopicDetailScreen = ({ route, navigation }) => {
  const { topicId } = route.params;
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadTopicDetail();
  }, [topicId]);

  const loadTopicDetail = async () => {
    try {
      setLoading(true);
      const response = await khutbahService.getTopicDetail(topicId);
      if (response.success) {
        setSuggestion(response.suggestion);
      }
    } catch (error) {
      console.error('Error loading topic detail:', error);
      Alert.alert('Error', 'Failed to load topic details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTopic = async () => {
    console.log('handleSelectTopic called for topicId:', topicId);
    try {
      setActionLoading(true);
      console.log('Selecting topic:', topicId);
      const response = await khutbahService.selectTopic(topicId);
      console.log('Select response:', response);
      if (response.success) {
        console.log('Topic selected successfully');
        await loadTopicDetail(); // Refresh to show new status
        // navigation.goBack(); // Stay on page to see updated status
      } else {
        console.error('Select failed:', response.message);
        alert(response.message || 'Failed to select topic');
      }
    } catch (error) {
      console.error('Error selecting topic:', error);
      alert(error.message || 'Failed to select topic');
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkAsDelivered = async () => {
    console.log('handleMarkAsDelivered called for topicId:', topicId);
    try {
      setActionLoading(true);
      console.log('Marking as delivered:', topicId);
      const response = await khutbahService.markAsDelivered(topicId);
      console.log('Delivered response:', response);
      if (response.success) {
        console.log('Topic marked as delivered successfully');
        await loadTopicDetail(); // Refresh to show new status
      } else {
        console.error('Mark delivered failed:', response.message);
        alert(response.message || 'Failed to mark as delivered');
      }
    } catch (error) {
      console.error('Error marking as delivered:', error);
      alert(error.message || 'Failed to mark as delivered');
    } finally {
      setActionLoading(false);
    }
  };

  const renderAyahCard = (ayah, index) => (
    <Card key={index} style={styles.contentCard}>
      <LinearGradient
        colors={['#00897B', '#00695C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.ayahGradient}
      >
        <Card.Content>
          <View style={styles.referenceHeader}>
            <Icon name="book-open-variant" size={20} color="#FFF" />
            <Text style={styles.referenceText}>{ayah.reference}</Text>
          </View>
          <Text style={styles.arabicText}>{ayah.arabic}</Text>
          <Text style={styles.translationText}>{ayah.translation}</Text>
          <Chip
            icon="bookmark"
            textStyle={styles.surahChipText}
            style={styles.surahChip}
          >
            {ayah.surah} - Ayah {ayah.ayahNumber}
          </Chip>
        </Card.Content>
      </LinearGradient>
    </Card>
  );

  const renderHadithCard = (hadith, index) => (
    <Card key={index} style={styles.contentCard}>
      <Card.Content>
        <View style={styles.hadithHeader}>
          <Icon
            name="text-box-multiple"
            size={24}
            color={theme.colors.accent}
          />
          <Text style={styles.hadithTitle}>Hadith</Text>
        </View>
        <Text style={styles.hadithText}>{hadith.text}</Text>
        <View style={styles.hadithFooter}>
          <Chip
            icon="account"
            style={styles.narratorChip}
            textStyle={styles.narratorChipText}
          >
            {hadith.narrator}
          </Chip>
          <Chip
            icon="book"
            style={styles.bookChip}
            textStyle={styles.bookChipText}
          >
            {hadith.book}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  const renderRelatedThread = (thread, index) => (
    <Card key={index} style={styles.threadCard}>
      <Card.Content>
        <Text style={styles.threadTitle} numberOfLines={2}>
          {thread.title}
        </Text>
        <Text style={styles.threadContent} numberOfLines={3}>
          {thread.content}
        </Text>
        <View style={styles.threadFooter}>
          <Icon name="account" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.threadAuthor}>{thread.author.fullName}</Text>
          <View style={styles.threadStats}>
            <Icon name="comment" size={14} color={theme.colors.textSecondary} />
            <Text style={styles.threadStat}>{thread._count.comments}</Text>
            <Icon
              name="thumb-up"
              size={14}
              color={theme.colors.textSecondary}
              style={{ marginLeft: theme.spacing.sm }}
            />
            <Text style={styles.threadStat}>{thread._count.likes}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading topic details...</Text>
      </View>
    );
  }

  if (!suggestion) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Topic Header */}
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryDark]}
          style={styles.headerGradient}
        >
          <Text style={styles.topicTitle}>{suggestion.topic}</Text>
          <Text style={styles.topicDescription}>{suggestion.description}</Text>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Community Relevance</Text>
            <ProgressBar
              progress={suggestion.relevanceScore / 100}
              color="#FFB300"
              style={styles.progressBar}
            />
            <Text style={styles.scoreValue}>{suggestion.relevanceScore}%</Text>
          </View>

          <View style={styles.statusContainer}>
            <Chip
              icon={
                suggestion.status === 'suggested'
                  ? 'lightbulb-outline'
                  : suggestion.status === 'selected'
                  ? 'check-circle-outline'
                  : 'checkbox-marked-circle-outline'
              }
              textStyle={styles.statusChipText}
              style={styles.statusChip}
            >
              {suggestion.status.toUpperCase()}
            </Chip>
          </View>
        </LinearGradient>

        {/* Quranic Verses Section */}
        {suggestion.supportingAyah && suggestion.supportingAyah.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon
                name="book-open-variant"
                size={28}
                color={theme.colors.primary}
              />
              <Text style={styles.sectionTitle}>
                Quranic Guidance ({suggestion.supportingAyah.length})
              </Text>
            </View>
            {suggestion.supportingAyah.map(renderAyahCard)}
          </View>
        )}

        {/* Hadith Section */}
        {suggestion.supportingHadith && suggestion.supportingHadith.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon
                name="text-box-multiple"
                size={28}
                color={theme.colors.accent}
              />
              <Text style={styles.sectionTitle}>
                Hadith References ({suggestion.supportingHadith.length})
              </Text>
            </View>
            {suggestion.supportingHadith.map(renderHadithCard)}
          </View>
        )}

        {/* Related Community Threads */}
        {suggestion.relatedThreads && suggestion.relatedThreads.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="forum" size={28} color={theme.colors.primary} />
              <Text style={styles.sectionTitle}>
                Related Discussions ({suggestion.relatedThreads.length})
              </Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              These community discussions indicate interest in this topic
            </Text>
            {suggestion.relatedThreads.map(renderRelatedThread)}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        {suggestion.status === 'suggested' && (
          <Button
            mode="contained"
            onPress={handleSelectTopic}
            loading={actionLoading}
            disabled={actionLoading}
            style={styles.actionButton}
            icon="check-circle"
          >
            Select This Topic
          </Button>
        )}

        {suggestion.status === 'selected' && (
          <Button
            mode="contained"
            onPress={handleMarkAsDelivered}
            loading={actionLoading}
            disabled={actionLoading}
            style={styles.actionButton}
            icon="checkbox-marked-circle"
            buttonColor="#4CAF50"
          >
            Mark as Delivered
          </Button>
        )}

        {suggestion.status === 'delivered' && (
          <View style={styles.deliveredBadge}>
            <Icon name="checkbox-marked-circle" size={24} color="#4CAF50" />
            <Text style={styles.deliveredText}>
              Khutbah Delivered ✓
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text
  },
  scrollContent: {
    paddingBottom: 100
  },
  headerGradient: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xxl
  },
  topicTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: theme.spacing.md
  },
  topicDescription: {
    fontSize: 16,
    color: '#FFF',
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
    opacity: 0.9
  },
  scoreContainer: {
    marginBottom: theme.spacing.md
  },
  scoreLabel: {
    fontSize: 12,
    color: '#FFF',
    marginBottom: theme.spacing.xs,
    opacity: 0.8
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFB300',
    marginTop: theme.spacing.xs,
    textAlign: 'right'
  },
  statusContainer: {
    marginTop: theme.spacing.sm
  },
  statusChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start'
  },
  statusChipText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  section: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: theme.spacing.sm
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
    fontStyle: 'italic'
  },
  contentCard: {
    marginBottom: theme.spacing.md,
    elevation: theme.shadows.medium.elevation,
    borderRadius: 12
  },
  ayahGradient: {
    borderRadius: 12
  },
  referenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md
  },
  referenceText: {
    fontSize: 14,
    color: '#FFF',
    marginLeft: theme.spacing.xs,
    fontWeight: 'bold'
  },
  arabicText: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'right',
    marginBottom: theme.spacing.lg,
    lineHeight: 40,
    fontFamily: 'System'
  },
  translationText: {
    fontSize: 16,
    color: '#FFF',
    lineHeight: 24,
    marginBottom: theme.spacing.md,
    opacity: 0.95
  },
  surahChip: {
    backgroundColor: 'rgba(255, 179, 0, 0.3)',
    alignSelf: 'flex-start'
  },
  surahChipText: {
    color: '#FFB300',
    fontWeight: 'bold'
  },
  hadithHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md
  },
  hadithTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.accent,
    marginLeft: theme.spacing.sm
  },
  hadithText: {
    fontSize: 15,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
    fontStyle: 'italic'
  },
  hadithFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs
  },
  narratorChip: {
    backgroundColor: theme.colors.primary + '15'
  },
  narratorChipText: {
    color: theme.colors.primary,
    fontSize: 12
  },
  bookChip: {
    backgroundColor: theme.colors.accent + '15'
  },
  bookChipText: {
    color: theme.colors.accent,
    fontSize: 12
  },
  threadCard: {
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface
  },
  threadTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs
  },
  threadContent: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: theme.spacing.sm
  },
  threadFooter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  threadAuthor: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
    flex: 1
  },
  threadStats: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  threadStat: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    ...theme.shadows.large,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border
  },
  actionButton: {
    paddingVertical: theme.spacing.xs
  },
  deliveredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    backgroundColor: '#4CAF50' + '15',
    borderRadius: 12
  },
  deliveredText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: theme.spacing.sm
  }
});

export default TopicDetailScreen;
