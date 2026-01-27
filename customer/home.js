let cartCount = 0;

/* CATEGORY OPEN */
function openCategory(cat){
  window.location.href = "category.html?cat=" + cat;
}

/* NAV */
function goHome(){
  location.href = "home.html";
}

function goOrders(){
  location.href = "orders.html";
}

function openProfile(){
  location.href = "profile.html";
}

/* CART LOGIC */
function addToCart(){
  cartCount++;
  updateCartPopup();
}

function updateCartPopup(){
  const popup = document.getElementById("cartPopup");
  const text = document.getElementById("cartText");

  if(cartCount > 0){
    popup.style.display = "flex";
    text.innerText = `${cartCount} item(s) added`;
  } else {
    popup.style.display = "none";
  }
}

function goCart(){
  location.href = "cart.html";
}