import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { theme } from '../core/theme';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>⚠️ Something Went Wrong</Text>
            
            <Text style={styles.errorMessage}>
              {this.state.error?.toString()}
            </Text>

            {this.state.errorInfo && (
              <View style={styles.errorBox}>
                <Text style={styles.stackTrace}>
                  {this.state.errorInfo.componentStack}
                </Text>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <Button 
                mode="contained"
                onPress={() => {
                  this.setState({ hasError: false, error: null, errorInfo: null });
                  // Try to reload the app
                  if (this.props.onReset) {
                    this.props.onReset();
                  }
                }}
                style={styles.button}
              >
                Try Again
              </Button>
            </View>
          </ScrollView>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0',
    padding: 20,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#c62828',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    fontFamily: 'monospace',
  },
  errorBox: {
    backgroundColor: '#fff9c4',
    borderLeftWidth: 4,
    borderLeftColor: '#f57f17',
    padding: 12,
    marginBottom: 16,
    borderRadius: 4,
  },
  stackTrace: {
    fontSize: 11,
    color: '#827717',
    fontFamily: 'monospace',
    lineHeight: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginVertical: 8,
  },
});
