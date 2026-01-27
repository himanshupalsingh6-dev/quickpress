import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

/* 🔹 MAIN FUNCTION */
window.createOrderWithAutoMapping = async function (orderData) {
  try {
    const user = auth.currentUser;
    if (!user) throw "User not logged in";

    const cityId = orderData.cityId;

    // 1️⃣ FIND ACTIVE HUB
    const hubSnap = await getDocs(
      query(
        collection(db, "hubs"),
        where("cityId", "==", cityId),
        where("active", "==", true)
      )
    );

    if (hubSnap.empty) throw "No hub found for city";

    const hubDoc = hubSnap.docs[0];
    const hubId = hubDoc.id;

    // 2️⃣ FIND ACTIVE PARTNERS IN HUB
    const partnerSnap = await getDocs(
      query(
        collection(db, "users"),
        where("role", "==", "partner"),
        where("hubId", "==", hubId),
        where("status", "==", "active")
      )
    );

    if (partnerSnap.empty) throw "No partner available";

    // 3️⃣ PICK LEAST BUSY PARTNER
    let selectedPartner = null;
    let minOrders = Infinity;

    partnerSnap.forEach(doc => {
      const data = doc.data();
      const orders = data.currentOrders || 0;

      if (orders < minOrders) {
        minOrders = orders;
        selectedPartner = doc;
      }
    });

    // 4️⃣ CREATE ORDER
    const orderRef = await addDoc(collection(db, "orders"), {
      userId: user.uid,
      cityId,
      hubId,
      partnerId: selectedPartner.id,
      status: "PLACED",
      createdAt: serverTimestamp(),
      ...orderData
    });

    console.log("Order Created:", orderRef.id);
    alert("Order placed successfully 🚀");

  } catch (err) {
    console.error(err);
    alert(err);
  }
};
