document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("admin-login-form");
    const loginSection = document.getElementById("login-section");
    const adminPanel = document.getElementById("admin-panel");
    const loginError = document.getElementById("login-error");

    // Login
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const user = document.getElementById("admin-user").value;
        const password = document.getElementById("admin-password").value;

        if (user === "admin" && password === "1234") { 
            loginSection.style.display = "none";
            adminPanel.style.display = "block";
            carregarDadosAdmin();
        } else {
            loginError.style.display = "block";
        }
    });  
});

