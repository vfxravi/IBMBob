// =====================
// listings.js — Filter + Search logic
// =====================

let allTiffins = [];

async function init() {
  allTiffins = await loadTiffins();

  // Check URL for pre-filled area (from home search)
  const params = new URLSearchParams(window.location.search);
  const areaParam = params.get('area');
  if (areaParam) {
    document.getElementById('searchInput').value = areaParam;
  }

  applyFilters();
  attachListeners();
}

function attachListeners() {
  document.getElementById('searchInput').addEventListener('input', debounce(applyFilters, 300));
  document.getElementById('areaFilter').addEventListener('change', applyFilters);
  document.getElementById('typeFilter').addEventListener('change', applyFilters);
  document.getElementById('mealFilter').addEventListener('change', applyFilters);
  document.getElementById('priceFilter').addEventListener('change', applyFilters);
  document.getElementById('sortFilter').addEventListener('change', applyFilters);
}

function applyFilters() {
  const search    = document.getElementById('searchInput').value.toLowerCase().trim();
  const area      = document.getElementById('areaFilter').value;
  const type      = document.getElementById('typeFilter').value;
  const meal      = document.getElementById('mealFilter').value;
  const price     = document.getElementById('priceFilter').value;
  const sort      = document.getElementById('sortFilter').value;

  let results = [...allTiffins];

  // Search
  if (search) {
    results = results.filter(t =>
      t.name.toLowerCase().includes(search) ||
      t.area.toLowerCase().includes(search) ||
      t.menu.some(m => m.toLowerCase().includes(search))
    );
  }

  // Area filter
  if (area) results = results.filter(t => t.area === area);

  // Type filter
  if (type) results = results.filter(t => t.type === type || t.type === 'Both');

  // Meal filter
  if (meal) results = results.filter(t => t.meals.includes(meal));

  // Price filter
  if (price === 'low')  results = results.filter(t => t.price_monthly < 2500);
  if (price === 'mid')  results = results.filter(t => t.price_monthly >= 2500 && t.price_monthly <= 3000);
  if (price === 'high') results = results.filter(t => t.price_monthly > 3000);

  // Sort
  if (sort === 'rating')     results.sort((a, b) => b.rating - a.rating);
  if (sort === 'price_asc')  results.sort((a, b) => a.price_monthly - b.price_monthly);
  if (sort === 'price_desc') results.sort((a, b) => b.price_monthly - a.price_monthly);
  if (sort === 'reviews')    results.sort((a, b) => b.reviews_count - a.reviews_count);

  renderListings(results);
}

function renderListings(data) {
  const grid  = document.getElementById('listingsGrid');
  const count = document.getElementById('resultsCount');

  count.textContent = `${data.length} tiffin provider${data.length !== 1 ? 's' : ''} mile`;

  if (!data.length) {
    grid.innerHTML = `
      <div class="no-results">
        <span class="emoji">😔</span>
        <strong>Koi result nahi mila</strong><br/>
        <span>Filter change karo ya search clear karo</span>
      </div>`;
    return;
  }

  grid.innerHTML = data.map(t => buildCard(t)).join('');
  updateFavButtons();
}

// Debounce helper
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

document.addEventListener('DOMContentLoaded', init);
