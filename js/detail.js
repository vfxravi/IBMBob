// =====================
// detail.js — Cook detail page logic
// =====================

async function initDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));

  if (!id) {
    document.getElementById('detailContent').innerHTML =
      `<p style="color:#e74c3c; text-align:center; padding:3rem;">
        Invalid page. <a href="listings.html" style="color:#FF6B35;">Wapas jao →</a>
      </p>`;
    return;
  }

  const data = await loadTiffins();
  const tiffin = data.find(t => t.id === id);

  if (!tiffin) {
    document.getElementById('detailContent').innerHTML =
      `<p style="color:#e74c3c; text-align:center; padding:3rem;">
        Tiffin nahi mila. <a href="listings.html" style="color:#FF6B35;">Wapas jao →</a>
      </p>`;
    return;
  }

  document.title = `${tiffin.name} — TiffinFinder`;
  renderDetail(tiffin);
}

function renderDetail(t) {
  const favs  = getFavorites();
  const isFav = favs.includes(t.id);

  const reviewsHTML = t.reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <span class="review-user">👤 ${r.user}</span>
        <span class="stars" style="font-size:0.9rem;">${getStars(r.rating)} ${r.rating}/5</span>
      </div>
      <p class="review-text">"${r.comment}"</p>
    </div>
  `).join('');

  const menuHTML = t.menu.map(item => `<span class="menu-item">${item}</span>`).join('');

  document.getElementById('detailContent').innerHTML = `
    <div class="detail-hero">
      <!-- Left: Image -->
      <div>
        <img class="detail-img" src="${t.image}" alt="${t.name}"
             onerror="this.src='https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop'"/>
      </div>

      <!-- Right: Info -->
      <div class="detail-info">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
          <h1>${t.name}</h1>
          <button class="fav-btn ${isFav ? 'active' : ''}"
            onclick="toggleFav(${t.id}, this)"
            style="font-size:1.6rem; min-width:40px;">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>

        <div class="detail-meta">
          ${getBadge(t.type)}
          <span class="tag">📍 ${t.area}</span>
          ${t.meals.map(m => `<span class="tag">${m}</span>`).join('')}
        </div>

        <!-- Rating -->
        <div class="card-rating" style="font-size:1rem; gap:0.5rem;">
          <span class="stars" style="font-size:1.1rem;">${getStars(t.rating)}</span>
          <strong style="font-size:1.1rem;">${t.rating}</strong>
          <span style="color:#aaa;">(${t.reviews_count} reviews)</span>
        </div>

        <!-- Description -->
        <p style="color:#555; margin:0.8rem 0; font-size:0.93rem;">${t.description}</p>

        <!-- Info rows -->
        <div style="margin:1rem 0;">
          <div class="info-row">
            <span class="info-icon">⏰</span>
            <span class="info-label">Timing</span>
            <span>${t.timings}</span>
          </div>
          <div class="info-row">
            <span class="info-icon">📞</span>
            <span class="info-label">Phone</span>
            <span>${t.phone}</span>
          </div>
          <div class="info-row">
            <span class="info-icon">📍</span>
            <span class="info-label">Area</span>
            <span>${t.area}, Bangalore</span>
          </div>
        </div>

        <!-- Price box -->
        <div class="detail-price-box">
          <div class="price-row">
            <span class="label">Monthly Subscription</span>
            <span class="value">₹${t.price_monthly} / month</span>
          </div>
          <div class="price-row" style="margin-bottom:0;">
            <span class="label">Daily Rate</span>
            <span class="value">₹${t.price_daily} / day</span>
          </div>
        </div>

        <!-- Contact Buttons -->
        <div class="contact-btn">
          <a href="tel:${t.phone}" class="btn btn-call">📞 Call Karo</a>
          <a href="https://wa.me/91${t.phone}?text=Hi! TiffinFinder se dekha. Tiffin ke baare mein baat karni thi." 
             target="_blank" class="btn btn-whatsapp">💬 WhatsApp</a>
        </div>
      </div>
    </div>

    <!-- Menu Section -->
    <div class="section" style="padding:2rem 0 1rem;">
      <h2 class="section-title">🍽️ Menu</h2>
      <div class="menu-items">${menuHTML}</div>
    </div>

    <!-- Reviews Section -->
    <div class="section" style="padding:1rem 0 2rem; border-top:1px solid var(--border);">
      <h2 class="section-title">⭐ Customer Reviews</h2>
      <p class="section-subtitle">${t.reviews_count} log ne review diya hai</p>
      ${reviewsHTML}

      <!-- Add Review (mock UI) -->
      <div style="background:#f9f4f0; border-radius:var(--radius-sm); padding:1.2rem; margin-top:1rem; border:1px dashed var(--border);">
        <p style="font-weight:600; margin-bottom:0.6rem;">✍️ Apna Review Do</p>
        <textarea style="width:100%; padding:0.6rem; border:1.5px solid var(--border); border-radius:8px; font-size:0.9rem; outline:none; resize:vertical; font-family:inherit;"
          rows="2" placeholder="Aapka experience kaisa raha?" id="reviewInput"></textarea>
        <button onclick="submitReview()" class="btn btn-primary" style="margin-top:0.6rem; padding:0.5rem 1.3rem; font-size:0.88rem;">
          Submit Review
        </button>
      </div>
    </div>
  `;
}

function submitReview() {
  const input = document.getElementById('reviewInput');
  if (input && input.value.trim()) {
    showToast('Review submit ho gaya! Shukriya 🙏');
    input.value = '';
  } else {
    showToast('Pehle kuch likho! ✍️');
  }
}

document.addEventListener('DOMContentLoaded', initDetail);
