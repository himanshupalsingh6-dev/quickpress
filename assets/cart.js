let cart = [
  { id: 1, name: "Shirt (Ironing)", price: 10, qty: 1 }
];

let packingSelected = false;
const packingPrice = 20;
const handlingCharge = 5;

/* OPEN / CLOSE */
function openCart() {
  if (cart.length === 0) return;
  document.getElementById("cartDrawer").style.right = "0";
  document.getElementById("cartOverlay").style.display = "block";
  renderCart();
}

function closeCart() {
  document.getElementById("cartDrawer").style.right = "-420px";
  document.getElementById("cartOverlay").style.display = "none";
}

/* RENDER */
function renderCart() {
  const itemsDiv = document.getElementById("cartItems");
  itemsDiv.innerHTML = "";

  let itemsTotal = 0;
  let totalQty = 0;

  cart.forEach((item, index) => {
    itemsTotal += item.price * item.qty;
    totalQty += item.qty;

    itemsDiv.innerHTML += `
      <div class="cart-item">
        <div>
          <h5>${item.name}</h5>
          <small>₹${item.price}</small>
        </div>
        <div class="qty-box">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
    `;
  });

  document.getElementById("itemCountText").innerText = `${totalQty} items`;
  document.getElementById("itemsTotal").innerText = `₹${itemsTotal}`;

  const packing = packingSelected ? packingPrice : 0;
  document.getElementById("packingCharge").innerText = `₹${packing}`;

  const grand = itemsTotal + packing + handlingCharge;
  document.getElementById("grandTotal").innerText = `₹${grand}`;
  document.getElementById("footerTotal").innerText = `₹${grand}`;
}

/* QTY */
function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  if (cart.length === 0) closeCart();
  renderCart();
}

/* PACKING */
function togglePacking() {
  packingSelected = document.getElementById("premiumPacking").checked;
  renderCart();
}

/* CHECKOUT */
function checkout() {
  alert("Proceeding to checkout 🚀");
}
