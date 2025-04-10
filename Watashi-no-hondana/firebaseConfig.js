import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYBOOag_oqXXD8ErGSfRTWia4exOUNrpc",
  authDomain: "watashi-no-hondana.firebaseapp.com",
  projectId: "watashi-no-hondana",
  storageBucket: "watashi-no-hondana.firebasestorage.app",
  messagingSenderId: "276166809865",
  appId: "1:276166809865:web:343c0a92effa5fd7f7dbd8",
  measurementId: "G-NC9D2S8YH1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { db, auth };
