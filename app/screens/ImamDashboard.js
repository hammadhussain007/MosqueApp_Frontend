import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  Text,
  Card,
  FAB,
  Chip,
  ProgressBar,
  ActivityIndicator,
  Searchbar,
  SegmentedButtons
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import { theme } from '../core/theme';
import khutbahService from '../services/khutbahService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ImamDashboard = ({ navigation }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('suggested');

  const user = useSelector((state) => state.user.profile);

  useEffect(() => {
    loadSuggestions();
  }, [statusFilter]);

  useEffect(() => {
    filterSuggestions();
  }, [searchQuery, suggestions]);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      const response = await khutbahService.getSuggestions(statusFilter);
      if (response.success) {
        setSuggestions(response.suggestions);
      }
    } catch (error) {
      console.error('Error loading suggestions:', error);
      Alert.alert('Error', 'Failed to load suggestions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterSuggestions = () => {
    if (!searchQuery.trim()) {
      setFilteredSuggestions(suggestions);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = suggestions.filter(
      (s) =>
        s.topic.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
    );
    setFilteredSuggestions(filtered);
  };

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      console.log('Analyze: sending request to /api/khutbah/analyze');
      const response = await khutbahService.analyzeAndGenerate();
      console.log('Analyze: response', response);
      if (response.success) {
        Alert.alert('Success', response.message || 'Generated new suggestions');
        await loadSuggestions();
      } else {
        Alert.alert('No Suggestions', response.message || 'Analyzer returned no suggestions');
      }
    } catch (error) {
      console.error('Error analyzing:', error);
      Alert.alert('Error', 'Failed to analyze discussions');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleTopicPress = (suggestion) => {
    navigation.navigate('TopicDetail', { topicId: suggestion.id });
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadSuggestions();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'suggested':
        return theme.colors.primary;
      case 'selected':
        return theme.colors.accent;
      case 'delivered':
        return '#4CAF50';
      default:
        return theme.colors.text;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'suggested':
        return 'lightbulb-outline';
      case 'selected':
        return 'check-circle-outline';
      case 'delivered':
        return 'checkbox-marked-circle-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>As-Salamu Alaykum</Text>
        <Text style={styles.name}>{user?.fullName || 'Sheikh'}</Text>
        <Text style={styles.subtitle}>Khutbah Topic Suggestions</Text>
      </View>

      <Searchbar
        placeholder="Search topics..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor={theme.colors.primary}
      />

      <SegmentedButtons
        value={statusFilter}
        onValueChange={setStatusFilter}
        buttons={[
          {
            value: 'suggested',
            label: 'Suggested',
            icon: 'lightbulb-outline'
          },
          {
            value: 'selected',
            label: 'Selected',
            icon: 'check-circle-outline'
          },
          {
            value: 'delivered',
            label: 'Delivered',
            icon: 'checkbox-marked-circle-outline'
          }
        ]}
        style={styles.segmentedButtons}
      />

      {analyzing && (
        <Card style={styles.analyzingCard}>
          <Card.Content>
            <View style={styles.analyzingContent}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
              <Text style={styles.analyzingText}>
                Analyzing community discussions...
              </Text>
            </View>
          </Card.Content>
        </Card>
      )}
    </View>
  );

  const renderSuggestionCard = (suggestion) => (
    <TouchableOpacity
      key={suggestion.id}
      onPress={() => handleTopicPress(suggestion)}
      activeOpacity={0.7}
    >
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.topicTitleContainer}>
              <Icon
                name="book-open-variant"
                size={24}
                color={theme.colors.primary}
                style={styles.topicIcon}
              />
              <Text style={styles.topicTitle} numberOfLines={2}>
                {suggestion.topic}
              </Text>
            </View>
            <Chip
              icon={getStatusIcon(suggestion.status)}
              style={[
                styles.statusChip,
                { backgroundColor: getStatusColor(suggestion.status) + '20' }
              ]}
              textStyle={{ color: getStatusColor(suggestion.status) }}
            >
              {suggestion.status}
            </Chip>
          </View>

          {suggestion.analyzedThreadIds?.length > 0 && (
            <Chip
              icon="account-group"
              style={styles.communityBadge}
              textStyle={styles.communityBadgeText}
            >
              Community-Driven
            </Chip>
          )}

          <Text style={styles.description} numberOfLines={3}>
            {suggestion.description}
          </Text>

          <View style={styles.metricsContainer}>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>Relevance Score</Text>
              <ProgressBar
                progress={suggestion.relevanceScore / 100}
                color={theme.colors.accent}
                style={styles.progressBar}
              />
              <Text style={styles.scoreValue}>{suggestion.relevanceScore}%</Text>
            </View>
          </View>

          <View style={styles.footer}>
            {suggestion.analyzedThreadIds?.length > 0 && (
              <Chip
                icon="forum"
                style={styles.communityChip}
                textStyle={styles.communityChipText}
              >
                {suggestion.analyzedThreadIds?.length || 0} threads
              </Chip>
            )}
            <Chip
              icon="book-open-page-variant"
              style={styles.chip}
              textStyle={styles.chipText}
            >
              {suggestion.supportingAyah?.length || 0} ayah
            </Chip>
            <Chip
              icon="text-box-multiple"
              style={styles.chip}
              textStyle={styles.chipText}
            >
              {suggestion.supportingHadith?.length || 0} hadith
            </Chip>
          </View>

          {suggestion.status === 'selected' && suggestion.imam && (
            <View style={styles.imamInfo}>
              <Icon name="account-tie" size={16} color={theme.colors.accent} />
              <Text style={styles.imamText}>
                Selected by {suggestion.imam.fullName}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon
        name={
          statusFilter === 'suggested'
            ? 'lightbulb-off-outline'
            : statusFilter === 'selected'
            ? 'playlist-remove'
            : 'checkbox-blank-circle-outline'
        }
        size={80}
               color="#C0C0C0"
      />
      <Text style={styles.emptyTitle}>
        {statusFilter === 'suggested'
          ? 'No Suggestions Yet'
          : statusFilter === 'selected'
          ? 'No Selected Topics'
          : 'No Delivered Topics'}
      </Text>
      <Text style={styles.emptyText}>
        {statusFilter === 'suggested'
          ? 'Tap the analyze button to generate suggestions from community discussions'
          : statusFilter === 'selected'
          ? 'Select a suggested topic to prepare for your next khutbah'
          : 'Completed khutbahs will appear here'}
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Loading suggestions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
      >
        {renderHeader()}

        {filteredSuggestions.length > 0 ? (
          <>
            {filteredSuggestions.map(renderSuggestionCard)}
            <View style={styles.infoCard}>
              <Icon name="information-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.infoText}>
                Topics marked as "Community-Driven" are based on actual forum discussions. 
                Click "Analyze" to generate new suggestions from recent community posts.
              </Text>
            </View>
          </>
        ) : (
          renderEmptyState()
        )}
      </ScrollView>

      {statusFilter === 'suggested' && (
        <>
          <FAB
            icon="brain"
            label="Analyze"
            style={styles.fab}
            onPress={handleAnalyze}
            loading={analyzing}
            disabled={analyzing}
          />
          <FAB
            icon="magnify-plus-outline"
            label="Search & Create"
            style={styles.fabSearch}
            onPress={() => navigation.navigate('KhutbahSearch')}
          />
        </>
      )}
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
  header: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl
  },
  welcomeSection: {
    marginBottom: theme.spacing.lg
  },
  greeting: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary
  },
  searchBar: {
    marginBottom: theme.spacing.md,
    elevation: 0,
    backgroundColor: theme.colors.surface
  },
  segmentedButtons: {
    marginBottom: theme.spacing.md
  },
  analyzingCard: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.primary + '10'
  },
  analyzingContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  analyzingText: {
    marginLeft: theme.spacing.md,
    color: theme.colors.primary,
    fontSize: 14
  },
  card: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    elevation: theme.shadows.small.elevation,
    borderRadius: 12
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm
  },
  topicTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: theme.spacing.sm
  },
  topicIcon: {
    marginRight: theme.spacing.sm
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1
  },
  statusChip: {
    height: 28
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md
  },
  metricsContainer: {
    marginBottom: theme.spacing.md
  },
  scoreContainer: {
    marginBottom: theme.spacing.xs
  },
  scoreLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00897B20'
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.accent,
    marginTop: theme.spacing.xs,
    textAlign: 'right'
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.sm
  },
  chip: {
    height: 28,
    backgroundColor: theme.colors.surface
  },
  chipText: {
    fontSize: 12
  },
  communityBadge: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.accent + '20',
    height: 24
  },
  communityBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.colors.accent
  },
  communityChip: {
    height: 28,
    backgroundColor: theme.colors.accent + '15'
  },
  communityChipText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.accent
  },
  imamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border
  },
  imamText: {
    fontSize: 12,
    color: theme.colors.accent,
    marginLeft: theme.spacing.xs,
    fontStyle: 'italic'
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xxl * 2
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.primary + '10',
    margin: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: 8,
    gap: theme.spacing.sm
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.text,
    lineHeight: 18
  },
  fab: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    backgroundColor: theme.colors.accent
  },
  fabSearch: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg + 70,
    backgroundColor: '#00897B'
  }
});

export default ImamDashboard;
