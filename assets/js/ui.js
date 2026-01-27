/* ===============================
   QUICKPRESS UI HELPERS
   Loader • Toast • Smooth Feel
================================ */

/* SHOW FULLSCREEN LOADER */
function showLoader(){
  if(document.getElementById("qp-loader")) return;

  const loader = document.createElement("div");
  loader.id = "qp-loader";
  loader.innerHTML = `
    <div style="
      position:fixed;
      inset:0;
      background:rgba(255,255,255,0.85);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:99999;
    ">
      <div style="
        width:48px;
        height:48px;
        border:5px solid #eee;
        border-top:5px solid #FFD84D;
        border-radius:50%;
        animation:spin 1s linear infinite;
      "></div>
    </div>
  `;
  document.body.appendChild(loader);
}

/* HIDE LOADER */
function hideLoader(){
  const l = document.getElementById("qp-loader");
  if(l) l.remove();
}

/* TOAST MESSAGE */
function toast(message){
  const t = document.createElement("div");
  t.innerText = message;

  t.style.cssText = `
    position:fixed;
    bottom:90px;
    left:50%;
    transform:translateX(-50%);
    background:#111;
    color:#fff;
    padding:10px 16px;
    border-radius:20px;
    font-size:13px;
    font-weight:600;
    z-index:99999;
    opacity:0;
    transition:.3s;
  `;

  document.body.appendChild(t);
  requestAnimationFrame(()=> t.style.opacity = "1");

  setTimeout(()=>{
    t.style.opacity="0";
    setTimeout(()=>t.remove(),300);
  },2500);
}

/* PAGE LOAD SMOOTH */
window.addEventListener("load",()=>{
  hideLoader();
});

/* AUTO SHOW LOADER ON LINK CLICK */
document.addEventListener("click",(e)=>{
  const a = e.target.closest("a");
  if(a && a.href){
    showLoader();
  }
});

/* SPIN ANIMATION */
const style = document.createElement("style");
style.innerHTML = `
@keyframes spin{
  to{ transform:rotate(360deg); }
}
`;
document.head.appendChild(style);
