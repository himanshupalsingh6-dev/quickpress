let cart = [];
let packingSelected = false;
const packingPrice = 20;
const handlingCharge = 5;

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

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) item.qty++;
  else cart.push({ name, price, qty: 1 });
}

function changeQty(i, delta) {
  cart[i].qty += delta;
  if (cart[i].qty <= 0) cart.splice(i,1);
  renderCart();
}

function togglePacking() {
  packingSelected = document.getElementById("packingCheck").checked;
  renderCart();
}

function renderCart() {
  const itemsDiv = document.getElementById("cartItems");
  itemsDiv.innerHTML = "";
  let itemsTotal = 0;
  let count = 0;

  cart.forEach((item, i) => {
    itemsTotal += item.price * item.qty;
    count += item.qty;
    itemsDiv.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <div class="qty">
          <button onclick="changeQty(${i},-1)">−</button>
          ${item.qty}
          <button onclick="changeQty(${i},1)">+</button>
        </div>
      </div>
    `;
  });

  document.getElementById("cartCount").innerText = count + " items";
  document.getElementById("itemsTotal").innerText = "₹" + itemsTotal;
  document.getElementById("packingFee").innerText =
    packingSelected ? "₹" + packingPrice : "₹0";

  const grand =
    itemsTotal +
    handlingCharge +
    (packingSelected ? packingPrice : 0);

  document.getElementById("grandTotal").innerText = "₹" + grand;
}