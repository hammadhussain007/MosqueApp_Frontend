// API configuration and base URL
export const API_URL = __DEV__ 
    ? 'http://localhost:3000'  // Android emulator localhost (10.0.2.2 maps to host's localhost)
    : 'https://your-production-api.com';

import { store } from '../store';

// Authentication header helper
export const getAuthHeader = (token) => ({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
});

// API request wrapper with error handling
export const apiRequest = async (endpoint, options = {}) => {
    try {
        console.log('Making API request to:', `${API_URL}${endpoint}`);
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            },
        });

        let data;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
            console.log('API Response data:', data);
        } else {
            throw new Error('Server returned non-JSON response');
        }

        if (!response.ok) {
            throw new Error(data.error || 'Request failed');
        }

        return data;
    } catch (error) {
        console.error('API Request failed:', error);
        if (error.message === 'Failed to fetch') {
            throw new Error('Network error. Please check your connection.');
        }
        throw error;
    }
};

// Authentication service functions
export const authService = {
    login: (email, password) => {
        return apiRequest('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },

    register: (name, email, password) => {
        return apiRequest('/api/sign-up', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
    },

    forgotPassword: (email) => {
        return apiRequest('/api/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    },
};

// Profile service functions
export const profileService = {
    getProfile: () => {
        return apiRequest('/api/profile', {
            method: 'GET',
            headers: getAuthHeader(store.getState().user.token),
        });
    },

    updateProfile: (profileData) => {
        return apiRequest('/api/profile', {
            method: 'PUT',
            headers: getAuthHeader(store.getState().user.token),
            body: JSON.stringify(profileData),
        });
    },

    updateAvatar: (formData) => {
        return apiRequest('/api/profile/avatar', {
            method: 'POST',
            headers: {
                ...getAuthHeader(store.getState().user.token),
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });
    },
};

// Forum service functions
export const forumService = {
    getAllPosts: () => {
        return apiRequest('/api/forum/posts', {
            method: 'GET',
            headers: getAuthHeader(store.getState().user.token),
        });
    },

    getPostById: (postId) => {
        return apiRequest(`/api/forum/posts/${postId}`, {
            method: 'GET',
            headers: getAuthHeader(store.getState().user.token),
        });
    },

    createPost: (title, content) => {
        return apiRequest('/api/forum/posts', {
            method: 'POST',
            headers: getAuthHeader(store.getState().user.token),
            body: JSON.stringify({ title, content }),
        });
    },

    addComment: (postId, content) => {
        return apiRequest('/api/forum/posts/comment', {
            method: 'POST',
            headers: getAuthHeader(store.getState().user.token),
            body: JSON.stringify({ postId, content }),
        });
    },

    toggleLike: (postId) => {
        return apiRequest('/api/forum/posts/like', {
            method: 'POST',
            headers: getAuthHeader(store.getState().user.token),
            body: JSON.stringify({ postId }),
        });
    },
};

// Announcement service functions
export const announcementService = {
    getAllAnnouncements: () => {
        return apiRequest('/api/announcements', {
            method: 'GET',
            headers: getAuthHeader(store.getState().user.token),
        });
    },

    createAnnouncement: (title, content) => {
        return apiRequest('/api/announcements', {
            method: 'POST',
            headers: getAuthHeader(store.getState().user.token),
            body: JSON.stringify({ title, content }),
        });
    },
};

// Notifications service functions
export const notificationService = {
    getNotifications: (params = {}) => {
        const qs = new URLSearchParams(params).toString();
        const endpoint = `/api/notifications${qs ? `?${qs}` : ''}`;
        return apiRequest(endpoint, {
            method: 'GET',
            headers: getAuthHeader(store.getState().user.token),
        });
    },
};