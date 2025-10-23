import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../store';
import { setUserProfile, setToken } from '../store/slices/userSlice';

export const loadStoredAuth = async () => {
  try {
    const [token, userData] = await Promise.all([
      AsyncStorage.getItem('userToken'),
      AsyncStorage.getItem('userData')
    ]);

    if (token && userData) {
      store.dispatch(setToken(token));
      store.dispatch(setUserProfile(JSON.parse(userData)));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error loading stored auth:', error);
    return false;
  }
};

export const saveAuth = async (token, userData) => {
  try {
    await Promise.all([
      AsyncStorage.setItem('userToken', token),
      AsyncStorage.setItem('userData', JSON.stringify(userData))
    ]);
  store.dispatch(setToken(token));
  store.dispatch(setUserProfile(userData));
  } catch (error) {
    console.error('Error saving auth:', error);
  }
};

export const clearAuth = async () => {
  try {
    await Promise.all([
      AsyncStorage.removeItem('userToken'),
      AsyncStorage.removeItem('userData')
    ]);
  store.dispatch(setToken(null));
  store.dispatch(setUserProfile(null));
  } catch (error) {
    console.error('Error clearing auth:', error);
  }
};