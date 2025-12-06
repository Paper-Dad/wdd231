//Menu Info//

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");


hamButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
});

//Menu info//


//Footer info//
const currentYear = new Date().getFullYear();
const yearSpan = document.getElementById("year");

if (yearSpan) {
  yearSpan.textContent = currentYear;
}
const modified = document.lastModified;
const lastModifiedSpan = document.getElementById("lastModified");

if (lastModifiedSpan) {
  lastModifiedSpan.textContent = modified;
}

//Footer Info//


// DOM references
const container = document.getElementById("episode-container");
const filterSelect = document.getElementById("bookFilter");
const STORAGE_KEY = "watchedEpisodesV2";
let avatarEpisodes = [];
let watched = [];

// Load watched episodes from localStorage
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  watched = raw ? JSON.parse(raw) : [];
  if (!Array.isArray(watched)) watched = [];
} catch {
  watched = [];
}

const bookLabel = {
  "Water": "Book One: Water",
  "Earth": "Book Two: Earth",
  "Fire": "Book Three: Fire"
};

// Escape HTML helper
function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[m]));
}

// Fetch episodes.json
async function loadEpisodes() {
  try {
    const response = await fetch("data/episodes.json");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    avatarEpisodes = await response.json();

    avatarEpisodes.sort((a, b) => {
      if (a.book === b.book) return a.number - b.number;
      return ["Water", "Earth", "Fire"].indexOf(a.book) - ["Water", "Earth", "Fire"].indexOf(b.book);
    });

    renderEpisodes(filterSelect ? filterSelect.value : "All");
  } catch (error) {
    console.error("Failed to load episodes:", error);
    if (container) container.innerHTML = "<p>Failed to load episode data.</p>";
  }
}

// Render function
function renderEpisodes(filter = "All") {
  if (!container) return;

  const books = filter === "All" ? ["Water", "Earth", "Fire"] : [filter];

  container.innerHTML = books.map(book => {
    const bookEpisodes = avatarEpisodes.filter(ep => ep.book === book);

    const episodesHTML = bookEpisodes.map(ep => {
      const id = `${ep.book}-${ep.number}`;
      const isWatched = watched.includes(id);
      return `
        <li class="episode ${isWatched ? "watched" : ""}" data-id="${id}" role="button" tabindex="0" aria-pressed="${isWatched}">
          <div class="ep-row">
            <span class="ep-prop ep-book">${escapeHtml(book)}</span>
            <span class="ep-prop ep-number">Ep ${ep.number}</span>
            <span class="ep-prop ep-title">${escapeHtml(ep.title)}</span>
            <span class="ep-prop ep-watched">${isWatched ? "Watched" : "Not watched"}</span>
          </div>
        </li>
      `;
    }).join("");

    return `
      <section class="book">
        <h2>${bookLabel[book]}</h2>
        <ul>${episodesHTML}</ul>
      </section>
    `;
  }).join("");
}

// Toggle watched state
function toggleEpisode(id) {
  const idx = watched.indexOf(id);
  if (idx > -1) watched.splice(idx, 1);
  else watched.push(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(watched));
  renderEpisodes(filterSelect ? filterSelect.value : "All");
}


if (container) {
  container.addEventListener("click", e => {
    const ep = e.target.closest(".episode");
    if (ep) toggleEpisode(ep.dataset.id);
  });

  container.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      const ep = e.target.closest(".episode");
      if (ep) {
        e.preventDefault();
        toggleEpisode(ep.dataset.id);
      }
    }
  });
}

if (filterSelect) {
  filterSelect.addEventListener("change", e => renderEpisodes(e.target.value));
}

loadEpisodes();