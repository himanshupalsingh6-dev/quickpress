let cartCount = 0;

function openCategory(cat){
  alert("Open category: " + cat);
}

function openProfile(){
  alert("Open Account Page");
}

function goCategory(){
  alert("Go to Categories");
}

function goOrders(){
  alert("Go to Orders");
}

function openCart(){
  alert("Open Cart Page");
}

/* CART POPUP TEST */
function addToCart(){
  cartCount++;
  const popup = document.getElementById("cartPopup");
  popup.classList.remove("hidden");
  document.getElementById("cartText").innerText =
    cartCount + " item(s) added";
}