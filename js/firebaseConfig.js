import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: ART_FEATURE_FIREBASE_API_KEY,
  authDomain: ART_FEATURE_FIREBASE_AUTH_DOMAIN,
  projectId: ART_FEATURE_FIREBASE_PROJECT_ID,
  storageBucket: ART_FEATURE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ART_FEATURE_FIREBASE_MESSAGING_SENDER_ID,
  appId: ART_FEATURE_FIREBASE_APP_ID,
};

// init firebase
initializeApp(firebaseConfig);

// init services
export const db = getFirestore();
