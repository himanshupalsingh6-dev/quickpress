import { db } from "./firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/*
  PARTNER FIRST → RIDER AFTER
*/

// RING PARTNER
export async function ringPartner(orderId) {
  const q = query(
    collection(db, "users"),
    where("role", "==", "partner"),
    where("status", "==", "active")
  );

  const snap = await getDocs(q);
  if (snap.empty) return;

  const partner = snap.docs[0];

  await updateDoc(doc(db, "orders", orderId), {
    partnerId: partner.id,
    status: "Sent to Partner"
  });
}

// RING RIDER
export async function ringRider(orderId) {
  const q = query(
    collection(db, "users"),
    where("role", "==", "delivery"),
    where("status", "==", "active")
  );

  const snap = await getDocs(q);
  if (snap.empty) return;

  const rider = snap.docs[0];

  await updateDoc(doc(db, "orders", orderId), {
    riderId: rider.id,
    status: "Rider Assigned"
  });
}
