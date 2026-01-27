/* ================================
   QuickPress AUTH LOGIC
   File: assets/auth.js
================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* ---------- Firebase Config ---------- */
const firebaseConfig = {
  apiKey: "AIzaSyCqrOXjuQIgfSKS7_YBb_ft-Z6ubsGpAqs",
  authDomain: "quickpress-e486d.firebaseapp.com",
  projectId: "quickpress-e486d",
  storageBucket: "quickpress-e486d.appspot.com",
  messagingSenderId: "572695394794",
  appId: "1:572695394794:web:f3f35cfb4f9ddec1c31a93"
};

/* ---------- Init ---------- */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* =================================================
   LOGIN
================================================= */
window.login = async function () {
  showLoader();

  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      hideLoader();
      toast("Email & password required", "error");
      return;
    }

    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    const snap = await getDoc(doc(db, "users", uid));

    hideLoader();

    if (!snap.exists()) {
      toast("User profile not found", "error");
      return;
    }

    const user = snap.data();

    if (user.status !== "active") {
      toast("Account blocked", "error");
      return;
    }

    // save session
    localStorage.setItem("qp_uid", uid);
    localStorage.setItem("qp_role", user.role);

    // redirect by role
    if (user.role === "admin") {
      location.href = "/quickpress/admin/dashboard.html";
    } else if (user.role === "partner") {
      location.href = "/quickpress/partner/dashboard.html";
    } else if (user.role === "rider") {
      location.href = "/quickpress/rider/dashboard.html";
    } else {
      location.href = "/quickpress/customer/home.html";
    }

  } catch (err) {
    hideLoader();
    toast(err.message, "error");
  }
};

/* =================================================
   REGISTER (Customer default)
================================================= */
window.register = async function () {
  showLoader();

  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      hideLoader();
      toast("Email & password required", "error");
      return;
    }

    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    await setDoc(doc(db, "users", uid), {
      email: email,
      role: "customer",
      status: "active",
      createdAt: serverTimestamp()
    });

    hideLoader();
    toast("Account created successfully", "success");

    setTimeout(() => {
      location.href = "/quickpress/login.html";
    }, 1200);

  } catch (err) {
    hideLoader();
    toast(err.message, "error");
  }
};
