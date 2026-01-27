let cartItems = 0;

function openCategory(type){
  alert("Open category: " + type);
}

function filterCategory(type){
  document.querySelectorAll('.category-tabs button')
    .forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
}

function detectLocation(){
  alert("Auto location disabled (as requested)");
}

function addToCart(){
  cartItems++;
  document.getElementById("cartPopup").classList.remove("hidden");
  document.getElementById("cartCount").innerText =
    cartItems + " item(s) added";
}

function openCart(){
  alert("Open Cart Page");
}

function openProfile(){
  alert("Open Account Page");
}

function goCategory(){ alert("Category page"); }
function goOrders(){ alert("Orders page"); }