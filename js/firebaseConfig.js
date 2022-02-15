import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC58EQXfApUffrrVIR-0fyf8lAnGW2F3Hg',
  authDomain: 'fir-9-dojo-af514.firebaseapp.com',
  projectId: 'fir-9-dojo-af514',
  storageBucket: 'fir-9-dojo-af514.appspot.com',
  messagingSenderId: '94598091750',
  appId: '1:94598091750:web:e16e496071e0f3f2233c27',
};

// init firebase
initializeApp(firebaseConfig);

// init services
export const db = getFirestore();
