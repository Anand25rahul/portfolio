# Premium Developer Portfolio & Admin CRUD Portal

A modern, responsive, and beautiful developer portfolio featuring dynamic translation keys (English/Hindi), custom theme toggles (Dark/Light), and a fully functional lockable **Admin Edit Mode** powered by a Node.js/Express + MongoDB backend.

---

## 🎨 Design & Key Features

* **Rich Glassmorphic UI**: Vibrant gradient background glows, translucent card designs, dynamic hover micro-animations, and fluid transitions.
* **Authentication Lock**: Enter Admin Mode by clicking the lock button (🔒) in the Navbar.
  * **Default Credentials**: ID: `anand` | Password: `123456`
* **Real-time Frontend Updates**:
  * Modify core profile details (Name, Headline, About Biography, Contact Email, LinkedIn/GitHub links) directly via the edit profile popup form.
  * **Dynamic Photo Uploads**: Upload profile photos directly from the dashboard (saved automatically as Base64 strings in MongoDB).
  * **Dynamic CV Uploads**: Upload your resume PDF document directly to update the "Download CV" action button source dynamically.
* **Full CRUD Management**: Easily create, edit, or delete items in the **Projects**, **Skills**, **Timeline Milestones**, and **Certifications** sections.
* **Dual-Language Translations**: Interactive translations support between English and Hindi.
* **Database Messages Inbox**: Inbound messages sent via the Contact Form are stored directly in MongoDB.

---

## 🛠️ Technology Stack

* **Frontend**: React.js, Vite, Vanilla CSS Variables.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB, Mongoose Schemas.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed and a local instance of [MongoDB](https://www.mongodb.com/) running on your system.

### 1. Database Seeding & Startup
To seed the database collections with your initial portfolio information (Real Projects, Skills, Timeline, Certifications, and Profile details):
```bash
cd backend
node seed.js
```

### 2. Start Backend Server
Starts the Express API server on `http://localhost:5000`:
```bash
cd backend
node server.js
```

### 3. Start Frontend Dev Client
Starts the Vite client dev server on `http://localhost:5173`:
```bash
npm run dev
```

---

## 📁 Repository Structure

* `public/`: Static assets (original fallback images and PDFs).
* `src/`: React frontend source.
  * `components/`: Navbar, Hero, About, Projects, Certifications, Timeline, Contact, Toast, AdminModal, and LoginModal elements.
  * `utils/`: Language translation files.
  * `App.jsx`: State coordinator and frontend lifecycle controls.
* `backend/`: Express Server configuration, Mongoose models, API routes, and MongoDB seeder.
