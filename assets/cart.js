let cart=JSON.parse(localStorage.getItem("cart")||"[]");
const items=document.getElementById("items");

function render(){
 items.innerHTML="";
 let total=0;
 cart.forEach((i,idx)=>{
  total+=i.p*i.qty;
  items.innerHTML+=`
   <div class="item">
    <div class="row">
      <div>${i.n}<br>₹${i.p}</div>
      <div class="qty">
        <button onclick="chg(${idx},-1)">-</button>
        ${i.qty}
        <button onclick="chg(${idx},1)">+</button>
      </div>
    </div>
   </div>`;
 });
 document.getElementById("total").innerText=`₹${total}`;
 localStorage.setItem("cart",JSON.stringify(cart));
}
function chg(i,d){
 cart[i].qty+=d;
 if(cart[i].qty<=0)cart.splice(i,1);
 render();
}
function goCheckout(){
 location.href="checkout.html";
}
render();