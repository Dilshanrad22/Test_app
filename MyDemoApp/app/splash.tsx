import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';


export default function SplashScreen() {
  useEffect(() => {
    // Auto navigate to login screen after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
    
      <Image 
        source={require('@/assets/images/mylogo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      
 
      <Text style={styles.title}>My Demo App</Text>
      
  
      <Text style={styles.version}>Version 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  version: {
    fontSize: 16,
    color: '#666666',
  },
});