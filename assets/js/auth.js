import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* ================= REGISTER ================= */
export async function registerUser(email, password, role) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCred.user;

  await setDoc(doc(db, "users", user.uid), {
    email: email,
    role: role,
    status: "active",
    createdAt: Date.now()
  });

  redirectByRole(role);
}

/* ================= LOGIN ================= */
export async function loginUser(email, password) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const user = userCred.user;

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) {
    alert("User record not found");
    return;
  }

  const data = snap.data();
  if (data.status !== "active") {
    alert("Account blocked");
    await signOut(auth);
    return;
  }

  redirectByRole(data.role);
}

/* ================= GOOGLE LOGIN ================= */
export async function googleLogin() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      email: user.email,
      role: "customer",
      status: "active",
      createdAt: Date.now()
    });
  }

  redirectByRole("customer");
}

/* ================= LOGOUT ================= */
export async function logoutUser() {
  await signOut(auth);
  window.location.href = "/login.html";
}

/* ================= ROLE REDIRECT ================= */
function redirectByRole(role) {
  if (role === "admin") {
    window.location.href = "/admin/dashboard.html";
  } else if (role === "partner") {
    window.location.href = "/partner/dashboard.html";
  } else if (role === "delivery") {
    window.location.href = "/rider/dashboard.html";
  } else {
    window.location.href = "/customer/home.html";
  }
}
