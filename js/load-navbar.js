// JavaScript nav bar insert
export async function loadNavbar() {
    const container = document.getElementById("navbar");
    if (!container) return;

    try {
        const res = await fetch("components/navbar.html");
        const html = await res.text();
        container.innerHTML = html;

        // Reattach nav toggle logic after injection
        const toggleNav = () => {
            const nav = document.getElementById("navLinks");
            nav.classList.toggle("show");
        };

        document.querySelector(".menu-toggle")?.addEventListener("click", toggleNav);

        // Close menu if clicked outside
        window.addEventListener("click", function (event) {
            const menu = document.getElementById("navLinks");
            const toggleButton = document.querySelector(".menu-toggle");
            if (menu && toggleButton && !menu.contains(event.target) && !toggleButton.contains(event.target)) {
                menu.classList.remove("show");
            }
        });

    } catch (err) {
        console.error("Failed to load navbar:", err);
    }
}