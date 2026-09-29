const search = document.querySelector("#search");
const cards = [...document.querySelectorAll(".tag-card")];
const filters = [...document.querySelectorAll(".filter")];
let currentFilter = "all";

function updateCards() {
  const query = search.value.toLowerCase().trim();
  cards.forEach(card => {
    const matchesFilter = currentFilter === "all" || card.dataset.category === currentFilter;
    const matchesSearch = card.dataset.name.includes(query) || card.innerText.toLowerCase().includes(query);
    card.classList.toggle("hidden", !(matchesFilter && matchesSearch));
  });
}
search.addEventListener("input", updateCards);
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    updateCards();
  });
});
