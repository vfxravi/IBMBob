// =====================
// main.js — Shared utilities for all pages
// =====================

// Load tiffin data from JSON
async function loadTiffins() {
  try {
    const res = await fetch('data/tiffins.json');
    return await res.json();
  } catch (e) {
    // Fallback: return mock inline data if fetch fails (e.g. file:// protocol)
    return getMockData();
  }
}

// Star rating generator
function getStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// Badge based on type
function getBadge(type) {
  if (type === 'Veg')     return '<span class="badge badge-veg">🟢 Veg</span>';
  if (type === 'Non-Veg') return '<span class="badge badge-nonveg">🔴 Non-Veg</span>';
  return '<span class="badge badge-both">🟡 Veg + Non-Veg</span>';
}

// Build a tiffin card HTML string
function buildCard(t) {
  const favs = getFavorites();
  const isFav = favs.includes(t.id);
  return `
    <div class="card">
      <div style="position:relative;">
        <img class="card-img" src="${t.image}" alt="${t.name}" loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop'"/>
        <button class="fav-btn ${isFav ? 'active' : ''}"
          onclick="toggleFav(${t.id}, this)"
          title="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
          style="position:absolute; top:0.6rem; right:0.7rem; background:rgba(255,255,255,0.85); border-radius:50%; width:36px; height:36px; display:flex; align-items:center; justify-content:center;">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="card-body">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
          <div class="card-title">${t.name}</div>
          ${getBadge(t.type)}
        </div>
        <div class="card-area">📍 ${t.area}</div>
        <div class="card-rating">
          <span class="stars">${getStars(t.rating)}</span>
          <strong>${t.rating}</strong>
          <span style="color:#aaa;">(${t.reviews_count} reviews)</span>
        </div>
        <div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-bottom:0.5rem;">
          ${t.meals.map(m => `<span class="tag">${m}</span>`).join('')}
        </div>
        <div class="card-price">₹${t.price_monthly}<span>/month</span>
          &nbsp;·&nbsp; ₹${t.price_daily}<span>/day</span>
        </div>
      </div>
      <div class="card-footer">
        <span style="font-size:0.82rem; color:#aaa;">⏰ ${t.timings}</span>
        <a href="detail.html?id=${t.id}" class="btn btn-primary" style="padding:0.4rem 1rem; font-size:0.85rem;">View →</a>
      </div>
    </div>
  `;
}

// =====================
// FAVORITES (localStorage)
// =====================
function getFavorites() {
  return JSON.parse(localStorage.getItem('tiffin_favs') || '[]');
}

function toggleFav(id, btn) {
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
    btn.innerHTML = '🤍';
    btn.classList.remove('active');
    showToast('Favorites se hata diya ❌');
  } else {
    favs.push(id);
    btn.innerHTML = '❤️';
    btn.classList.add('active');
    showToast('Favorites mein add kar diya ❤️');
  }
  localStorage.setItem('tiffin_favs', JSON.stringify(favs));
}

function updateFavButtons() {
  const favs = getFavorites();
  document.querySelectorAll('.fav-btn').forEach(btn => {
    const id = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
    if (favs.includes(id)) {
      btn.innerHTML = '❤️';
      btn.classList.add('active');
    }
  });
}

