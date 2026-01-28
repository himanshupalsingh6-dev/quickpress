const cart=JSON.parse(localStorage.getItem("cart")||"[]");
let total=cart.reduce((s,i)=>s+i.p*i.qty,0);
const final=total+20+10;
document.getElementById("final").innerText=`Total Payable: ₹${final}`;

function place(){
 alert("Order placed successfully 🎉");
 localStorage.removeItem("cart");
 location.href="index.html";
}