import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Root Layout Component
 * Defines the main navigation structure for the app
 * Sets up stack navigation for all screens
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
      <Stack>
        {/* Splash Screen - Initial screen */}
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        
        {/* Login Screen */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        
        {/* Sign Up Screen */}
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        
        {/* Home Screen */}
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
