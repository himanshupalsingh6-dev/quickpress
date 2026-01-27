/* =========================================
   QUICKPRESS – ORDER ENGINE (ADVANCED)
   Auto Distance + Earnings Calculation
========================================= */

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* ---------- Haversine Distance (KM) ---------- */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius KM
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return +(R * c).toFixed(2); // KM
}

/* ---------- MAIN CALCULATION ---------- */
export async function completeOrder(db, orderId) {

  // 🔹 1. Fetch order
  const orderRef = doc(db, "orders", orderId);
  const orderSnap = await getDoc(orderRef);
  if (!orderSnap.exists()) throw "Order not found";

  const order = orderSnap.data();

  // 🔹 2. Fetch global settings
  const settingsSnap = await getDoc(doc(db, "settings", "app"));
  if (!settingsSnap.exists()) throw "Settings missing";

  const settings = settingsSnap.data();

  // 🔹 3. Distance calculation
  const km = calculateDistance(
    order.pickupLat,
    order.pickupLng,
    order.dropLat,
    order.dropLng
  );

  // 🔹 4. Charges calculation
  const deliveryCharge =
    settings.baseDelivery + (km * settings.riderPerKm);

  const gstAmount =
    ((order.orderValue + deliveryCharge) * settings.gst) / 100;

  const totalAmount =
    order.orderValue + deliveryCharge + gstAmount;

  // 🔹 5. Earnings
  const partnerEarning =
    order.orderValue -
    ((order.orderValue * settings.partnerCommission) / 100);

  const riderEarning =
    km * settings.riderPerKm;

  // 🔹 6. Update order
  await updateDoc(orderRef, {
    status: "completed",
    distanceKm: km,
    deliveryCharge,
    gst: gstAmount,
    totalAmount,
    partnerEarning,
    riderEarning,
    completedAt: new Date()
  });

  // 🔹 7. Credit wallets
  await updateDoc(doc(db, "wallets", order.partnerId), {
    balance: increment(partnerEarning)
  });

  await updateDoc(doc(db, "wallets", order.riderId), {
    balance: increment(riderEarning)
  });

  return {
    km,
    deliveryCharge,
    gstAmount,
    totalAmount,
    partnerEarning,
    riderEarning
  };
}
