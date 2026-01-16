import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { saveAuth } from "../services/auth";

import MosqueLogo from "../components/MosqueLogo";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { authService } from "../services/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onLoginPressed = async () => {
    // Clear previous errors
    setServerError("");

    // Validate inputs
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);
    try {
      // Attempt login
      const response = await authService.login(email.value, password.value);
      
      console.log('Login response:', response); // Debug log
      
      if (!response || (!response.token && !response.accessToken)) {
        throw new Error('No authentication token received');
      }
      
      const token = response.token || response.accessToken;
      const userData = response.user || response.userData || response;
      
      console.log('User data being saved:', userData); // Debug log
      console.log('User role:', userData?.role); // Debug log
      
      // Store the auth data using the auth service
      await saveAuth(token, userData);
      
      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } catch (error) {
      console.error('Login error:', error);
      setServerError(
        error.message === 'Invalid response from server' 
          ? 'Server returned an invalid response' 
          : error.message || 'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <MosqueLogo size={80} color={theme.colors.primary} />
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue to Mosque App</Text>
          </View>

          <Card style={styles.card}>
            <Card.Content>
              <TextInput
                label="Email"
                mode="outlined"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: "" })}
                error={!!email.error}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
                outlineColor={theme.colors.border}
                activeOutlineColor={theme.colors.primary}
                left={<TextInput.Icon icon="email-outline" />}
              />
              {email.error ? (
                <Text style={styles.errorText}>{email.error}</Text>
              ) : null}

              <TextInput
                label="Password"
                mode="outlined"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: "" })}
                error={!!password.error}
                secureTextEntry
                style={styles.input}
                outlineColor={theme.colors.border}
                activeOutlineColor={theme.colors.primary}
                left={<TextInput.Icon icon="lock-outline" />}
              />
              {password.error ? (
                <Text style={styles.errorText}>{password.error}</Text>
              ) : null}

              <TouchableOpacity
                onPress={() => navigation.navigate("ResetPasswordScreen")}
                style={styles.forgotPassword}
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {serverError ? (
                <Text style={styles.serverError}>{serverError}</Text>
              ) : null}

              <Button
                mode="contained"
                onPress={onLoginPressed}
                loading={loading}
                disabled={loading}
                style={styles.loginButton}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
              >
                Sign In
              </Button>
            </Card.Content>
          </Card>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: theme.spacing.lg,
  },
  backButton: {
    marginBottom: theme.spacing.md,
  },
  backText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: theme.spacing.md,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  card: {
    borderRadius: theme.roundness.large,
    ...theme.shadows.medium,
  },
  input: {
    marginBottom: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginBottom: theme.spacing.sm,
    marginLeft: theme.spacing.xs,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginVertical: theme.spacing.sm,
  },
  forgotText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  serverError: {
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    fontSize: 14,
  },
  loginButton: {
    marginTop: theme.spacing.md,
    borderRadius: theme.roundness.medium,
  },
  buttonContent: {
    paddingVertical: theme.spacing.sm,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  signupLink: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});
