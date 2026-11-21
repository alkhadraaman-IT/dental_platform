// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSy...", // كودك الخاص
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

// تشغيل الفايربيس
const app = initializeApp(firebaseConfig);

// تصدير الخدمات لاستخدامها في الصفحات
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);