const params = new URLSearchParams(location.search);
const cat = params.get("cat") || "iron";

document.getElementById("pageTitle").innerText =
  cat.toUpperCase() + " Service";

const products = {
  iron: [
    {name:"Shirt Iron", price:10, icon:"👕"},
    {name:"Pant Iron", price:12, icon:"👖"},
    {name:"T-Shirt Iron", price:9, icon:"👚"},
    {name:"Kurta Iron", price:15, icon:"🥻"}
  ],
  wash: [
    {name:"Shirt Wash", price:30, icon:"🧼"},
    {name:"Pant Wash", price:35, icon:"🧴"},
    {name:"T-Shirt Wash", price:25, icon:"👕"},
    {name:"Jeans Wash", price:40, icon:"👖"}
  ],
  steam: [
    {name:"Steam Shirt", price:20, icon:"☁️"},
    {name:"Steam Pant", price:22, icon:"🌫️"},
    {name:"Steam Saree", price:30, icon:"🥻"}
  ],
  dry: [
    {name:"Dry Clean Shirt", price:60, icon:"💧"},
    {name:"Dry Clean Pant", price:70, icon:"🧥"},
    {name:"Dry Clean Saree", price:120, icon:"👗"}
  ],
  express: [
    {name:"Express Iron", price:25, icon:"⚡"}
  ],
  scheduled: [
    {name:"Scheduled Service", price:15, icon:"📅"}
  ]
};

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

const list = document.getElementById("productList");

products[cat].forEach((p, idx) => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <div class="left">
      <div class="icon">${p.icon}</div>
      <div>
        <div class="name">${p.name}</div>
        <div class="price">₹${p.price}</div>
      </div>
    </div>
    <div class="right">
      <button onclick="add(${idx})">ADD</button>
    </div>
  `;
  list.appendChild(div);
});

function add(i){
  cart.push({...products[cat][i], qty:1});
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBar();
}

function updateCartBar(){
  if(cart.length > 0){
    const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
    document.getElementById("cartBar").style.display = "flex";
    document.getElementById("cartText").innerText =
      `${cart.length} item(s) • ₹${total}`;
  }
}

function openCart(){
  location.href = "cart.html";
}

updateCartBar();