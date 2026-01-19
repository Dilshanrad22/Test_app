# My Demo App - React Native Mobile Application

A simple React Native mobile app built with Expo Router, featuring multiple screens with form validation and navigation.

## 📱 Features

### 1. **Splash Screen** (`/splash`)
- Company logo display
- App title: "My Demo App" 
- Version display: "1.0.0"
- Auto-navigation to login screen after 3 seconds

### 2. **Login Screen** (`/login`)
- Company logo
- Username and Password input fields
- Form validation with error messages
- "Sign Up" navigation link
- "Login" button with validation
- "Back" button to exit app

### 3. **Sign Up Screen** (`/signup`)
- Complete registration form with fields:
  - First Name & Last Name (required)
  - Gender selection (Male/Female radio buttons)
  - Mobile Number (10-15 digits validation)
  - Email (email format validation)
  - Country dropdown (fetched from REST API)
  - Password with strength validation:
    - 8-30 characters length
    - Upper & lowercase letters
    - At least 1 number
    - At least 1 special character (!@#$%^&*+)
  - Confirm Password (matching validation)
  - Terms & Conditions checkbox
- Real-time field validation
- Countries fetched from: `https://restcountries.com/v3.1/all?fields=name`

### 4. **Home Screen** (`/home`)
- Welcome message
- Company logo
- "Back" button to exit app

## 🏗️ Project Structure

```
MyDemoApp/
├── app/                    # Screen components
│   ├── _layout.tsx        # Main navigation layout
│   ├── index.tsx          # Entry point (redirects to splash)
│   ├── splash.tsx         # Splash screen
│   ├── login.tsx          # Login screen
│   ├── signup.tsx         # Sign up screen
│   └── home.tsx           # Home screen
├── assets/
│   └── images/            # App icons and logos
├── components/            # Reusable UI components
├── constants/             # App constants and themes
└── hooks/                 # Custom React hooks
```

## 🛠️ Technical Implementation

### **Navigation**
- **Expo Router** for file-based routing
- **Stack Navigation** between screens
- Programmatic navigation with `router.push()` and `router.replace()`

### **Form Validation**
- Real-time field validation
- Custom validation functions
- Error state management
- User-friendly error messages

### **API Integration**
- REST Countries API for country list
- Async/await for API calls
- Error handling for network requests

### **UI Components**
- Custom dropdown modal for country selection
- Radio buttons for gender selection
- Checkbox for terms agreement
- Responsive design with proper styling

## 🚀 How to Run

1. **Navigate to project directory:**
   ```bash
   cd "MyDemoApp"
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Test the app:**
   - **Web**: Open `http://localhost:8081`
   - **Mobile**: Scan QR code with Expo Go app
   - **Android**: Press `a` (requires Android emulator)
   - **iOS**: Press `i` (requires iOS simulator on Mac)

## 💡 Code Highlights for Interview

### **Clean Architecture:**
- Separated concerns with individual screen components
- Reusable validation functions
- Consistent styling patterns
- Well-commented code for maintainability

### **State Management:**
- React hooks (`useState`, `useEffect`)
- Form state management
- Error state handling

### **Best Practices:**
- TypeScript interfaces for type safety
- Async/await for API calls
- Input sanitization and validation
- User experience considerations (loading states, error messages)

### **Navigation Flow:**
```
Splash (3s) → Login ↔ Sign Up
     ↓           ↓
   Exit       Home → Exit
```

## 🔧 Key Validation Rules

- **Username**: Minimum 3 characters
- **Password**: Complex requirements with specific criteria
- **Email**: Valid email format
- **Mobile**: 10-15 digit numbers only
- **All fields**: Required field validation
- **Terms**: Must be agreed to proceed

## 📦 Dependencies

- **React Native** (0.81.5)
- **Expo** (~54.0.31)  
- **Expo Router** (~6.0.21)
- **TypeScript** (~5.9.2)

## 🎯 Interview Talking Points

1. **Component Architecture**: How screens are structured and organized
2. **State Management**: Form handling and validation logic
3. **Navigation**: File-based routing with Expo Router
4. **API Integration**: REST API consumption and error handling
5. **User Experience**: Form validation, loading states, and error messages
6. **Code Quality**: TypeScript, comments, and maintainable structure