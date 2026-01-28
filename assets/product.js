const params=new URLSearchParams(location.search);
const cat=params.get("cat")||"iron";

document.getElementById("title").innerText=cat.toUpperCase()+" Service";

const data={
 iron:[{n:"Shirt",p:10},{n:"Pant",p:12}],
 wash:[{n:"Normal Wash",p:30},{n:"Premium Wash",p:50}],
 steam:[{n:"Steam Press",p:20}],
 dry:[{n:"Dry Clean",p:60}],
 express:[{n:"Express Service",p:25}],
 scheduled:[{n:"Scheduled Service",p:15}]
};

let cart=JSON.parse(localStorage.getItem("cart")||"[]");
const list=document.getElementById("list");

data[cat].forEach((i,idx)=>{
  const d=document.createElement("div");
  d.className="product";
  d.innerHTML=`
   <div class="row">
    <div><b>${i.n}</b><br>₹${i.p}</div>
    <div class="qty">
      <button onclick="add(${idx})">ADD</button>
    </div>
   </div>`;
  list.appendChild(d);
});

function add(i){
 cart.push({...data[cat][i],qty:1});
 localStorage.setItem("cart",JSON.stringify(cart));
 updateBar();
}

function updateBar(){
 if(cart.length>0){
  document.getElementById("cartBar").style.display="flex";
  const total=cart.reduce((s,i)=>s+i.p*i.qty,0);
  document.getElementById("cartText").innerText=
    `${cart.length} item(s) • ₹${total}`;
 }
}
updateBar();

function openCart(){
 location.href="cart.html";
}