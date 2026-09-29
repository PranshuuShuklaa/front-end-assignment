const search = document.querySelector("#search");
const cards = [...document.querySelectorAll(".tag-card")];
const filters = [...document.querySelectorAll(".filter")];
const resultCount = document.querySelector("#result-count");
const noResults = document.querySelector("#no-results");
let currentFilter = "all";

function updateCards() {
  const query = search.value.toLowerCase().trim();
  let visibleCount = 0;

  cards.forEach(card => {
    const matchesFilter = currentFilter === "all" || card.dataset.category === currentFilter;
    const matchesSearch = card.dataset.name.includes(query) || card.innerText.toLowerCase().includes(query);
    const isVisible = matchesFilter && matchesSearch;
    card.classList.toggle("hidden", !isVisible);
    visibleCount += Number(isVisible);
  });

  resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? "example" : "examples"}`;
  noResults.hidden = visibleCount !== 0;
}

search.addEventListener("input", updateCards);
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filters.forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    currentFilter = btn.dataset.filter;
    updateCards();
  });
});

document.querySelector("#sample-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("#student-name").value.trim();
  document.querySelector("#form-message").textContent = `Hello, ${name}! Your example worked.`;
});

document.querySelector("#sample-button").addEventListener("click", () => {
  document.querySelector("#button-message").textContent = "The button was clicked.";
});
