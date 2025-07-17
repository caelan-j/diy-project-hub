// js/login.js

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    const statusEl = document.getElementById("loginStatus");
    if (response.ok) {
        statusEl.style.color = "green";
        statusEl.textContent = "? Login successful!";
        // Optionally redirect
        // window.location.href = "/dashboard.html";
    } else {
        statusEl.style.color = "red";
        statusEl.textContent = "? " + result.message;
    }
});