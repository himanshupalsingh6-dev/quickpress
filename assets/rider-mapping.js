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

/* 🔹 AUTO ASSIGN RIDER */
export async function autoAssignRider(orderId, hubId) {

  // 1️⃣ Find online riders in same hub
  const riderSnap = await getDocs(
    query(
      collection(db, "users"),
      where("role", "==", "rider"),
      where("hubId", "==", hubId),
      where("status", "==", "active"),
      where("online", "==", true)
    )
  );

  if (riderSnap.empty) {
    throw "No rider available right now";
  }

  // 2️⃣ Pick least busy rider
  let selected = null;
  let minOrders = Infinity;

  riderSnap.forEach(d => {
    const r = d.data();
    const load = r.currentOrders || 0;
    if (load < minOrders) {
      minOrders = load;
      selected = d;
    }
  });

  // 3️⃣ Update order
  await updateDoc(doc(db, "orders", orderId), {
    riderId: selected.id,
    status: "RIDER_ASSIGNED"
  });

  // 4️⃣ Increase rider load
  await updateDoc(doc(db, "users", selected.id), {
    currentOrders: increment(1)
  });

  return selected.id;
}
