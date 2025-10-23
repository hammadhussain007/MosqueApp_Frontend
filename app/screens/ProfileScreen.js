import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Avatar, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { CommonActions } from '@react-navigation/native';

import { profileService } from '../services/api';
import { updateProfile, selectUser, logout } from '../store/slices/userSlice';
import { clearAuth } from '../services/auth';
import { theme } from '../core/theme';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await profileService.updateProfile(formData);
      dispatch(updateProfile(response.user));
      // Show success message
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarPick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        const formData = new FormData();
        formData.append('avatar', {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        });

        const response = await profileService.updateAvatar(formData);
        dispatch(updateProfile(response.user));
      }
    } catch (err) {
      setError('Failed to update avatar');
    }
  };

  const handleSignOut = async () => {
    try {
      await clearAuth();
      dispatch(logout());
      // Force app to reload to reset navigation state
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],
        })
      );
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={120}
          source={user?.avatar ? { uri: user.avatar } : require('../../assets/default-avatar.png')}
        />
        <Button onPress={handleAvatarPick} mode="text">
          Change Photo
        </Button>
      </View>

      {error ? (

        <Text style={styles.error}>{error}</Text>
      ) : null}

      <TextInput
        label="Full Name"
        value={formData.fullName}
        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        style={styles.input}
        disabled
      />

      <TextInput
        label="Phone"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
        style={styles.input}
        keyboardType="phone-pad"
      />

      <TextInput
        label="Address"
        value={formData.address}
        onChangeText={(text) => setFormData({ ...formData, address: text })}
        style={styles.input}
        multiline
      />

      <Button
        mode="contained"
        onPress={handleUpdate}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Update Profile
      </Button>

      <Button
        mode="outlined"
        onPress={handleSignOut}
        style={styles.signOutButton}
        textColor={theme.colors.error}
      >
        Sign Out
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
  },
  signOutButton: {
    marginBottom: 30,
    borderColor: theme.colors.error,
  },
  error: {
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: 10,
  },
});