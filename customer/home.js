let mode = "express";

/* LOCATION */
function detectLocation(){
  if(!navigator.geolocation){
    document.getElementById("city").innerText = "Kasganj";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    () => document.getElementById("city").innerText = "Kasganj",
    () => document.getElementById("city").innerText = "Kasganj"
  );
}
detectLocation();

/* DELIVERY MODE */
function setMode(m){
  mode = m;
  document.querySelectorAll(".mode button")
    .forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
}

/* NAVIGATION */
function openCategory(cat){
  location.href = "category.html?cat=" + cat + "&mode=" + mode;
}
function goHome(){ location.href="home.html"; }
function goOrders(){ location.href="orders.html"; }
function openProfile(){ location.href="profile.html"; }
function openWallet(){ location.href="wallet.html"; }