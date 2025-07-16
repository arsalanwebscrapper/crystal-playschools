import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAwQRyQlS2k325dZaeLEQ-nyGi8dxJ5lAM",
  authDomain: "fileshare-659b2.firebaseapp.com",
  databaseURL: "https://fileshare-659b2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fileshare-659b2",
  storageBucket: "fileshare-659b2.firebasestorage.app",
  messagingSenderId: "806596115744",
  appId: "1:806596115744:web:4571a14469a8d23962eb45",
  measurementId: "G-0K2ZQBZZ10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

export default app;