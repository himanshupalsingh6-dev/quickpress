let cart = JSON.parse(localStorage.getItem("cart")) || [];

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product) {
  const item = cart.find(p => p.id === product.id);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  save();
}

export function increaseQty(id) {
  const item = cart.find(p => p.id === id);
  if (!item) return;
  item.qty += 1;
  save();
}

export function decreaseQty(id) {
  const item = cart.find(p => p.id === id);
  if (!item) return;
  item.qty -= 1;
  if (item.qty <= 0) {
    cart = cart.filter(p => p.id !== id);
  }
  save();
}

export function getCart() {
  return cart;
}

export function getTotal() {
  let total = 0;
  cart.forEach(i => {
    total += i.price * i.qty;
  });
  return total;
}