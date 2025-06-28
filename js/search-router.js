export function setupProjectRedirectFilters({
    containerSelector = "#projectSearchBar",
    destination = "all-projects.html",
    tags = ["outdoor", "indoor", "woodworking", "tools"],
    categories = ["beginner", "intermediate", "advanced"]
} = {}) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Render HTML
    container.innerHTML = `
    <div class="quick-search-controls">
      <input type="text" id="quickSearch" placeholder="Search projects..." />
      <select id="quickCategory">
        <option value="">All Skill Levels</option>
        ${categories.map(c => `<option value="${c}">${capitalize(c)}</option>`).join("")}
      </select>
    </div>
    <div class="quick-tags">
      <button data-tag="">All</button>
      ${tags.map(tag => `<button data-tag="${tag}">${capitalize(tag)}</button>`).join("")}
    </div>
  `;

    // Event handlers
    const searchInput = container.querySelector("#quickSearch");
    const categorySelect = container.querySelector("#quickCategory");
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

    categorySelect.addEventListener("change", redirect);

    function redirect() {
        const params = new URLSearchParams();
        if (searchInput.value.trim()) params.set("search", searchInput.value.trim());
        if (selectedTag) params.set("tag", selectedTag);
        if (categorySelect.value) params.set("category", categorySelect.value);
        window.location.href = `${destination}?${params.toString()}`;
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}