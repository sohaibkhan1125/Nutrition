# NutriTrack Admin Panel

## Overview
A professional admin panel for the NutriTrack nutrition calculator website, built with ReactJS, Tailwind CSS, and Firebase Authentication.

## Features

### 🔐 Authentication System
- **Firebase Authentication** with email/password login
- **Real-time authentication state** management
- **Protected routes** for admin dashboard
- **Session persistence** across browser reloads

### 📱 Admin Pages

#### Login Page (`/admin/login`)
- Clean, responsive design matching main website
- Email and password fields
- Firebase error handling
- Link to signup page
- Loading states during authentication

#### Signup Page (`/admin/signup`)
- Full name, email, password, and confirm password fields
- Password validation (minimum 6 characters)
- Password confirmation matching
- Firebase error handling
- Link to login page

#### Dashboard Page (`/admin/dashboard`)
- Protected route requiring authentication
- Welcome message and user information display
- User email and account details
- Logout functionality
- Placeholder sections for future features

### 🎨 Design Features
- **Consistent styling** with main website (red gradient theme)
- **Responsive design** for mobile and desktop
- **Clean white backgrounds** with subtle shadows
- **Rounded corners** and modern UI elements
- **Professional typography** and spacing

### 🛠 Technical Implementation

#### File Structure
```
src/
├── firebase.js                 # Firebase configuration
├── contexts/
│   └── AuthContext.jsx        # Authentication context
├── components/
│   ├── ProtectedRoute.jsx     # Route protection
│   └── Navbar.jsx             # Admin navigation
├── pages/
│   └── admin/
│       ├── Login.jsx          # Login page
│       ├── Signup.jsx         # Signup page
│       └── Dashboard.jsx     # Dashboard page
└── App.jsx                    # Main app with routing
```

#### Key Components
- **AuthProvider**: Manages authentication state across the app
- **ProtectedRoute**: Guards admin routes from unauthorized access
- **Navbar**: Admin panel navigation with user info and logout
- **Login/Signup**: Authentication forms with validation
- **Dashboard**: Admin panel main page

## Usage

### Accessing the Admin Panel
1. Navigate to `/admin/login` for login
2. Navigate to `/admin/signup` to create new account
3. Navigate to `/admin/dashboard` (requires authentication)

### Authentication Flow
1. **Signup**: Create account with email/password
2. **Login**: Sign in with credentials
3. **Dashboard**: Access protected admin area
4. **Logout**: Sign out and return to login

### Security Features
- **Route protection**: Unauthorized users redirected to login
- **Session management**: Authentication state persists
- **Error handling**: User-friendly error messages
- **Input validation**: Form validation before submission

## Firebase Configuration
The admin panel uses Firebase Authentication with the following configuration:
- **Project ID**: nutrition-a76a2
- **Authentication**: Email/Password
- **Real-time**: Authentication state monitoring

## Development
- Built with React 19.2.0
- Styled with Tailwind CSS 3.4.18
- Routing with React Router DOM
- Authentication with Firebase SDK

## Future Enhancements
The dashboard includes placeholder sections for:
- Analytics and reporting
- Settings management
- Admin tools and utilities
- User management features
