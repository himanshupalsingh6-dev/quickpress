import { auth, db } from "./firebase.js";

import { onAuthStateChanged, signOut } from
  "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { doc, getDoc } from
  "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/**
 * Page Guard
 * @param allowedRoles array → ["admin"], ["customer"], etc.
 */
export function protectPage(allowedRoles = []) {

  onAuthStateChanged(auth, async (user) => {

    // ❌ Not logged in
    if (!user) {
      window.location.href = "/login.html";
      return;
    }

    // 🔍 Fetch user data
    const snap = await getDoc(doc(db, "users", user.uid));

    if (!snap.exists()) {
      await signOut(auth);
      window.location.href = "/login.html";
      return;
    }

    const data = snap.data();

    // ❌ Blocked user
    if (data.status !== "active") {
      alert("Account blocked by admin");
      await signOut(auth);
      window.location.href = "/login.html";
      return;
    }

    // ❌ Role not allowed
    if (!allowedRoles.includes(data.role)) {
      alert("Unauthorized access");
      window.location.href = "/login.html";
      return;
    }

    // ✅ Allowed
    console.log("Access granted:", data.role);
  });
}
