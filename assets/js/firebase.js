// Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

// Firebase services (we will use)
import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCqrOXjuQIgfSKS7_YBb_ft-Z6ubsGpAqs",
  authDomain: "quickpress-e486d.firebaseapp.com",
  projectId: "quickpress-e486d",
  storageBucket: "quickpress-e486d.firebasestorage.app",
  messagingSenderId: "572695394794",
  appId: "1:572695394794:web:f3f35cfb4f9ddec1c31a93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
