import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";

import { store, persistor } from './app/store';
import { theme } from "./app/core/theme";
import ErrorBoundary from './app/components/ErrorBoundary';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  HomeScreen,
  MainTabs,
  ProfileScreen,
} from "./app/screens";
//test

import LoadingScreen from './app/screens/LoadingScreen';
import { loadStoredAuth } from './app/services/auth';
import OtpVerificationScreen from './screens/OtpVerficationScreen'; // ✅ import OTP screen

const Stack = createStackNavigator();

enableScreens();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const initializeAuth = async () => {
      const authLoaded = await loadStoredAuth();
      setIsAuthenticated(authLoaded);
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return (
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <LoadingScreen />
        </PaperProvider>
      </ReduxProvider>
    );
  }

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider theme={theme}>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName={isAuthenticated ? "MainTabs" : "StartScreen"}
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="StartScreen" component={StartScreen} />
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                  <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                  <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                  <Stack.Screen name="MainTabs" component={MainTabs} />
                  <Stack.Screen 
                    name="ProfileScreen" 
                    component={ProfileScreen}
                    options={{
                      headerShown: true,
                      title: 'Profile',
                    }}
                  />
                   {/* ✅ Add OTP screen here */}
                <Stack.Screen 
                  name="OtpVerification" 
                  component={OtpVerificationScreen} 
                />
                </Stack.Navigator>
              </NavigationContainer>
            </PaperProvider>
          </GestureHandlerRootView>
        </ErrorBoundary>
      </PersistGate>
    </ReduxProvider>
  );
}