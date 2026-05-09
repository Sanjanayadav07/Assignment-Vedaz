# 🚀 Real-Time Expert Session Booking System

A full-stack MERN application with real-time booking functionality using Socket.io. Users can browse experts, view availability, and book sessions with instant live updates and race-condition-safe booking logic.

---

# 📌 Features

## 👨‍💼 Expert Listing
- Display all experts with details (name, category, experience, rating)
- Search experts by name
- Filter by category
- Pagination support
- Loading and error states

---

## 📄 Expert Detail Page
- View complete expert profile
- View available time slots grouped by date
- Real-time slot updates using Socket.io
- Instant slot removal when booked by another user

---

## 📝 Booking System
- Book session with:
  - Name
  - Email
  - Phone
  - Date
  - Time Slot
  - Notes
- Form validation (frontend + backend)
- Success and error messages
- Prevent booking of already booked slots

---

## 📚 My Bookings
- Fetch bookings by email
- View booking status:
  - Pending
  - Confirmed
  - Completed

---

# ⚡ Real-Time Functionality
- Built using Socket.io
- Instant updates across all connected users
- When a slot is booked:
  - It is removed instantly from all clients
  - Prevents duplicate booking in UI

---

# 🛡️ Critical Feature: Double Booking Prevention

Uses MongoDB compound unique index to prevent race conditions:

```js id="xq9m1b"
bookingSchema.index(
  { expertId: 1, date: 1, timeSlot: 1 },
  { unique: true }
);
```
- Ensures only one booking per slot
- Handles simultaneous requests safely
- Returns 409 Conflict if slot already booked
---
## 🧰 Tech Stack
###  Frontend
- React (Vite)
- React Router DOM
- Socket.io Client
- Axios
### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io
---
## 📡 API Endpoints
- Experts
```
GET /experts?page=&limit=&search=&category=
GET /experts/:id
Bookings
POST /bookings
PATCH /bookings/:id/status
GET /bookings?email=
```
---
## 📁 Project Structure
```
backend/
  src/
    config/
    controllers/
    models/
    routes/
    utils/
    middleware/

frontend/
  src/
    api/
    components/
    pages/
    styles/
```
---
## ⚙️ Setup Instructions
### 1️⃣ Clone Repository
- git clone <your-repo-link>
- cd project-folder
### 2️⃣ Backend Setup
- cd backend
- npm install

## Create .env file:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```
### Run backend:
- npm run dev
  
### 3️⃣ Frontend Setup
- cd frontend
- npm install
- npm run dev
---
## 🌐 Environment Variables
- Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_url
FRONTEND_URL=http://localhost:5173
```
---
## 🎯 Workflow
- Open Expert Listing Page
- Search / Filter Experts
- Open Expert Detail Page
- Select Date & Time Slot
- Book Session
- See real-time update in another tab
- Check My Bookings via email
---
## 🔥 Highlights
- Real-time booking system
- Socket.io integration
- Race condition safe booking
- Clean MVC backend structure
- Responsive React frontend
- Proper error handling
- Scalable architecture
---
## 👨‍💻 Author

- Developed as a Software Development  Assignment Project.

## 📜 License

- This project is for educational purposes only.
