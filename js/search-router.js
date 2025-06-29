export function setupProjectRedirectFilters({
    containerSelector = "#projectSearchBar",
    destination = "all-projects.html",
    tags = ["outdoor", "indoor", "woodworking", "tools", "beginner", "intermediate", "advanced"]
} = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Render HTML
    container.innerHTML = `
    <div class="quick-search-controls">
      <input type="text" id="quickSearch" placeholder="Search projects..." />
    </div>
    <div class="quick-tags">
      <button data-tag="">All</button>
      ${tags.map(tag => `<button data-tag="${tag}">${capitalize(tag)}</button>`).join("")}
    </div>
  `;

    const searchInput = container.querySelector("#quickSearch");
    const tagButtons = container.querySelectorAll(".quick-tags button");

    let selectedTag = "";

    tagButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            selectedTag = btn.dataset.tag;
            tagButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            redirect();
        });
    });

    searchInput.addEventListener("keydown", e => {
        if (e.key === "Enter") redirect();
    });

    function redirect() {
        const params = new URLSearchParams();
        if (searchInput.value.trim()) params.set("search", searchInput.value.trim());
        if (selectedTag) params.set("tag", selectedTag);
        window.location.href = `${destination}?${params.toString()}`;
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}