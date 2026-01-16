import { apiRequest, getAuthHeader } from './api';
import { store } from '../store';

const authHeaders = () => getAuthHeader(store.getState().user.token);

const khutbahService = {
  /**
   * Analyze forum posts and generate khutbah topic suggestions
   */
  analyzeAndGenerate: async () => {
    try {
      return await apiRequest('/api/khutbah/analyze', {
        method: 'POST',
        headers: authHeaders(),
      });
    } catch (error) {
      console.error('Error analyzing topics:', error);
      throw error;
    }
  },

  /**
   * Create a manual khutbah topic with custom keywords
   * @param {string} topic - Topic title
   * @param {string} keywords - Comma-separated keywords
   * @param {string} description - Optional description
   */
  createManualTopic: async (topic, keywords, description = '') => {
    try {
      return await apiRequest('/api/khutbah/manual', {
        method: 'POST',
        headers: {
          ...authHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          keywords,
          description,
        }),
      });
    } catch (error) {
      console.error('Error creating manual topic:', error);
      throw error;
    }
  },

  /**
   * Search Islamic content (Quran and Hadith) in real-time
   * @param {string} keywords - Search keywords
   * @param {array} sources - Array of sources to search ['quran', 'bukhari', 'muslim']
   */
  searchIslamicContent: async (keywords, sources = ['quran', 'bukhari', 'muslim']) => {
    try {
      return await apiRequest('/api/khutbah/search', {
        method: 'POST',
        headers: {
          ...authHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keywords,
          sources,
        }),
      });
    } catch (error) {
      console.error('Error searching Islamic content:', error);
      throw error;
    }
  },

  /**
   * Save curated Islamic content as a khutbah topic
   * @param {string} topic - Topic name
   * @param {string} description - Topic description
   * @param {array} selectedAyah - Selected Quran verses
   * @param {array} selectedHadith - Selected Hadith
   * @param {string} keywords - Keywords used for search
   */
  saveCuratedTopic: async (topic, description, selectedAyah, selectedHadith, keywords) => {
    try {
      return await apiRequest('/api/khutbah/save-curated', {
        method: 'POST',
        headers: {
          ...authHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          description,
          selectedAyah,
          selectedHadith,
          keywords,
        }),
      });
    } catch (error) {
      console.error('Error saving curated topic:', error);
      throw error;
    }
  },

  /**
   * Get all khutbah suggestions
   * @param {string} status - Filter by status: 'suggested', 'selected', 'delivered'
   */
  getSuggestions: async (status = null) => {
    try {
      const qs = status ? `?status=${encodeURIComponent(status)}` : '';
      return await apiRequest(`/api/khutbah/suggestions${qs}`, {
        method: 'GET',
        headers: authHeaders(),
      });
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      throw error;
    }
  },

  /**
   * Get detailed information about a specific topic
   * @param {number} id - Topic ID
   */
  getTopicDetail: async (id) => {
    try {
      return await apiRequest(`/api/khutbah/suggestions/${id}`, {
        method: 'GET',
        headers: authHeaders(),
      });
    } catch (error) {
      console.error('Error fetching topic detail:', error);
      throw error;
    }
  },

  /**
   * Select a topic for next khutbah
   * @param {number} id - Topic ID
   */
  selectTopic: async (id) => {
    try {
      return await apiRequest(`/api/khutbah/suggestions/${id}/select`, {
        method: 'POST',
        headers: authHeaders(),
      });
    } catch (error) {
      console.error('Error selecting topic:', error);
      throw error;
    }
  },

  /**
   * Mark a topic as delivered
   * @param {number} id - Topic ID
   */
  markAsDelivered: async (id) => {
    try {
      return await apiRequest(`/api/khutbah/suggestions/${id}/delivered`, {
        method: 'POST',
        headers: authHeaders(),
      });
    } catch (error) {
      console.error('Error marking as delivered:', error);
      throw error;
    }
  }
};

export default khutbahService;
