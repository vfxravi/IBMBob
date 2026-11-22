# 🍱 TiffinFinder Bangalore — Scope of Project (SOP)

## 📌 Project Overview
**App Name:** TiffinFinder  
**Purpose:** Bangalore mein ghar ka khana dhundhna aasaan banana — home cooks aur hungry professionals ko connect karna.  
**Tech Stack:** HTML + CSS + JavaScript (Vanilla)  
**Type:** Static Web App (Frontend only, JSON data ke saath)

---

## 🎯 Problem Statement
Bangalore mein lakhs of IT professionals, students aur migrants hain jo:
- Swiggy/Zomato se bored ya expensive paate hain
- Ghar jaisa khana chahte hain
- Local home cooks se directly connect karna chahte hain

Aur home cooks ke liye:
- Extra income ka koi simple platform nahi hai
- Discovery bahut mushkil hai

---

## 👥 Target Users
| User Type | Description |
|-----------|-------------|
| **Tiffin Seeker** | IT employee, student, PG mein rehne wala |
| **Home Cook / Mess Owner** | Ghar se tiffin banane wali aunties, small mess owners |

---

## ✅ Features (MVP - Minimum Viable Product)

### 🔍 For Seekers (Users)
1. **Home Page** — Search bar (area/locality), featured listings
2. **Listing Page** — Filters (Veg/Non-Veg, Price range, Area, Meal type)
3. **Cook Detail Page** — Menu, photos, pricing, timing, contact info, reviews
4. **Favorites** — Save favorite tiffin providers (localStorage)

### 🍳 For Cooks (Providers)
5. **Register as Cook** — Simple form to list yourself (name, area, menu, price, contact)
6. **My Listing Preview** — Dekho tumhara card kaisa dikhega

---

## 📄 Pages (HTML Files)
| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Search + Featured Tiffin Providers |
| Listings | `listings.html` | Filter + All providers grid |
| Detail | `detail.html` | Single provider full info |
| Register | `register.html` | Cook registration form |

---

## 🎨 UI/UX Focus Areas
- **Mobile-first design** (sabse zyada mobile pe use hoga)
- **Card-based layout** for providers
- Clean, food-inspired color palette (Orange + White + Green)
- Simple navigation — 3 click rule (koi bhi info 3 clicks mein mile)

---

## 📦 Data Structure (JSON — Mock Data)
```json
{
  "id": 1,
  "name": "Sunita Aunty's Kitchen",
  "area": "Koramangala",
  "type": "Veg",
  "price_monthly": 2500,
  "price_daily": 100,
  "meals": ["Lunch", "Dinner"],
  "menu": ["Dal", "Roti", "Sabzi", "Rice", "Pickle"],
  "rating": 4.5,
  "reviews": 23,
  "phone": "98XXXXXXXX",
  "timings": "12pm - 2pm, 7pm - 9pm",
  "image": "sunita.jpg"
}
```

---

## 🚫 Out of Scope (v1 mein nahi)
- Payment gateway
- Real-time chat
- Backend/Database (sirf JSON mock data)
- Login/Authentication
- Map/GPS integration

---

## 📅 Development Plan
| Phase | Task | Status |
|-------|------|--------|
| Phase 1 | SOP + Planning | ✅ Done |
| Phase 2 | Project Structure + Assets | 🔲 |
| Phase 3 | Home Page (index.html) | 🔲 |
| Phase 4 | Listings Page | 🔲 |
| Phase 5 | Detail Page | 🔲 |
| Phase 6 | Register Page | 🔲 |
| Phase 7 | CSS Styling | 🔲 |
| Phase 8 | JS Functionality | 🔲 |
| Phase 9 | Final Testing + Polish | 🔲 |

---

## 🗂️ Folder Structure
```
TiffinFinder/
│
├── index.html          # Home page
├── listings.html       # All listings
├── detail.html         # Cook detail page
├── register.html       # Cook registration
│
├── css/
│   ├── style.css       # Main styles
│   └── components.css  # Cards, buttons, forms
│
├── js/
│   ├── main.js         # Common functions
│   ├── listings.js     # Filter + search logic
│   ├── detail.js       # Detail page logic
│   └── register.js     # Form handling
│
├── data/
│   └── tiffins.json    # Mock data
│
└── assets/
    └── images/         # Cook photos, logo
```

---

*TiffinFinder v1.0 — Bangalore ke liye, Bangalore ke log banaye* 🏙️
