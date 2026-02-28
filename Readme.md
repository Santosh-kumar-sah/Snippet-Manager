# Snippet Manager (Full‑Stack Project)

A full‑stack **Snippet Manager** application that allows users to securely create, organize, and manage code snippets using folders, with role‑based access control and admin analytics.

The project is structured as a **monorepo** with a Node.js/Express backend API and a frontend (to be added) that consumes the API.

---

## ✨ Features

### 👤 Authentication & Authorization

* User registration and login
* JWT‑based authentication
* Role‑based access control (USER / ADMIN)
* Protected routes

### 📄 Snippet Management

* Create, read, update, and delete snippets
* Public and private snippets
* Soft delete support
* User‑specific snippet access

### 📁 Folder Management

* Create and list folders
* Organize snippets by folders
* Folder‑wise snippet grouping

### 🛠 Admin Analytics

* Total users count
* Total snippets count
* Public / private / deleted snippets statistics
* Total folders count
* Admin‑only protected dashboard

### 📚 API Documentation

* Swagger (OpenAPI) documentation available at `/api-docs`

---

## 🏗 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Swagger (swagger‑ui‑express, swagger‑jsdoc)

### Frontend (Planned)

* React
* Axios
* React Router
* Modern UI framework (TBD)

---

## 📂 Project Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── config/
│   │   │   └── swagger.js
│   │   └── utils/
│   ├── package.json
│   └── .env.example
│
├── frontend/        (to be added)
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* MongoDB (local or cloud)
* npm or yarn

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run Backend Server

```bash
npm run dev
```

Backend will start at:

```
http://localhost:8000
```

---

## 📖 API Documentation (Swagger)

Once the backend is running, open:

```
http://localhost:8000/api-docs
```

Swagger provides:

* Available endpoints
* Request/response details
* Authorization testing via JWT

---

## 🎯 Key API Endpoints

### Auth

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`

### Snippets

* `GET /api/v1/snippets`
* `POST /api/v1/snippets`
* `PUT /api/v1/snippets/:id`
* `DELETE /api/v1/snippets/:id`

### Folders

* `GET /api/v1/folders`
* `POST /api/v1/folders`

### Admin

* `GET /api/v1/admin/dashboard` (ADMIN only)

---

## 🖥 Frontend Setup (Planned)

The frontend will:

* Consume the backend REST APIs
* Handle authentication and token storage
* Provide UI for snippets and folders
* Include admin dashboard for analytics

Setup instructions will be added once frontend integration begins.

---

## 🔐 Authentication Flow

1. User logs in
2. Server returns JWT
3. Token is sent in headers:

```
Authorization: Bearer <token>
```

4. Protected routes validate token and role

---

## 📌 Future Improvements

* Refresh token support
* Pagination & search for snippets
* Folder‑wise snippet listing API
* Deployment (Docker / Cloud)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---


## 🙌 Author

Built as a learning‑focused full‑stack project demonstrating real‑world backend patterns and frontend integration.
