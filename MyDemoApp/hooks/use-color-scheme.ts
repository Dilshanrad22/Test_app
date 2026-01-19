import { useColorScheme as useColorSchemeRN } from 'react-native';

/**
 * Simple color scheme hook
 * Returns 'light', 'dark', or null
 */
export function useColorScheme() {
  return useColorSchemeRN();
}