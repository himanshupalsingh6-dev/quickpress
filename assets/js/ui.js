/* ================================
   QuickPress UI GLOBAL HELPERS
   File: assets/ui.js
================================ */

/* ---------- Loader ---------- */
window.showLoader = function () {
  let loader = document.getElementById("qp-loader");

  if (!loader) {
    loader = document.createElement("div");
    loader.id = "qp-loader";
    loader.innerHTML = `
      <div class="qp-loader-backdrop">
        <div class="qp-spinner"></div>
      </div>
    `;
    document.body.appendChild(loader);
  }

  loader.style.display = "flex";
};

window.hideLoader = function () {
  const loader = document.getElementById("qp-loader");
  if (loader) loader.style.display = "none";
};

/* ---------- Toast / Alert ---------- */
window.toast = function (message, type = "info") {
  let toast = document.createElement("div");
  toast.className = `qp-toast ${type}`;
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 50);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

/* ---------- Simple Session Guard ---------- */
window.requireLogin = function () {
  const uid = localStorage.getItem("qp_uid");
  if (!uid) {
    location.href = "/quickpress/login.html";
  }
};

/* ---------- Logout ---------- */
window.logout = function () {
  localStorage.clear();
  location.href = "/quickpress/login.html";
};

/* ---------- Inject Basic Styles (AUTO) ---------- */
(function injectStyles() {
  if (document.getElementById("qp-ui-style")) return;

  const style = document.createElement("style");
  style.id = "qp-ui-style";
  style.innerHTML = `
    #qp-loader {
      position: fixed;
      inset: 0;
      display: none;
      z-index: 9999;
    }
    .qp-loader-backdrop {
      flex: 1;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qp-spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #ffd84d;
      border-top: 4px solid #e60023;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .qp-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #333;
      color: #fff;
      padding: 12px 20px;
      border-radius: 12px;
      font-size: 14px;
      opacity: 0;
      transition: all .3s ease;
      z-index: 10000;
    }
    .qp-toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    .qp-toast.error { background: #e60023; }
    .qp-toast.success { background: #2e7d32; }
  `;
  document.head.appendChild(style);
})();
