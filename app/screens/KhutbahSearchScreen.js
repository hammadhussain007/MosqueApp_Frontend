import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Checkbox,
  ActivityIndicator,
  Chip,
  Divider,
  IconButton
} from 'react-native-paper';
import { theme } from '../core/theme';
import khutbahService from '../services/khutbahService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const KhutbahSearchScreen = ({ navigation }) => {
  const [keywords, setKeywords] = useState('');
  const [topicName, setTopicName] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Source selection
  const [sources, setSources] = useState({
    quran: true,
    bukhari: true,
    muslim: true
  });

  // Search results
  const [quranResults, setQuranResults] = useState([]);
  const [hadithResults, setHadithResults] = useState([]);
  
  // Selected items for saving
  const [selectedAyah, setSelectedAyah] = useState([]);
  const [selectedHadith, setSelectedHadith] = useState([]);

  const toggleSource = (source) => {
    setSources(prev => ({ ...prev, [source]: !prev[source] }));
  };

  const handleSearch = async () => {
    if (!keywords.trim()) {
      Alert.alert('Error', 'Please enter keywords to search');
      return;
    }

    try {
      setSearching(true);
      const selectedSources = Object.keys(sources).filter(key => sources[key]);
      
      const response = await khutbahService.searchIslamicContent(keywords, selectedSources);
      
      if (response.success) {
        setQuranResults(response.results.quran || []);
        setHadithResults(response.results.hadith || []);
        
        if (response.results.quran.length === 0 && response.results.hadith.length === 0) {
          Alert.alert('No Results', 'No content found for the given keywords. Try different keywords or select more sources.');
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('Error', 'Failed to search. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const toggleAyahSelection = (ayah) => {
    setSelectedAyah(prev => {
      const exists = prev.find(a => a.reference === ayah.reference);
      if (exists) {
        return prev.filter(a => a.reference !== ayah.reference);
      } else {
        return [...prev, ayah];
      }
    });
  };

  const toggleHadithSelection = (hadith) => {
    setSelectedHadith(prev => {
      const exists = prev.find(h => h.reference === hadith.reference);
      if (exists) {
        return prev.filter(h => h.reference !== hadith.reference);
      } else {
        return [...prev, hadith];
      }
    });
  };

  const handleSave = async () => {
    if (!topicName.trim()) {
      Alert.alert('Error', 'Please enter a topic name');
      return;
    }

    if (selectedAyah.length === 0 && selectedHadith.length === 0) {
      Alert.alert('Error', 'Please select at least one Ayah or Hadith');
      return;
    }

    try {
      setSaving(true);
      const response = await khutbahService.saveCuratedTopic(
        topicName.trim(),
        topicDescription.trim(),
        selectedAyah,
        selectedHadith,
        keywords.trim()
      );

      if (response.success) {
        Alert.alert('Success', 'Topic saved successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save topic');
    } finally {
      setSaving(false);
    }
  };

  const renderQuranResult = (ayah, index) => {
    const isSelected = selectedAyah.find(a => a.reference === ayah.reference);
    
    return (
      <TouchableOpacity
        key={`ayah-${index}`}
        onPress={() => toggleAyahSelection(ayah)}
        activeOpacity={0.7}
      >
        <Card style={[styles.resultCard, isSelected && styles.selectedCard]}>
          <Card.Content>
            <View style={styles.resultHeader}>
              <View style={styles.sourceInfo}>
                <Icon name="book-open-variant" size={20} color={theme.colors.primary} />
                <Text style={styles.sourceLabel}>Quran</Text>
              </View>
              <Checkbox
                status={isSelected ? 'checked' : 'unchecked'}
                onPress={() => toggleAyahSelection(ayah)}
              />
            </View>

            <View style={styles.referenceContainer}>
              <Chip icon="bookmark" style={styles.referenceChip} textStyle={styles.referenceText}>
                {ayah.fullReference}
              </Chip>
              <Chip style={styles.matchChip} textStyle={styles.matchText}>
                Matched: {ayah.matchedKeyword}
              </Chip>
            </View>

            <Text style={styles.arabicText}>{ayah.arabic}</Text>
            
            <View style={styles.translationSection}>
              <Text style={styles.translationLabel}>English:</Text>
              <Text style={styles.translationText}>{ayah.translation}</Text>
            </View>

            {ayah.urduTranslation && (
              <View style={styles.translationSection}>
                <Text style={styles.translationLabel}>Urdu:</Text>
                <Text style={styles.urduText}>{ayah.urduTranslation}</Text>
              </View>
            )}

            <View style={styles.metadataRow}>
              <Chip icon="book" size={16} style={styles.metaChip}>
                Surah {ayah.surahNumber}
              </Chip>
              <Chip icon="format-list-numbered" size={16} style={styles.metaChip}>
                Ayah {ayah.ayahNumber}
              </Chip>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderHadithResult = (hadith, index) => {
    const isSelected = selectedHadith.find(h => h.reference === hadith.reference);
    
    return (
      <TouchableOpacity
        key={`hadith-${index}`}
        onPress={() => toggleHadithSelection(hadith)}
        activeOpacity={0.7}
      >
        <Card style={[styles.resultCard, isSelected && styles.selectedCard]}>
          <Card.Content>
            <View style={styles.resultHeader}>
              <View style={styles.sourceInfo}>
                <Icon name="text-box-multiple" size={20} color={theme.colors.accent} />
                <Text style={styles.sourceLabel}>Hadith</Text>
              </View>
              <Checkbox
                status={isSelected ? 'checked' : 'unchecked'}
                onPress={() => toggleHadithSelection(hadith)}
              />
            </View>

            <View style={styles.referenceContainer}>
              <Chip icon="bookmark" style={styles.referenceChip} textStyle={styles.referenceText}>
                {hadith.reference}
              </Chip>
              {hadith.matchedKeyword && (
                <Chip style={styles.matchChip} textStyle={styles.matchText}>
                  Matched: {hadith.matchedKeyword}
                </Chip>
              )}
            </View>

            {hadith.arabic && (
              <Text style={styles.arabicText}>{hadith.arabic}</Text>
            )}

            <Text style={styles.hadithText}>{hadith.text}</Text>

            <View style={styles.metadataRow}>
              <Chip icon="bookshelf" size={16} style={styles.metaChip}>
                {hadith.book}
              </Chip>
              {hadith.narrator && (
                <Chip icon="account" size={16} style={styles.metaChip}>
                  {hadith.narrator}
                </Chip>
              )}
              {hadith.chapter && (
                <Chip icon="file-document" size={16} style={styles.metaChip}>
                  {hadith.chapter}
                </Chip>
              )}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search Section */}
        <Card style={styles.searchCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Search Islamic Content</Text>
            
            <TextInput
              label="Keywords *"
              value={keywords}
              onChangeText={setKeywords}
              mode="outlined"
              style={styles.input}
              placeholder="e.g., patience, sabr, hardship"
              right={<TextInput.Icon icon="magnify" />}
            />

            <Text style={styles.sourceTitle}>Select Sources:</Text>
            <View style={styles.sourceCheckboxes}>
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => toggleSource('quran')}
              >
                <Checkbox
                  status={sources.quran ? 'checked' : 'unchecked'}
                  onPress={() => toggleSource('quran')}
                />
                <Text style={styles.checkboxLabel}>Quran</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => toggleSource('bukhari')}
              >
                <Checkbox
                  status={sources.bukhari ? 'checked' : 'unchecked'}
                  onPress={() => toggleSource('bukhari')}
                />
                <Text style={styles.checkboxLabel}>Sahih Bukhari</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => toggleSource('muslim')}
              >
                <Checkbox
                  status={sources.muslim ? 'checked' : 'unchecked'}
                  onPress={() => toggleSource('muslim')}
                />
                <Text style={styles.checkboxLabel}>Sahih Muslim</Text>
              </TouchableOpacity>
            </View>

            <Button
              mode="contained"
              onPress={handleSearch}
              loading={searching}
              disabled={searching}
              icon="magnify"
              style={styles.searchButton}
            >
              Search
            </Button>
          </Card.Content>
        </Card>

        {/* Results Section */}
        {(quranResults.length > 0 || hadithResults.length > 0) && (
          <>
            <Text style={styles.resultsTitle}>
              Results ({quranResults.length + hadithResults.length} items)
            </Text>
            <Text style={styles.resultsSubtitle}>
              Tap to select/deselect items for your khutbah
            </Text>

            {/* Quran Results */}
            {quranResults.length > 0 && (
              <>
                <View style={styles.categoryHeader}>
                  <Icon name="book-open-variant" size={24} color={theme.colors.primary} />
                  <Text style={styles.categoryTitle}>Quran Verses ({quranResults.length})</Text>
                </View>
                {quranResults.map(renderQuranResult)}
              </>
            )}

            {/* Hadith Results */}
            {hadithResults.length > 0 && (
              <>
                <View style={styles.categoryHeader}>
                  <Icon name="text-box-multiple" size={24} color={theme.colors.accent} />
                  <Text style={styles.categoryTitle}>Hadith ({hadithResults.length})</Text>
                </View>
                {hadithResults.map(renderHadithResult)}
              </>
            )}

            {/* Save Section */}
            {(selectedAyah.length > 0 || selectedHadith.length > 0) && (
              <Card style={styles.saveCard}>
                <Card.Content>
                  <Text style={styles.sectionTitle}>Save as Topic</Text>
                  <Text style={styles.selectedCount}>
                    Selected: {selectedAyah.length} Ayah, {selectedHadith.length} Hadith
                  </Text>

                  <TextInput
                    label="Topic Name *"
                    value={topicName}
                    onChangeText={setTopicName}
                    mode="outlined"
                    style={styles.input}
                    placeholder="e.g., Patience in Difficult Times"
                  />

                  <TextInput
                    label="Description (optional)"
                    value={topicDescription}
                    onChangeText={setTopicDescription}
                    mode="outlined"
                    style={styles.input}
                    placeholder="Brief description"
                    multiline
                    numberOfLines={3}
                  />

                  <Button
                    mode="contained"
                    onPress={handleSave}
                    loading={saving}
                    disabled={saving}
                    icon="content-save"
                    style={styles.saveButton}
                  >
                    Save Topic
                  </Button>
                </Card.Content>
              </Card>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: 100
  },
  searchCard: {
    marginBottom: theme.spacing.lg
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md
  },
  input: {
    marginBottom: theme.spacing.md
  },
  sourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm
  },
  sourceCheckboxes: {
    marginBottom: theme.spacing.md
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs
  },
  checkboxLabel: {
    fontSize: 15,
    color: theme.colors.text,
    marginLeft: theme.spacing.sm
  },
  searchButton: {
    marginTop: theme.spacing.sm
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs
  },
  resultsSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: theme.colors.text
  },
  resultCard: {
    marginBottom: theme.spacing.md,
    elevation: 2
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10'
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm
  },
  sourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs
  },
  sourceLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text
  },
  referenceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.md
  },
  referenceChip: {
    backgroundColor: theme.colors.primary + '20'
  },
  referenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary
  },
  matchChip: {
    backgroundColor: theme.colors.accent + '15'
  },
  matchText: {
    fontSize: 11,
    color: theme.colors.accent
  },
  arabicText: {
    fontSize: 18,
    fontFamily: 'serif',
    textAlign: 'right',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    lineHeight: 30
  },
  translationSection: {
    marginBottom: theme.spacing.sm
  },
  translationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs
  },
  translationText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20
  },
  urduText: {
    fontSize: 14,
    textAlign: 'right',
    color: theme.colors.text,
    lineHeight: 22
  },
  hadithText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 22,
    marginTop: theme.spacing.sm
  },
  metadataRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.md
  },
  metaChip: {
    height: 28,
    backgroundColor: theme.colors.surface
  },
  saveCard: {
    marginTop: theme.spacing.xl,
    backgroundColor: theme.colors.primary + '08'
  },
  selectedCount: {
    fontSize: 14,
    color: theme.colors.accent,
    fontWeight: '600',
    marginBottom: theme.spacing.md
  },
  saveButton: {
    marginTop: theme.spacing.sm
  }
});

export default KhutbahSearchScreen;
