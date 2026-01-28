let cart = [];
let packingSelected = false;
const PACKING_PRICE = 20;
const HANDLING_CHARGE = 5;

function openCart(){
  if(cart.length === 0) return;
  document.getElementById("cartDrawer").style.right = "0";
  document.getElementById("cartOverlay").style.display = "block";
  renderCart();
}

function closeCart(){
  document.getElementById("cartDrawer").style.right = "-420px";
  document.getElementById("cartOverlay").style.display = "none";
}

function addToCart(name, price){
  let item = cart.find(i => i.name === name);
  if(item) item.qty++;
  else cart.push({name, price, qty:1});
}

function changeQty(index, value){
  cart[index].qty += value;
  if(cart[index].qty <= 0) cart.splice(index,1);
  renderCart();
}

function togglePacking(){
  packingSelected = document.getElementById("packingCheck").checked;
  renderCart();
}

function renderCart(){
  const box = document.getElementById("cartItems");
  box.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item,i)=>{
    total += item.price * item.qty;
    count += item.qty;

    box.innerHTML += `
      <div class="cart-item">
        <div class="name">${item.name}</div>
        <div class="qty">
          <button onclick="changeQty(${i},-1)">−</button>
          ${item.qty}
          <button onclick="changeQty(${i},1)">+</button>
        </div>
      </div>
    `;
  });

  document.getElementById("cartItemCount").innerText = count+" items";
  document.getElementById("itemsTotal").innerText = "₹"+total;
  document.getElementById("packingFee").innerText =
    packingSelected ? "₹"+PACKING_PRICE : "₹0";

  let grand = total + HANDLING_CHARGE + (packingSelected ? PACKING_PRICE : 0);
  document.getElementById("grandTotal").innerText = "₹"+grand;
}