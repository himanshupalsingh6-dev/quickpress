const products = [
  {id:1,name:"Shirt",price:10,icon:"👕"},
  {id:2,name:"Pant",price:12,icon:"👖"},
  {id:3,name:"Saree",price:25,icon:"🥻"},
  {id:4,name:"Coat",price:30,icon:"🧥"},
  {id:5,name:"Sweater",price:20,icon:"🧶"}
];

const productList = document.getElementById("productList");

products.forEach(p=>{
  const card = document.createElement("div");
  card.className="card";
  card.innerHTML=`
    <div class="icon-wrap">${p.icon}</div>
    <div class="name">${p.name}</div>
    <div class="price">₹${p.price}</div>
    <button class="add-btn" onclick="addToCart(${p.id})">ADD</button>
  `;
  productList.appendChild(card);
});
