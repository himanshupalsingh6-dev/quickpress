let cart = [];
let packingSelected = false;
const packingPrice = 20;
const handlingCharge = 5;

function addToCart(id){
  const product = products.find(p=>p.id===id);
  const item = cart.find(i=>i.id===id);

  if(item){
    item.qty++;
  }else{
    cart.push({...product, qty:1});
  }
  updateCartBar();
}

function updateCartBar(){
  if(cart.length===0){
    cartBar.style.display="none";
    return;
  }
  let count = cart.reduce((a,b)=>a+b.qty,0);
  let total = cart.reduce((a,b)=>a+b.price*b.qty,0);
  cartBar.style.display="flex";
  cartText.innerText = `${count} items • ₹${total}`;
}

function openCart(){
  if(cart.length===0) return;
  renderCart();
  cartDrawer.style.right="0";
  cartOverlay.style.display="block";
}

function closeCart(){
  cartDrawer.style.right="-420px";
  cartOverlay.style.display="none";
}

function togglePacking(){
  packingSelected = document.getElementById("packingCheck").checked;
  renderCart();
}

function renderCart(){
  cartItems.innerHTML="";
  let itemsTotal = 0;

  cart.forEach(i=>{
    itemsTotal += i.price*i.qty;
    cartItems.innerHTML += `
      <div class="cart-item">
        ${i.name} × ${i.qty}
        <span>₹${i.price*i.qty}</span>
      </div>`;
  });

  itemsTotalEl.innerText = itemsTotal;
  packingTotal.innerText = packingSelected ? packingPrice : 0;
  grandTotal.innerText =
    itemsTotal +
    (packingSelected ? packingPrice : 0) +
    handlingCharge;
}
