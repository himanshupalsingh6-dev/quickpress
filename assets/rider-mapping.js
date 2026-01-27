import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  increment
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const db = getFirestore();

export async function autoAssignRider(orderId, hubId) {

  const snap = await getDocs(
    query(
      collection(db, "users"),
      where("role", "==", "rider"),
      where("hubId", "==", hubId),
      where("status", "==", "active"),
      where("online", "==", true)
    )
  );

  if (snap.empty) throw "No rider online";

  let rider = snap.docs[0];

  await updateDoc(doc(db, "orders", orderId), {
    riderId: rider.id,
    status: "RIDER_ASSIGNED"
  });

  await updateDoc(doc(db, "users", rider.id), {
    currentOrders: increment(1)
  });

  return rider.id;
}
