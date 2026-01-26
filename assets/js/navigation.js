function redirectByRole(role) {
  if (role === "customer") {
    window.location.href = "/customer/home.html";
  } else if (role === "admin") {
    window.location.href = "/admin/dashboard.html";
  } else if (role === "partner") {
    window.location.href = "/partner/dashboard.html";
  } else if (role === "delivery") {
    window.location.href = "/rider/dashboard.html";
  }
}
