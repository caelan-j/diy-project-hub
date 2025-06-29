// Java for Navbar and Footer Layout//
export async function loadLayout() {
    const insertHTML = async (selector, url) => {
        const container = document.querySelector(selector);
        if (!container) return;
        try {
            const res = await fetch(url);
            const html = await res.text();
            container.innerHTML = html;
        } catch (err) {
            console.error(`Failed to load ${url}:`, err);
        }
    };

    await insertHTML("#navbar", "../components/navbar.html");
    await insertHTML("#footer", "../components/footer.html");

    // Reattach navbar toggle logic after navbar is loaded
    const toggleNav = () => {
        const nav = document.getElementById("navLinks");
        nav?.classList.toggle("show");
    };

    document.querySelector(".menu-toggle")?.addEventListener("click", toggleNav);

    window.addEventListener("click", function (event) {
        const menu = document.getElementById("navLinks");
        const toggleButton = document.querySelector(".menu-toggle");
        if (menu && toggleButton && !menu.contains(event.target) && !toggleButton.contains(event.target)) {
            menu.classList.remove("show");
        }
    });
}
}