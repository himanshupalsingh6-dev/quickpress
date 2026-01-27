import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const db = getFirestore();

/* 🔹 UPDATE ORDER STATUS + TIMELINE */
export async function updateOrderStatus(orderId, status) {

  await updateDoc(doc(db, "orders", orderId), {
    status,
    timeline: arrayUnion({
      step: status,
      time: serverTimestamp()
    })
  });
}
