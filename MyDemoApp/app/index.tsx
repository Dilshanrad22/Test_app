import { Redirect } from 'expo-router';

/**
 * Index route - redirects to splash screen
 * This is the entry point of the app
 */
export default function Index() {
  return <Redirect href="/splash" />;
}