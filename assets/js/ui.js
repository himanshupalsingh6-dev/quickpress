/*
  UI POLISH UTILITIES
  - Loading indicator
  - Error handler
  - Success toast (basic)
*/

export function showLoading(text = "Loading...") {
  let loader = document.getElementById("loader");
  if (!loader) {
    loader = document.createElement("div");
    loader.id = "loader";
    loader.style = `
      position:fixed;
      top:0;left:0;right:0;bottom:0;
      background:rgba(0,0,0,0.5);
      color:#fff;
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:9999;
      font-size:18px;
    `;
    document.body.appendChild(loader);
  }
  loader.innerText = text;
}

export function hideLoading() {
  const loader = document.getElementById("loader");
  if (loader) loader.remove();
}

export function showError(message) {
  alert("❌ Error: " + message);
}

export function showSuccess(message) {
  alert("✅ " + message);
}
