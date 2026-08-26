# 🚀 DevSphere — AI-Powered Developer Portfolio Generator

DevSphere is a full-stack web application designed to automatically fetch GitHub repository data and transform it into sleek, live developer portfolios.

---

## ✨ Features

- **GitHub Project Analysis:** Instantly fetch repository stats (Stars, Forks, Watchers, Issues) and language breakdowns.
- **Automated Portfolio Generation:** Generate showcase cards and live portfolio pages directly from a GitHub URL.
- **Dashboard Management:** View all created portfolios in one central place.
- **Live Portfolio Previews:** Generates shareable live portfolio links (`/portfolio/:id`).
- **Full CRUD Operations:** Support for creating, viewing, editing, and deleting portfolios.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React 18 + Vite
- **Routing:** React Router DOM (v6/v7)
- **Styling:** Tailwind CSS

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Dev Tools:** Nodemon
- **API Integration:** Axios / GitHub REST API

---

## 📁 Project Structure

```text
DevSphere/
├── backend/
│   ├── controllers/
│   │   └── portfolioController.js
│   ├── routes/
│   │   ├── githubRoutes.js
│   │   └── portfolioRoutes.js
│   ├── services/
│   │   └── githubService.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/ (or root)
    ├── src/
    │   ├── components/
    │   ├── layouts/
    │   │   └── Layout.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── CreatePortfolio.jsx
    │   │   ├── EditPortfolio.jsx
    │   │   └── LivePortfolio.jsx
    │   ├── services/
    │   │   ├── githubApi.js
    │   │   └── portfolioApi.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js