/* ═══════════════════════════════════════════════════════════
   FIREBASE CONFIGURATION — Scaling the Soul
   ═══════════════════════════════════════════════════════════ */

const firebaseConfig = {
    apiKey: "AIzaSyDaebTdxu4ewnJw5JS2r_XD990RUePqyMM",
    authDomain: "scaling-the-soul.firebaseapp.com",
    projectId: "scaling-the-soul",
    storageBucket: "scaling-the-soul.firebasestorage.app",
    messagingSenderId: "439523569283",
    appId: "1:439523569283:web:bdcab743f252aa03c175b6",
    measurementId: "G-YLN36QL1T3"
};

// Initialize Firebase (compat SDK for browser use)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Keep user logged in across sessions
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
