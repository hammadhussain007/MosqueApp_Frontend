import { MD3LightTheme } from "react-native-paper";

// Modern Islamic-inspired color palette
export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Primary brand colors - Islamic green with modern touch
    primary: "#00897B",        // Teal green (mosque/Islamic theme)
    primaryLight: "#4DB6AC",
    primaryDark: "#00695C",
    
    // Secondary accent
    secondary: "#26A69A",
    accent: "#FFB300",         // Gold accent
    
    // UI colors
    background: "#F5F7FA",
    surface: "#FFFFFF",
    text: "#1A1A1A",
    textSecondary: "#757575",
    
    // Status colors
    error: "#D32F2F",
    success: "#388E3C",
    warning: "#F57C00",
    info: "#1976D2",
    
    // Borders and dividers
    border: "#E0E0E0",
    divider: "#EEEEEE",
    
    // Override default MD3 colors
    onSurface: "#1A1A1A",
    onBackground: "#1A1A1A",
  },
  
  // Modern spacing system
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Shadows for cards and elevated elements
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 6,
    },
  },
  
  // Border radius
  roundness: {
    small: 8,
    medium: 12,
    large: 16,
    full: 9999,
  },
};
