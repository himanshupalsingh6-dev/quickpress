const params = new URLSearchParams(location.search);
const cat = params.get("cat") || "iron";

document.getElementById("pageTitle").innerText = "Select Items";

const products = {
  iron: [
    {name:"Shirt", price:10, icon:"👕"},
    {name:"Pant", price:12, icon:"👖"},
    {name:"Saree", price:25, icon:"🥻"},
    {name:"Coat", price:30, icon:"🧥"},
    {name:"Sweater", price:20, icon:"🧶"}
  ]
};

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

const list = document.getElementById("productList");

products[cat].forEach((p,i)=>{
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <div class="icon-wrap">${p.icon}</div>
    <div class="name">${p.name}</div>
    <div class="price">₹${p.price}</div>
    <button class="add-btn" onclick="add(${i})">ADD</button>
  `;
  list.appendChild(div);
});

function add(i){
  cart.push({...products[cat][i], qty:1});
  localStorage.setItem("cart", JSON.stringify(cart));
  render();
}

function render(){
  const cards = document.querySelectorAll(".card");
  cards.forEach((card,idx)=>{
    const item = cart.find(c=>c.name===products[cat][idx].name);
    if(item){
      card.querySelector(".add-btn").outerHTML = `
        <div class="qty">
          <button onclick="change(${idx},-1)">−</button>
          <span>${item.qty}</span>
          <button onclick="change(${idx},1)">+</button>
        </div>
      `;
    }
  });
  updateCartBar();
}

function change(i,d){
  const item = cart.find(c=>c.name===products[cat][i].name);
  item.qty += d;
  if(item.qty<=0){
    cart = cart.filter(c=>c!==item);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function updateCartBar(){
  if(cart.length>0){
    const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
    document.getElementById("cartBar").style.display="flex";
    document.getElementById("cartText").innerText =
      `${cart.length} items • ₹${total}`;
  }
}

function openCart(){
  location.href="cart.html";
}

render();
