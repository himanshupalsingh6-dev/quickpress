import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const db = getFirestore();

export async function completeOrder(orderId) {

  const orderSnap = await getDoc(doc(db, "orders", orderId));
  const order = orderSnap.data();

  const settings = (await getDoc(doc(db, "settings", "app"))).data();

  const km = 5; // demo KM (maps baad me)
  const delivery = settings.baseDelivery + km * settings.riderPerKm;
  const gst = ((order.totalAmount || 0) * settings.gst) / 100;

  await updateDoc(doc(db, "orders", orderId), {
    status: "COMPLETED",
    distanceKm: km,
    deliveryCharge: delivery,
    gst
  });

  await updateDoc(doc(db, "wallets", order.partnerId), {
    balance: increment(100)
  });

  await updateDoc(doc(db, "wallets", order.riderId), {
    balance: increment(50)
  });
}
