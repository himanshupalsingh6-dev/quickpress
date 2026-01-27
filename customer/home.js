const items = [
  { id: 1, name: "Shirt", price: 10, category: "iron" },
  { id: 2, name: "Pant", price: 12, category: "iron" },
  { id: 3, name: "Saree", price: 25, category: "wash" },
  { id: 4, name: "Coat", price: 30, category: "dry" },
  { id: 5, name: "Sweater", price: 20, category: "winter" }
];

let cart = {};

function renderItems(filter = "all") {
  const container = document.getElementById("items");
  container.innerHTML = "";

  items
    .filter(i => filter === "all" || i.category === filter)
    .forEach(i => {
      container.innerHTML += `
        <div class="item-card">
          <div class="item-icon">👕</div>
          <h4>${i.name}</h4>
          <p>₹${i.price}</p>
          <button onclick="addToCart(${i.id})">ADD</button>
        </div>
      `;
    });
}

/* CATEGORY CLICK */
document.querySelectorAll(".category").forEach(btn => {
  btn.onclick = () => {
    renderItems(btn.dataset.cat);
  };
});

/* CART LOGIC */
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
}

function updateCartUI() {
  const totalItems = Object.values(cart).reduce((a,b)=>a+b,0);
  const cartBar = document.getElementById("cartBar");

  if (totalItems > 0) {
    cartBar.style.display = "flex";
    cartBar.innerHTML = `🧺 ${totalItems} items <button>View Cart</button>`;
  } else {
    cartBar.style.display = "none";
  }
}

renderItems();