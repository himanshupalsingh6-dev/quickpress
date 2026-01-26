import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* ======================
   LOGIN WITH EMAIL
====================== */
export async function loginUser(email, password) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    await redirectUser(res.user.uid);
  } catch (err) {
    alert("Login failed: " + err.message);
  }
}

/* ======================
   REGISTER USER
====================== */
export async function registerUser(email, password, role = "customer") {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      email: email,
      role: role,
      status: "active",
      createdAt: Date.now()
    });

    await redirectUser(res.user.uid);
  } catch (err) {
    alert("Register failed: " + err.message);
  }
}

/* ======================
   GOOGLE LOGIN
====================== */
export async function googleLogin() {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);

    const userRef = doc(db, "users", res.user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        email: res.user.email,
        role: "customer",
        status: "active",
        createdAt: Date.now()
      });
    }

    await redirectUser(res.user.uid);
  } catch (err) {
    alert("Google login failed: " + err.message);
  }
}

/* ======================
   ROLE BASED REDIRECT
====================== */
async function redirectUser(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) {
    alert("User profile not found");
    return;
  }

  const role = snap.data().role;

  if (role === "admin") {
    window.location.href = "admin/dashboard.html";
  } else if (role === "partner") {
    window.location.href = "partner/dashboard.html";
  } else if (role === "delivery") {
    window.location.href = "rider/dashboard.html";
  } else {
    window.location.href = "customer/home.html";
  }
}
