import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const db = getFirestore();

/* AUTO ASSIGN PARTNER */
async function autoAssignPartner(cityId) {

  // 1️⃣ Get active hub
  const hubQuery = query(
    collection(db, "hubs"),
    where("cityId", "==", cityId),
    where("active", "==", true)
  );

  const hubSnap = await getDocs(hubQuery);
  if (hubSnap.empty) throw "No active hub found";

  const hub = hubSnap.docs[0];
  const hubId = hub.id;

  // 2️⃣ Get active partner
  const partnerQuery = query(
    collection(db, "partners"),
    where("hubId", "==", hubId),
    where("status", "==", "active")
  );

  const partnerSnap = await getDocs(partnerQuery);
  if (partnerSnap.empty) throw "No active partner found";

  const partner = partnerSnap.docs[0];

  return {
    hubId,
    partnerId: partner.id
  };
}

/* CREATE ORDER WITH AUTO MAPPING */
export async function createOrder(orderData) {
  try {
    const mapping = await autoAssignPartner(orderData.cityId);

    await addDoc(collection(db, "orders"), {
      ...orderData,
      hubId: mapping.hubId,
      partnerId: mapping.partnerId,
      status: "assigned",
      createdAt: Date.now()
    });

    alert("Order auto-assigned successfully");

  } catch (err) {
    alert("Assignment failed: " + err);
  }
}
