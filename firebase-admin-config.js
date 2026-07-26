// Firebase Admin SDK Configuration for Backend
// This is for server-side Firebase operations

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hela-pesa-641b4-default-rtdb.firebaseio.com"
});

const db = admin.firestore();
const auth = admin.auth();

// Admin utility functions
const adminUtils = {
    // Create user with email and password
    async createUser(email, password, userData) {
        try {
            const user = await auth.createUser({
                email: email,
                password: password,
                displayName: userData.fullName
            });

            // Store additional user data
            await db.collection('users').doc(user.uid).set({
                ...userData,
                createdAt: admin.firestore.Timestamp.now()
            });

            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    // Get user data
    async getUserData(uid) {
        try {
            const doc = await db.collection('users').doc(uid).get();
            return doc.exists ? doc.data() : null;
        } catch (error) {
            console.error('Error getting user data:', error);
            throw error;
        }
    },

    // Update user data
    async updateUserData(uid, data) {
        try {
            await db.collection('users').doc(uid).update({
                ...data,
                updatedAt: admin.firestore.Timestamp.now()
            });
        } catch (error) {
            console.error('Error updating user data:', error);
            throw error;
        }
    },

    // Create loan application
    async createLoanApplication(uid, loanData) {
        try {
            const docRef = await db.collection('loan_applications').add({
                ...loanData,
                userId: uid,
                status: 'pending',
                createdAt: admin.firestore.Timestamp.now()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error creating loan application:', error);
            throw error;
        }
    },

    // Get loan applications for user
    async getUserLoanApplications(uid) {
        try {
            const snapshot = await db.collection('loan_applications')
                .where('userId', '==', uid)
                .orderBy('createdAt', 'desc')
                .get();

            const applications = [];
            snapshot.forEach(doc => {
                applications.push({ id: doc.id, ...doc.data() });
            });

            return applications;
        } catch (error) {
            console.error('Error getting loan applications:', error);
            throw error;
        }
    },

    // Update loan application status
    async updateLoanStatus(applicationId, status, notes = '') {
        try {
            await db.collection('loan_applications').doc(applicationId).update({
                status: status,
                statusUpdatedAt: admin.firestore.Timestamp.now(),
                statusNotes: notes
            });
        } catch (error) {
            console.error('Error updating loan status:', error);
            throw error;
        }
    },

    // Verify user phone number
    async verifyPhoneNumber(uid, phoneNumber) {
        try {
            await auth.updateUser(uid, {
                phoneNumber: phoneNumber
            });
        } catch (error) {
            console.error('Error verifying phone number:', error);
            throw error;
        }
    }
};

module.exports = { admin, db, auth, adminUtils };