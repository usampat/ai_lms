document.getElementById("loginBtn").addEventListener("click", function() {
    // Get the email and password values
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    document.cookie ="login=success;";

    // Redirect to the dashboard page
    window.location.href = "http://localhost:5500/dashboard";
});