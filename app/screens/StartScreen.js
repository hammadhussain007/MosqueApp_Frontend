import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { Text, Button } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';

import MosqueLogo from "../components/MosqueLogo";
import { theme } from "../core/theme";

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <MosqueLogo size={120} color="#FFFFFF" />
            <Text style={styles.appName}>MasjidConnect</Text>
            <Text style={styles.tagline}>
              Connect, Learn, and Grow Together
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("LoginScreen")}
              style={styles.loginButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              buttonColor="#FFFFFF"
              textColor={theme.colors.primary}
            >
              Sign In
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate("RegisterScreen")}
              style={styles.registerButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              textColor="#FFFFFF"
            >
              Create Account
            </Button>
            <Text style={styles.footerText}>
              Join our community to stay connected with your mosque
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xxl * 2,
    paddingBottom: theme.spacing.xxl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  appName: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: theme.spacing.lg,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: theme.spacing.sm,
    textAlign: 'center',
    fontWeight: '400',
  },
  buttonContainer: {
    width: '100%',
  },
  loginButton: {
    borderRadius: theme.roundness.medium,
    marginBottom: theme.spacing.md,
  },
  registerButton: {
    borderRadius: theme.roundness.medium,
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  buttonContent: {
    paddingVertical: theme.spacing.sm,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    fontSize: 14,
  },
});
