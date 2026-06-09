import { initializeApp } from 'firebase/app';
import { getAI } from 'firebase/ai';

/*
 * Setup:
 * 1. Copy this file to src/firebase.js.
 * 2. Replace the placeholder values below with your Firebase web app config.
 * 3. Keep src/firebase.js untracked; it is intentionally listed in .gitignore.
 *
 * The Firebase web apiKey is not an admin secret, but it should still be
 * restricted in Google Cloud/Firebase Console to the domains this app uses.
 */
const firebaseConfig = {
  apiKey: 'YOUR_FIREBASE_WEB_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.firebasestorage.app',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_FIREBASE_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID',
};

export const app = initializeApp(firebaseConfig);
export const ai = getAI(app);
