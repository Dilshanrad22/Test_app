import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Alert,
  Modal,
  FlatList
} from 'react-native';
import { router } from 'expo-router';

// Interface for country data from API
interface Country {
  name: {
    common: string;
  };
}

/**
 * Sign Up Screen Component
 * Contains registration form with validation
 * Fetches country list from REST API
 */
export default function SignUpScreen() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    mobile: '',
    email: '',
    country: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  // Countries list from API
  const [countries, setCountries] = useState<string[]>([]);
  
  // Modal state for country picker
  const [showCountryModal, setShowCountryModal] = useState(false);
  
  // Form errors
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  /**
   * Fetch countries list from REST API on component mount
   */
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
      const data: Country[] = await response.json();
      const countryNames = data
        .map(country => country.name.common)
        .sort();
      setCountries(countryNames);
    } catch (error) {
      console.error('Error fetching countries:', error);
      Alert.alert('Error', 'Failed to load countries list');
    }
  };

  /**
   * Update form field value
   */
  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  /**
   * Validate password according to requirements
   */
  const validatePassword = (password: string) => {
    const minLength = password.length >= 8 && password.length <= 30;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*+]/.test(password);

    if (!minLength) return 'Password must be 8-30 characters long';
    if (!hasLowerCase) return 'Password must contain lowercase letters';
    if (!hasUpperCase) return 'Password must contain uppercase letters';
    if (!hasNumber) return 'Password must contain at least 1 number';
    if (!hasSpecialChar) return 'Password must contain special characters (!@#$%^&*+)';
    
    return '';
  };

  /**
   * Validate email format
   */
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate mobile number format
   */
  const validateMobile = (mobile: string) => {
    const mobileRegex = /^[0-9]{10,15}$/;
    return mobileRegex.test(mobile);
  };

  /**
   * Validate all form fields
   */
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Required field validations
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!validateMobile(formData.mobile)) newErrors.mobile = 'Invalid mobile number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.country) newErrors.country = 'Please select country';
    if (!formData.password) newErrors.password = 'Password is required';
    else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle sign up button press
   */
  const handleSignUp = () => {
    if (validateForm()) {
      Alert.alert(
        'Success',
        'Account created successfully!',
        [{ text: 'OK', onPress: () => router.replace('/login') }]
      );
    }
  };

  /**
   * Handle back button press
   */
  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign Up</Text>

        {/* First Name */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.firstName ? styles.inputError : null]}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(text) => updateField('firstName', text)}
          />
          {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}
        </View>

        {/* Last Name */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.lastName ? styles.inputError : null]}
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(text) => updateField('lastName', text)}
          />
          {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
        </View>

        {/* Gender Selection */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity 
              style={styles.radioOption}
              onPress={() => updateField('gender', 'male')}
            >
              <View style={[styles.radio, formData.gender === 'male' && styles.radioSelected]} />
              <Text style={styles.radioText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.radioOption}
              onPress={() => updateField('gender', 'female')}
            >
              <View style={[styles.radio, formData.gender === 'female' && styles.radioSelected]} />
              <Text style={styles.radioText}>Female</Text>
            </TouchableOpacity>
          </View>
          {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
        </View>

        {/* Mobile Number */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.mobile ? styles.inputError : null]}
            placeholder="Mobile No"
            value={formData.mobile}
            onChangeText={(text) => updateField('mobile', text)}
            keyboardType="phone-pad"
          />
          {errors.mobile ? <Text style={styles.errorText}>{errors.mobile}</Text> : null}
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.email ? styles.inputError : null]}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        {/* Country Dropdown */}
        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={[styles.countryButton, errors.country ? styles.inputError : null]}
            onPress={() => setShowCountryModal(true)}
          >
            <Text style={[styles.countryButtonText, !formData.country && styles.placeholder]}>
              {formData.country || 'Select Country'}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {errors.country ? <Text style={styles.errorText}>{errors.country}</Text> : null}
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.password ? styles.inputError : null]}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => updateField('password', text)}
            secureTextEntry
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => updateField('confirmPassword', text)}
            secureTextEntry
          />
          {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
        </View>

        {/* Terms and Conditions Checkbox */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity 
            style={styles.checkbox}
            onPress={() => updateField('agreeTerms', !formData.agreeTerms)}
          >
            <View style={[styles.checkboxBox, formData.agreeTerms && styles.checkboxChecked]}>
              {formData.agreeTerms && <Text style={styles.checkboxTick}>✓</Text>}
            </View>
            <Text style={styles.checkboxText}>I agree with Terms & Conditions</Text>
          </TouchableOpacity>
          {errors.agreeTerms ? <Text style={styles.errorText}>{errors.agreeTerms}</Text> : null}
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        {/* Country Selection Modal */}
        <Modal
          visible={showCountryModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowCountryModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Country</Text>
                <TouchableOpacity 
                  style={styles.modalCloseButton}
                  onPress={() => setShowCountryModal(false)}
                >
                  <Text style={styles.modalCloseText}>✕</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={countries}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.countryOption}
                    onPress={() => {
                      updateField('country', item);
                      setShowCountryModal(false);
                    }}
                  >
                    <Text style={styles.countryOptionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  inputError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#dddddd',
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  radioText: {
    fontSize: 16,
    color: '#333333',
  },
  countryButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  countryButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  placeholder: {
    color: '#999999',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666666',
  },
  checkboxContainer: {
    marginBottom: 30,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#dddddd',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  checkboxTick: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  signupButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalCloseButton: {
    padding: 5,
  },
  modalCloseText: {
    fontSize: 18,
    color: '#666666',
  },
  countryOption: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  countryOptionText: {
    fontSize: 16,
    color: '#333333',
  },
});