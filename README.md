# 📝 Task Manager (Full Stack Assignment)

A simple full-stack Task Manager application built to demonstrate core frontend and backend skills including API design, state management, and clean code structure.

---

## 🚀 Tech Stack

### Frontend

- React (TypeScript)
- Vite
- Tailwind CSS
- Axios
- React Hot Toast

### Backend

- Node.js
- Express.js
- In-memory data storage
- Custom error & response handling

---

## ✨ Features

### Core Features

- Create a new task
- View all tasks
- Mark task as complete/incomplete
- Delete a task
- Loading and error states

### Bonus Features

- Edit task title (inline edit with button)
- Toast notifications for user feedback
- Clean UI with subtle animations

---

## 📁 Project Structure

```plaintext
task-manager-fullstack/
├── client/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── components/
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── TaskList.tsx
│   │   ├── services/
│   │   │   └── task.api.ts
│   │   ├── types/
│   │   │   └── task.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── task.controller.js
│   │   ├── data/
│   │   │   └── tasks.js
│   │   ├── middleware/
│   │   │   └── error.middleware.js
│   │   ├── routes/
│   │   │   └── task.routes.js
│   │   ├── utils/
│   │   │   ├── api-error.js
│   │   │   ├── api-response.js
│   │   │   └── async-handler.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/iamayushkarma/task-manager-fullstack.git
cd project
```

---

### 2. Setup Backend

```
cd server
npm install
```

Create `.env` file:

```
PORT=8000
```

Run server:

```
npm run dev
```

Server runs at:

```
http://localhost:8000
```

---

### 3. Setup Frontend

```
cd client
npm install
```

Create `.env` file:

```
VITE_SERVER_API=http://localhost:8000/api/tasks
```

Run frontend:

```
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /api/tasks     | Get all tasks     |
| POST   | /api/tasks     | Create a new task |
| PATCH  | /api/tasks/:id | Update task       |
| DELETE | /api/tasks/:id | Delete task       |

---

## 🧠 Design Decisions

- Used **in-memory storage** to keep the solution simple and within scope
- Implemented **modular backend structure** (routes, controllers, utils)
- Used a **standard API response format** for consistency
- Chose **inline editing** for better UX without overcomplicating UI

---

## ⚠️ Limitations / Trade-offs

- Data is not persisted (resets on server restart)
- No authentication (out of scope)
- Minimal UI focus (functionality prioritized as per assignment)

---

## ⚖️ Assumptions & Trade-offs

- The application uses **in-memory storage** for tasks to keep the solution simple and within the assignment’s time constraints. Data will reset when the server restarts.
- No authentication or user management is implemented, as it was considered out of scope for this exercise.
- The UI is intentionally kept minimal, focusing on functionality, clarity, and usability rather than advanced design.
- The backend uses a **single flexible PATCH endpoint** to handle both status updates and title edits instead of separate endpoints, to keep the API simple and practical.
- Error handling is implemented at a basic level to demonstrate structure without adding unnecessary complexity.
- The solution prioritizes **clean structure and readability** over adding additional features beyond the assignment scope.

## ✅ What This Demonstrates

- Clean full-stack architecture
- REST API design
- React state management
- Error handling and user feedback
- Thoughtful trade-offs within time constraints

---

## 📌 Submission Notes

This project focuses on correctness, clarity, and maintainability rather than over-engineering, in line with the assignment requirements.

---
