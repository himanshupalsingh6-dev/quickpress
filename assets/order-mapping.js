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

export async function createOrderWithAutoMapping(orderData) {
  const user = auth.currentUser;
  if (!user) throw "Not logged in";

  // 1️⃣ City → Hub
  const hubSnap = await getDocs(
    query(
      collection(db, "hubs"),
      where("cityId", "==", orderData.cityId),
      where("active", "==", true)
    )
  );
  if (hubSnap.empty) throw "No hub found";
  const hubId = hubSnap.docs[0].id;

  // 2️⃣ Hub → Partner
  const partnerSnap = await getDocs(
    query(
      collection(db, "users"),
      where("role", "==", "partner"),
      where("hubId", "==", hubId),
      where("status", "==", "active")
    )
  );
  if (partnerSnap.empty) throw "No partner available";
  const partnerId = partnerSnap.docs[0].id;

  // 3️⃣ Create Order
  const orderRef = await addDoc(collection(db, "orders"), {
    userId: user.uid,
    cityId: orderData.cityId,
    hubId,
    partnerId,
    status: "PLACED",
    timeline: [{ step: "PLACED", time: serverTimestamp() }],
    createdAt: serverTimestamp(),
    ...orderData
  });

  localStorage.setItem("currentOrderId", orderRef.id);
  return orderRef.id;
}