// =====================
// TOAST
// =====================
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// =====================
// INLINE MOCK DATA (fallback for file:// protocol)
// =====================
function getMockData() {
  return [
    {
      "id": 1, "name": "Sunita Aunty's Kitchen", "area": "Koramangala", "type": "Veg",
      "price_monthly": 2500, "price_daily": 100, "meals": ["Lunch", "Dinner"],
      "menu": ["Dal Tadka", "Roti", "Seasonal Sabzi", "Rice", "Pickle", "Salad"],
      "rating": 4.8, "reviews_count": 34, "phone": "9876543210",
      "timings": "12pm–2pm, 7pm–9pm",
      "description": "20 saal se ghar ka khana bana rahi hoon. Pure veg, no onion-garlic option bhi available.",
      "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      "featured": true,
      "reviews": [
        { "user": "Rahul M.", "rating": 5, "comment": "Bilkul ghar jaisa khana! Roz aata hoon." },
        { "user": "Priya S.", "rating": 5, "comment": "Best tiffin in Koramangala, very hygienic." },
        { "user": "Amit K.", "rating": 4, "comment": "Good food, delivery thodi late hoti hai kabhi kabhi." }
      ]
    },
    {
      "id": 2, "name": "Lakshmi Mess", "area": "HSR Layout", "type": "Veg",
      "price_monthly": 2200, "price_daily": 90, "meals": ["Lunch", "Dinner"],
      "menu": ["Sambar Rice", "Rasam", "Roti", "Poriyal", "Papad", "Curd"],
      "rating": 4.5, "reviews_count": 56, "phone": "9845612345",
      "timings": "12pm–2:30pm, 7pm–9:30pm",
      "description": "Authentic South Indian home food. Bangalore ki sabse purani home mess — 15+ saal.",
      "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop",
      "featured": true,
      "reviews": [
        { "user": "Venkat R.", "rating": 5, "comment": "Amma ke haath ka khana yaad aa jaata hai!" },
        { "user": "Sneha P.", "rating": 4, "comment": "South Indian food lovers ke liye best place." }
      ]
    },
    {
      "id": 3, "name": "Sharma Ji Ka Dhaba", "area": "Whitefield", "type": "Non-Veg",
      "price_monthly": 3000, "price_daily": 130, "meals": ["Lunch", "Dinner"],
      "menu": ["Chicken Curry", "Dal", "Roti", "Rice", "Raita", "Salad"],
      "rating": 4.3, "reviews_count": 28, "phone": "9712345678",
      "timings": "1pm–3pm, 7:30pm–10pm",
      "description": "North Indian non-veg tiffin. Chicken, egg options available. Weekly menu change hota hai.",
      "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
      "featured": false,
      "reviews": [
        { "user": "Rohan T.", "rating": 5, "comment": "Finally non-veg tiffin Whitefield mein! Amazing chicken curry." }
      ]
    },
    {
      "id": 4, "name": "Meena's Tiffin Center", "area": "Indiranagar", "type": "Veg",
      "price_monthly": 2800, "price_daily": 110, "meals": ["Breakfast", "Lunch"],
      "menu": ["Idli", "Dosa", "Upma", "Poha", "Sambar", "Chutney"],
      "rating": 4.6, "reviews_count": 41, "phone": "9632145870",
      "timings": "7:30am–10am, 12pm–2pm",
      "description": "South Indian breakfast specialist! Crispy dosa aur soft idli ke liye famous.",
      "image": "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
      "featured": true,
      "reviews": [
        { "user": "Kiran B.", "rating": 5, "comment": "Best dosa in Indiranagar, no doubt!" }
      ]
    },
    {
      "id": 5, "name": "Punjab Da Tadka", "area": "Electronic City", "type": "Both",
      "price_monthly": 2600, "price_daily": 110, "meals": ["Lunch", "Dinner"],
      "menu": ["Dal Makhani", "Paneer Butter Masala", "Naan", "Rice", "Lassi", "Kheer"],
      "rating": 4.4, "reviews_count": 19, "phone": "9988776655",
      "timings": "12:30pm–2:30pm, 7pm–9pm",
      "description": "Punjabi ghar ka khana — rich, tasty aur fulfilling.",
      "image": "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
      "featured": false,
      "reviews": [
        { "user": "Gurpreet S.", "rating": 5, "comment": "Punjab ka swad Electronic City mein! Dal makhani is 🔥" }
      ]
    },
    {
      "id": 6, "name": "Andhra Spice Home", "area": "Marathahalli", "type": "Non-Veg",
      "price_monthly": 2400, "price_daily": 100, "meals": ["Lunch", "Dinner"],
      "menu": ["Andhra Chicken", "Pesarattu", "Rice", "Pappu", "Avakaya Pickle", "Buttermilk"],
      "rating": 4.7, "reviews_count": 63, "phone": "9123456789",
      "timings": "12pm–2pm, 7pm–9pm",
      "description": "Spicy Andhra food lovers ke liye! Authentic recipes, ghar pe banaya jaata hai daily fresh.",
      "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
      "featured": true,
      "reviews": [
        { "user": "Suresh N.", "rating": 5, "comment": "Avakaya aur rice combo — heaven on earth!" }
      ]
    }
  ];
}
