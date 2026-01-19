import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

/**
 * Login Screen Component
 * Contains username/password fields with validation
 * Navigation to sign-up and home screens
 */
export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });

  /**
   * Validate login form fields
   * Returns true if all fields are valid
   */
  const validateForm = () => {
    const newErrors = { username: '', password: '' };
    let isValid = true;

    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handle login button press
   * Validates form and navigates to home screen if valid
   */
  const handleLogin = () => {
    if (validateForm()) {
      // For demo purposes, accept any valid input
      router.replace('/home');
    }
  };

  /**
   * Handle sign up link press
   * Navigates to sign up screen
   */
  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      {/* Company Logo */}
      <Image 
        source={require('@/assets/images/mylogo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Login</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.username ? styles.inputError : null]}
          placeholder="User Name"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          selectionColor="#007bff"
          underlineColorAndroid="transparent"
        />
        {errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, errors.password ? styles.inputError : null]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          selectionColor="#007bff"
          underlineColorAndroid="transparent"
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
      </View>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={handleSignUp} style={styles.signupLink}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  inputError: {
    borderColor: '#0066cc',
  },
  errorText: {
    color: '#0066cc',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  signupLink: {
    marginBottom: 20,
  },
  signupText: {
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});