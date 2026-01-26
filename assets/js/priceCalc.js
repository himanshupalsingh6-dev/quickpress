/*
  PRICE CALCULATION SYSTEM
  - Distance based delivery
  - GST calculation
  - Delivery charges
*/

export function calculateDistanceKM(lat1, lon1, lat2, lon2) {
  const toRad = v => (v * Math.PI) / 180;
  const R = 6371; // Earth radius in KM

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

export function calculateFinalAmount(subTotal, distanceKm) {
  const deliveryPerKm = 8;      // ₹ per KM
  const baseDelivery = 20;      // Base delivery charge
  const gstPercent = 18;        // GST %

  const deliveryCharge = baseDelivery + distanceKm * deliveryPerKm;
  const gstAmount = ((subTotal + deliveryCharge) * gstPercent) / 100;

  return {
    deliveryCharge: Math.round(deliveryCharge),
    gst: Math.round(gstAmount),
    grandTotal: Math.round(subTotal + deliveryCharge + gstAmount)
  };
}
