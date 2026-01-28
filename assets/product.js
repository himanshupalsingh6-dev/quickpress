/* =========================
   CATEGORY → PRODUCT MAP
========================= */

const PRODUCTS = {
  iron: [
    { id:1, name:"Shirt", price:10, icon:"👕" },
    { id:2, name:"Pant", price:12, icon:"👖" },
    { id:3, name:"Saree", price:25, icon:"🥻" },
    { id:4, name:"Coat", price:30, icon:"🧥" },
    { id:5, name:"Kurta", price:15, icon:"👘" }
  ],

  wash: [
    { id:6, name:"Shirt", price:20, icon:"👕" },
    { id:7, name:"Pant", price:22, icon:"👖" },
    { id:8, name:"Bedsheet", price:40, icon:"🛏️" },
    { id:9, name:"Towel", price:18, icon:"🧻" }
  ],

  steam: [
    { id:10, name:"Shirt", price:15, icon:"👕" },
    { id:11, name:"Pant", price:18, icon:"👖" },
    { id:12, name:"Blazer", price:35, icon:"🧥" }
  ],

  dry: [
    { id:13, name:"Suit", price:80, icon:"🤵" },
    { id:14, name:"Saree", price:90, icon:"🥻" },
    { id:15, name:"Coat", price:70, icon:"🧥" }
  ]
};

/* =========================
   GET CATEGORY FROM URL
========================= */

const params = new URLSearchParams(window.location.search);
const category = params.get("cat") || "iron";

/* =========================
   LOAD CART
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   RENDER PRODUCTS
========================= */

const list = document.getElementById("productList");

function renderProducts() {
  list.innerHTML = "";

  PRODUCTS[category].forEach(product => {
    const cartItem = cart.find(i => i.id === product.id);

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="icon-wrap">${product.icon}</div>
      <div class="name">${product.name}</div>
      <div class="price">₹${product.price}</div>

      ${
        cartItem
        ? `
          <div class="qty">
            <button onclick="changeQty(${product.id}, -1)">−</button>
            <span>${cartItem.qty}</span>
            <button onclick="changeQty(${product.id}, 1)">+</button>
          </div>
        `
        : `
          <button class="add-btn" onclick="addToCart(${product.id})">
            ADD
          </button>
        `
      }
    `;

    list.appendChild(div);
  });

  updateCartBar();
}

/* =========================
   CART FUNCTIONS
========================= */

function addToCart(id) {
  const product = PRODUCTS[category].find(p => p.id === id);
  cart.push({ ...product, qty: 1 });
  saveCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderProducts();
}

/* =========================
   CART BAR (BOTTOM)
========================= */

function updateCartBar() {
  const bar = document.getElementById("cartBar");
  const text = document.getElementById("cartText");

  if (cart.length === 0) {
    bar.style.display = "none";
    return;
  }

  const totalItems = cart.reduce((s,i)=>s+i.qty,0);
  const totalPrice = cart.reduce((s,i)=>s+i.qty*i.price,0);

  text.innerText = `${totalItems} items • ₹${totalPrice}`;
  bar.style.display = "flex";
}

/* =========================
   OPEN CART
========================= */

function openCart() {
  window.location.href = "cart.html";
}

/* =========================
   INIT
========================= */

renderProducts();