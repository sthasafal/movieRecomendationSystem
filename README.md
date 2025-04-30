# movieRecomendationSystem
# 🎬 CineMatch – Movie Recommendation System

CineMatch is a sleek, movie web app that lets users explore trending movies and search for their favorite titles. It features a beautiful UI, responsive layout, and favorites tracking – all powered by the TMDB API.

---

## 🚀 Features

- 🔐 Login & Registration
- 🔍 Search for movies (using TMDB)
- 🌟 See what’s trending this week
- ❤️ Mark/unmark favorites (saved in localStorage)
- 🎨 Modern dark theme

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router
- **Styling**: Custom CSS (Tailwind-style)
- **Icons**: react-icons
- **API**: TMDB (The Movie Database)
- **State**: useState, useEffect
- **Storage**: localStorage

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   ├── Modal.jsx
│   │   └── Loading.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
└── package.json

```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sthasafal/movieRecomendationSystem.git
cd movieRecomendationSystem
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your TMDB API key

Create a `.env` file inside the `frontend/` folder and add:

```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

### 4. Run the app locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---


## 🔧 Future Improvements

- Firebase authentication
- Genre filters
- Watchlist feature
- Deployment on Netlify/Vercel

---

## 🙌 Acknowledgements

- [TMDB API](https://www.themoviedb.org/)
- [React](https://react.dev/)
- [React Icons](https://react-icons.github.io/)

 
