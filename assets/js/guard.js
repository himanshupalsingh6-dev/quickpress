import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/*
  ROLE BASED PAGE PROTECTION
*/

export function protectPage(allowedRoles = []) {

  onAuthStateChanged(auth, async (user) => {

    // ❌ Not logged in → go to correct login page
    if (!user) {
      window.location.href = "/quickpress/login.html";
      return;
    }

    const snap = await getDoc(doc(db, "users", user.uid));

    // ❌ No user profile
    if (!snap.exists()) {
      alert("User profile not found");
      window.location.href = "/quickpress/login.html";
      return;
    }

    const data = snap.data();

    // ❌ Inactive user
    if (data.status !== "active") {
      alert("Account inactive");
      window.location.href = "/quickpress/login.html";
      return;
    }

    // ❌ Role not allowed
    if (!allowedRoles.includes(data.role)) {
      alert("Unauthorized access");
      window.location.href = "/quickpress/login.html";
      return;
    }

    // ✅ Authorized → page allowed
  });
}
