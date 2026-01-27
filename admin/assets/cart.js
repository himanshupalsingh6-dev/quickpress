let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addToCart(product){
  const item = cart.find(p=>p.id===product.id);
  if(item){
    item.qty += 1;
  }else{
    cart.push({...product, qty:1});
  }
  save();
}

export function changeQty(id,delta){
  const item = cart.find(p=>p.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){
    cart = cart.filter(p=>p.id!==id);
  }
  save();
}

export function getTotal(){
  let total = 0;
  cart.forEach(i=>{
    total += i.price * i.qty;
  });
  return total;
}

function save(){
  localStorage.setItem("cart",JSON.stringify(cart));
}
