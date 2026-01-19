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

/* 🔹 IMAM BOOKING MODULE SCREENS */
import ServiceSelectionScreen from "./app/screens/ImamBookingAndScheduling/ServiceSelectionScreen";
import ServiceRequestFormScreen from "./app/screens/ImamBookingAndScheduling/ServiceRequestFormScreen";
import NearbyImamsScreen from "./app/screens/ImamBookingAndScheduling/NearbyImamsScreen";
import ImamDetailScreen from "./app/screens/ImamBookingAndScheduling/ImamDetailScreen";
import BookingConfirmationScreen from "./app/screens/ImamBookingAndScheduling/BookingConfirmationScreen";
import BookingStatusScreen from "./app/screens/ImamBookingAndScheduling/BookingStatusScreen";

const Stack = createStackNavigator();
enableScreens();

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
                  initialRouteName="ServiceSelection"
                  screenOptions={{ headerShown: false }}
                >
                  {/* 🔹 IMAM BOOKING FLOW */}
                  <Stack.Screen
                    name="ServiceSelection"
                    component={ServiceSelectionScreen}
                  />
                  <Stack.Screen
                    name="ServiceRequestForm"
                    component={ServiceRequestFormScreen}
                  />
                  <Stack.Screen
                    name="NearbyImams"
                    component={NearbyImamsScreen}
                  />
                  <Stack.Screen
                    name="ImamDetail"
                    component={ImamDetailScreen}
                  />
                  <Stack.Screen
                    name="BookingConfirmation"
                    component={BookingConfirmationScreen}
                  />
                  <Stack.Screen
                    name="BookingStatus"
                    component={BookingStatusScreen}
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
                </Stack.Navigator>
              </NavigationContainer>
            </PaperProvider>
          </GestureHandlerRootView>
        </ErrorBoundary>
      </PersistGate>
    </ReduxProvider>
  );
}

