import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";

import { store, persistor } from "./app/store";
import { theme } from "./app/core/theme";
import ErrorBoundary from "./app/components/ErrorBoundary";

import LoadingScreen from "./app/screens/LoadingScreen";
import { loadStoredAuth } from "./app/services/auth";

/* 🔹 EXISTING SCREENS */
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  MainTabs,
  ProfileScreen,
} from "./app/screens";
//test


import OtpVerificationScreen from './screens/OtpVerficationScreen'; // ✅ import OTP screen

/* 🔹 IMAM BOOKING MODULE SCREENS */
import ServiceSelectionScreen from "./screens/ImanBookingAndScheduling/ServiceSelectionScreen";
import ServiceRequestFormScreen from "./screens/ImanBookingAndScheduling/ServiceRequestFormScreen";
import NearbyImamsScreen from "./screens/ImanBookingAndScheduling/NearbyImamsScreen";
import ImamDetailScreen from "./screens/ImanBookingAndScheduling/ImamDetailScreen";
import BookingConfirmationScreen from "./screens/ImanBookingAndScheduling/BookingConfirmationScreen";
import BookingStatusScreen from "./screens/ImanBookingAndScheduling/BookingStatusScreen";
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserRole } from './app/store/slices/userSlice';

const Stack = createStackNavigator();
const ImamBookingStack = createStackNavigator();
enableScreens();

function ImamBookingStackScreen() {
  return (
    <ImamBookingStack.Navigator screenOptions={{ headerShown: false }}>
      <ImamBookingStack.Screen
        name="ServiceSelection"
        component={ServiceSelectionScreen}
      />
      <ImamBookingStack.Screen
        name="ServiceRequestForm"
        component={ServiceRequestFormScreen}
      />
      <ImamBookingStack.Screen
        name="NearbyImams"
        component={NearbyImamsScreen}
      />
      <ImamBookingStack.Screen
        name="ImamDetail"
        component={ImamDetailScreen}
      />
      <ImamBookingStack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
      />
      <ImamBookingStack.Screen
        name="BookingStatus"
        component={BookingStatusScreen}
      />
    </ImamBookingStack.Navigator>
  );
}

function ProtectedImamBooking({ navigation }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('LoginScreen');
    } else if (role !== 'imam') {
      navigation.replace('MainTabs');
    }
  }, [isAuthenticated, role, navigation]);

  if (!isAuthenticated || role !== 'imam') return null;
  return <ImamBookingStackScreen />;
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const initializeAuth = async () => {
      await loadStoredAuth();
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
                  initialRouteName="ImamBooking"
                  screenOptions={{ headerShown: false }}
                >
                  {/* 🔹 IMAM BOOKING FLOW (nested under ImamBooking) */}
                  <Stack.Screen
                    name="ImamBooking"
                    component={ProtectedImamBooking}
                  />

                  {/* 🔹 AUTH / OTHER SCREENS */}
                  <Stack.Screen name="StartScreen" component={StartScreen} />
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                  <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                  />
                  <Stack.Screen
                    name="ResetPasswordScreen"
                    component={ResetPasswordScreen}
                  />
                  <Stack.Screen name="MainTabs" component={MainTabs} />
                  <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{ headerShown: true, title: "Profile" }}
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
