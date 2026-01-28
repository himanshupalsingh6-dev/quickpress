const params = new URLSearchParams(window.location.search);
const cat = params.get("cat") || "iron";

const title = document.getElementById("title");
title.innerText = cat.toUpperCase() + " Service";

const productData = {
  iron: [
    {name:"Shirt", price:10},
    {name:"Pant", price:12}
  ],
  wash: [
    {name:"Normal Wash", price:30},
    {name:"Premium Wash", price:50}
  ],
  steam: [
    {name:"Steam Press", price:20}
  ],
  dry: [
    {name:"Dry Clean", price:60}
  ],
  express: [
    {name:"Express Iron", price:20}
  ],
  scheduled: [
    {name:"Scheduled Service", price:15}
  ]
};

let cartCount = 0;
let total = 0;

const container = document.getElementById("products");

productData[cat].forEach(p=>{
  const div = document.createElement("div");
  div.className="product";
  div.innerHTML=`
    <div class="left">${p.name}<br>₹${p.price}</div>
    <div class="right">
      <button onclick="add(${p.price})">ADD</button>
    </div>
  `;
  container.appendChild(div);
});

function add(price){
  cartCount++;
  total += price;

  const cart = document.getElementById("cartPopup");
  const text = document.getElementById("cartText");

  text.innerText = `${cartCount} item(s) • ₹${total}`;
  cart.style.display="flex";
}

function goCart(){
  alert("Cart page next step 🙂");
}