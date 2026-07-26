# Hela Pesa - Fast Online Loans in Kenya

![Hela Pesa Logo](zashlogo.jpeg)

A modern, responsive web application for fast online loan processing in Kenya. Get your first loan in just 6 minutes with our streamlined application process.

## Features

- **Fast Processing**: Get approved and funded in under 6 minutes
- **Secure**: End-to-end encryption protects your personal data
- **Affordable**: Transparent processing fee of only 6.4%, no hidden charges
- **Mobile-First**: Fully responsive design that works on all devices
- **Accessibility**: WCAG-compliant forms and navigation
- **Modern UI**: Clean, professional design with smooth animations
- **Firebase Integration**: Cloud storage and authentication ready

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd hela-pesa
   ```

2. **Open the application:**
   Simply open `index.html` in your web browser to start using the application.

## Application Flow

1. **Registration**: Enter your phone number to create an account
2. **Personal Information**: Fill in your personal details (name, ID, email, etc.)
3. **Additional Details**: Provide county, education, employment, and referee information
4. **Loan Limit Check**: System evaluates and approves your loan limit
5. **Loan Request**: Select your desired loan amount and M-Pesa details
6. **Verification**: Confirm payment via M-Pesa
7. **Disbursement**: Receive funds directly to your M-Pesa account

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS for rapid development
- **Database**: Firebase Firestore for cloud storage
- **Authentication**: Firebase Auth for user management
- **Backend**: Firebase Admin SDK for server-side operations
- **Storage**: Firebase Realtime Database for data persistence

## Firebase Configuration

### Client-Side (Web)
The frontend uses Firebase client SDK for user interactions:
- Authentication
- Data storage
- Real-time updates

### Server-Side (Admin)
For backend operations, use the Firebase Admin SDK:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hela-pesa-641b4-default-rtdb.firebaseio.com"
});
```

## File Structure

```
hela-pesa/
├── index.html              # Main landing page
├── register.html           # Phone number registration
├── signup.html            # Personal information form
├── otherdetails.html      # Additional details form
├── checklimit.html        # Loan limit evaluation
├── loan.html              # Loan amount selection
├── verification.html      # Payment verification
├── password.html          # Disbursement process
├── success.html           # Success confirmation
├── confirmdetails.html    # Details confirmation
├── firebase-config.js     # Firebase client configuration
├── firebase-admin-config.js # Firebase Admin SDK configuration
├── main.css               # Modern CSS styles
├── get.css                # Additional styles
├── other.css              # Supplementary styles
├── veri.css               # Verification styles
├── zashlogo.jpeg          # Logo image
└── README.md              # This file
```

## Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "Hela Pesa"
3. Enable Authentication (Email/Password, Phone)
4. Enable Firestore Database
5. Enable Realtime Database

### 2. Configure Web App
1. Add a new web app to your Firebase project
2. Copy the configuration and update `firebase-config.js`
3. Enable authentication methods in Firebase Console

### 3. Server Setup
1. Generate a service account key from Firebase Console
2. Download the JSON file as `serviceAccountKey.json`
3. Install Firebase Admin SDK: `npm install firebase-admin`
4. Use `firebase-admin-config.js` for backend operations

### 4. Security Rules
Configure Firestore security rules for data protection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /loan_applications/{applicationId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## Key Improvements

### Code Quality
- **Modern CSS**: Replaced outdated styles with modern, maintainable CSS
- **Accessibility**: Added proper labels, ARIA attributes, and semantic HTML
- **Performance**: Optimized images and reduced unnecessary DOM manipulations
- **Consistency**: Standardized naming conventions and code structure

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Smooth animations and loading indicators
- **Form Validation**: Client-side validation with helpful error messages
- **Progress Indicators**: Clear feedback during the application process

### Security
- **Input Sanitization**: Proper handling of user inputs
- **Data Protection**: Secure storage of sensitive information
- **HTTPS Ready**: Prepared for secure deployment

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## Development

This project uses vanilla JavaScript and modern CSS. No build tools are required for basic development.

### Adding New Features

1. Follow the existing code patterns and naming conventions
2. Ensure all forms have proper labels and accessibility attributes
3. Test on multiple screen sizes and browsers
4. Update this README if new features are added

## License

This project is for educational purposes. Please respect all applicable laws and regulations when using or modifying this code.

## Support

For questions or support, please contact:
- Email: support@helapesa.co.ke
- Phone: 0701-201-0001 (Mon–Sun: 8AM–6PM)

---

**Note**: This is a demonstration application. Always ensure compliance with local financial regulations when implementing real loan services.

## Firebase Admin SDK Usage

The `firebase-admin-config.js` file provides server-side utilities for:

- **User Management**: Create, update, and manage user accounts
- **Loan Processing**: Handle loan applications and status updates
- **Data Analytics**: Access user and loan data for reporting
- **Security**: Implement server-side validation and security measures

### Example Usage

```javascript
const { adminUtils } = require('./firebase-admin-config');

// Create a new user
const user = await adminUtils.createUser('user@example.com', 'password123', {
  fullName: 'John Doe',
  phoneNumber: '+254712345678'
});

// Create a loan application
const applicationId = await adminUtils.createLoanApplication(user.uid, {
  amount: 5000,
  serviceFee: 310,
  phone: '+254712345678'
});

// Update loan status
await adminUtils.updateLoanStatus(applicationId, 'approved', 'Loan approved by manager');
```

This backend configuration enables secure server-side operations while maintaining the frontend's user-friendly interface.