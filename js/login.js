// Store registered users
let users = JSON.parse(localStorage.getItem("users")) || [];

document.addEventListener("DOMContentLoaded", function () {
  // Initialize error message display
  function showError(elementId, message) {
    const errorDiv = document.getElementById(elementId);
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
    setTimeout(() => errorDiv.classList.add("hidden"), 5000);
  }

  // Handle Login
  window.handleLogin = function (event) {
    event.preventDefault();
    const loginId = document.getElementById("loginId").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const user = window.userAuth.loginUser(loginId, password);
      // Redirect to homepage on successful login
      window.location.href = "/index.html";
    } catch (error) {
      showError("loginError", error.message);
    }
  };

  // Handle Signup
  window.handleSignup = function (event) {
    event.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const loginId = document.getElementById("signupId").value;
    const password = document.getElementById("signupPassword").value;

    try {
      const newUser = window.userAuth.registerUser({
        fullName,
        loginId,
        password,
      });
      // Auto login after successful registration
      window.userAuth.loginUser(loginId, password);
      window.location.href = "/index.html";
    } catch (error) {
      showError("signupError", error.message);
    }
  };

  // Check if user is already logged in
  if (window.userAuth.isLoggedIn()) {
    window.location.href = "/index.html";
  }
});

function toggleForms() {
  document.getElementById("loginForm").classList.toggle("hidden");
  document.getElementById("signupForm").classList.toggle("hidden");
}
