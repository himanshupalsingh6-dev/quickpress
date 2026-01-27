// Highlight active quick icon
document.querySelectorAll(".qi").forEach(icon=>{
  icon.onclick=()=>{
    document.querySelectorAll(".qi").forEach(i=>i.classList.remove("active"))
    icon.classList.add("active")
  }
})

// Fake cart animation (demo feel remove karega later)
const cart = document.getElementById("cartFloat")
setTimeout(()=>{
  cart.style.display="flex"
},1200)