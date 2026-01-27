const products = [
  { id: 1, name: "Shirt", price: 10, cat: "clothes", icon: "👕" },
  { id: 2, name: "Pant", price: 12, cat: "clothes", icon: "👖" },
  { id: 3, name: "Saree", price: 25, cat: "clothes", icon: "🥻" },
  { id: 4, name: "Coat", price: 30, cat: "winter", icon: "🧥" },
  { id: 5, name: "Sweater", price: 20, cat: "winter", icon: "🧶" }
];

let cart = {};

const list = document.getElementById("productList");
const cartBar = document.getElementById("cartBar");
const cartInfo = document.getElementById("cartInfo");

/* LOAD PRODUCTS */
function render(cat = "all") {
  list.innerHTML = "";
  products
    .filter(p => cat === "all" || p.cat === cat)
    .forEach(p => {
      const qty = cart[p.id] || 0;
      list.innerHTML += `
        <div class="product">
          <div class="icon">${p.icon}</div>
          <h3>${p.name}</h3>
          <div class="price">₹${p.price}</div>
          ${
            qty === 0
              ? `<button class="add-btn" onclick="add(${p.id})">ADD</button>`
              : `
                <div class="qty-box">
                  <button onclick="change(${p.id}, -1)">−</button>
                  <span>${qty}</span>
                  <button onclick="change(${p.id}, 1)">+</button>
                </div>
              `
          }
        </div>
      `;
    });
}

/* ADD */
function add(id) {
  cart[id] = 1;
  update();
}

/* CHANGE QTY */
function change(id, diff) {
  cart[id] += diff;
  if (cart[id] <= 0) delete cart[id];
  update();
}

/* UPDATE CART */
function update() {
  let items = 0, total = 0;
  for (let id in cart) {
    const p = products.find(x => x.id == id);
    items += cart[id];
    total += cart[id] * p.price;
  }

  if (items > 0) {
    cartBar.style.display = "flex";
    cartInfo.innerText = `${items} items • ₹${total}`;
  } else {
    cartBar.style.display = "none";
  }

  const active = document.querySelector(".tab.active").dataset.cat;
  render(active);
}

/* TABS */
document.querySelectorAll(".tab").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.cat);
  };
});

/* CART PAGE */
function goCart() {
  alert("Next: Cart page 😉");
}

render();