// =====================
// register.js — Cook registration form logic
// =====================

// Toggle checkbox pill style
function toggleCheck(input, labelId) {
  const label = document.getElementById(labelId);
  if (input.checked) {
    label.classList.add('checked');
  } else {
    label.classList.remove('checked');
  }
}

// Get selected values from checkbox group
function getCheckedValues(containerSelector) {
  return [...document.querySelectorAll(`${containerSelector} input[type=checkbox]:checked`)]
    .map(cb => cb.value);
}

// Validation helpers
function showError(id, show) {
  const el = document.getElementById(id);
  if (el) el.style.display = show ? 'block' : 'none';
}

function markField(id, error) {
  const el = document.getElementById(id);
  if (el) {
    if (error) el.classList.add('error');
    else el.classList.remove('error');
  }
}

// Validate the form
function validateForm() {
  let valid = true;

  const name  = document.getElementById('cookName').value.trim();
  const phone = document.getElementById('cookPhone').value.trim();
  const area  = document.getElementById('cookArea').value;
  const price = document.getElementById('cookPriceMonthly').value;

  // Name
  if (!name) {
    showError('cookNameErr', true);
    markField('cookName', true);
    valid = false;
  } else {
    showError('cookNameErr', false);
    markField('cookName', false);
  }

  // Phone
  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    showError('cookPhoneErr', true);
    markField('cookPhone', true);
    valid = false;
  } else {
    showError('cookPhoneErr', false);
    markField('cookPhone', false);
  }

  // Area
  if (!area) {
    showError('cookAreaErr', true);
    markField('cookArea', true);
    valid = false;
  } else {
    showError('cookAreaErr', false);
    markField('cookArea', false);
  }

  // Price
  if (!price || isNaN(price) || parseInt(price) < 500) {
    showError('cookPriceErr', true);
    markField('cookPriceMonthly', true);
    valid = false;
  } else {
    showError('cookPriceErr', false);
    markField('cookPriceMonthly', false);
  }

  return valid;
}

// Collect form data as object
function getFormData() {
  return {
    name:          document.getElementById('cookName').value.trim(),
    phone:         document.getElementById('cookPhone').value.trim(),
    area:          document.getElementById('cookArea').value,
    address:       document.getElementById('cookAddress').value.trim(),
    types:         getCheckedValues('#lblVeg, #lblNonVeg, #lblEgg').length
                     ? [document.querySelector('#lblVeg input:checked')?.value,
                        document.querySelector('#lblNonVeg input:checked')?.value,
                        document.querySelector('#lblEgg input:checked')?.value]
                       .filter(Boolean)
                     : [],
    meals:         [document.querySelector('#lblBreakfast input:checked')?.value,
                    document.querySelector('#lblLunch input:checked')?.value,
                    document.querySelector('#lblDinner input:checked')?.value]
                   .filter(Boolean),
    menu:          document.getElementById('cookMenu').value.split(',').map(s => s.trim()).filter(Boolean),
    description:   document.getElementById('cookDesc').value.trim(),
    price_monthly: parseInt(document.getElementById('cookPriceMonthly').value) || 0,
    price_daily:   parseInt(document.getElementById('cookPriceDaily').value) || 0,
    timings:       document.getElementById('cookTiming').value.trim(),
  };
}

// Preview card
function previewCard() {
  const data = getFormData();
  const previewSection = document.getElementById('previewSection');
  const previewCard    = document.getElementById('previewCard');

  // Build a mock tiffin object
  const mock = {
    id:            999,
    name:          data.name || 'Your Kitchen Name',
    area:          data.area || 'Your Area',
    type:          data.types.includes('Non-Veg') ? 'Non-Veg' : (data.types.includes('Veg') ? 'Veg' : 'Both'),
    price_monthly: data.price_monthly || 0,
    price_daily:   data.price_daily || 0,
    meals:         data.meals.length ? data.meals : ['Lunch'],
    rating:        5.0,
    reviews_count: 0,
    timings:       data.timings || 'Timing not set',
    image:         'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
  };

  previewCard.innerHTML = `<div style="max-width:360px;">${buildCard(mock)}</div>`;
  previewSection.style.display = 'block';
  previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('Preview taiyaar! ✅');
}

// Form submit
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  if (!validateForm()) {
    showToast('Pehle saari zaroori details bharo! ⚠️');
    return;
  }

  const data = getFormData();

  // Save to localStorage (mock backend)
  const existing = JSON.parse(localStorage.getItem('registered_cooks') || '[]');
  existing.push({ ...data, id: Date.now(), submitted_at: new Date().toISOString() });
  localStorage.setItem('registered_cooks', JSON.stringify(existing));

  // Show success
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('successBox').style.display   = 'block';
  document.getElementById('previewSection').style.display = 'none';

  window.scrollTo({ top: 0, behavior: 'smooth' });
});
