import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/*
  AUTO PAYOUT CALCULATION
  Call this when order is Delivered
*/

export async function calculatePayout(order) {

  // DELIVERY PAYOUT
  const deliveryRateSnap = await getDoc(doc(db, "payoutRates", "delivery"));
  if (deliveryRateSnap.exists() && order.riderId) {
    const rate = deliveryRateSnap.data();
    const deliveryAmount = rate.basePay; // KM logic future-ready

    await addDoc(collection(db, "payouts"), {
      userId: order.riderId,
      role: "delivery",
      amount: deliveryAmount,
      status: "pending",
      orderId: order.id,
      createdAt: Date.now()
    });
  }

  // PARTNER PAYOUT
  const partnerRateSnap = await getDoc(doc(db, "payoutRates", "partner"));
  if (partnerRateSnap.exists() && order.partnerId) {
    const rate = partnerRateSnap.data();
    let total = 0;

    order.items.forEach(i=>{
      if(i.name==="Shirt") total += rate.shirt;
      if(i.name==="Pant") total += rate.pant;
    });

    await addDoc(collection(db, "payouts"), {
      userId: order.partnerId,
      role: "partner",
      amount: total,
      status: "pending",
      orderId: order.id,
      createdAt: Date.now()
    });
  }
}
