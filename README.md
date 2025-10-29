# 🌐 DocOnTap – Your Digital Healthcare Booking Companion

**DocOnTap** is a next-gen doctor appointment platform designed to bridge the gap between patients and healthcare providers. With real-time scheduling, secure payments, and personalized dashboards for every user role, DocOnTap transforms the traditional clinic experience into a seamless digital solution.

---

## ❓ Why DocOnTap?

In today’s digital-first world, healthcare scheduling often remains outdated and inefficient. Patients are burdened with:

- Long waiting times
- Manual appointment procedures
- Lack of centralized medical history
- Unverified information about healthcare professionals

**DocOnTap** eliminates these pain points by offering a unified platform that delivers:

✔ Instant appointment booking  
✔ Access to digital prescriptions & health records  
✔ Transparent doctor profiles with filters  
✔ Integrated online payments  

---

## 🛠️ Tech Stack Overview

| Layer       | Technology              |
|------------|--------------------------|
| Frontend    | React.js, Tailwind CSS   |
| Backend     | Node.js, Express.js      |
| Database    | MongoDB (NoSQL)          |
| Payments    | Razorpay Payment Gateway |
| Deployment  | Customizable (e.g., Vercel + Render) |

---

## 🧱 Project Structure

```
DocOnTap/
├── frontend/         # React-based client application
│   └── ...           # Pages, Components, Services, etc.
├── backend/          # Express-based REST API server
│   └── ...           # Routes, Controllers, Models, Middleware
└── README.md         # Project documentation
```

---

## 🔑 Key Features & Functional Modules

### 🔐 1. Role-Based Authentication
- Dedicated login for **Patients**, **Doctors**, and **Admins**
- Passwords encrypted using industry-standard hashing
- Session and token-based authorization (JWT)

### 👨‍⚕️ 2. Doctor Discovery Engine
- Search doctors by specialty, city, name, or availability
- Filter based on consultation fees, experience, or patient reviews

### 📅 3. Dynamic Appointment Scheduler
- Book, reschedule, or cancel appointments in real-time
- Doctor-side control for approving or rejecting appointments
- Calendar-based availability system

### 🧾 4. Patient History & E-Records
- Centralized view of appointment history
- Access to uploaded prescriptions and doctor notes

### 🩺 5. Personalized Dashboards
- Doctors: Appointment list, availability manager, patient access  
- Patients: Upcoming bookings, profile info, payment history  
- Admin: Platform-wide analytics, user/doctor management

### 💳 6. Razorpay Payment Gateway
- Real-time fee payments via secure Razorpay integration
- Supports transaction tracking and failure handling

---

## 👥 Who Can Use DocOnTap?

| User Type           | Benefits Delivered                                              |
|---------------------|------------------------------------------------------------------|
| **Patients**         | Book appointments, view doctors, access records & pay online    |
| **Doctors**          | Manage consultations, patient details & availability            |
| **Admins**           | Supervise system-wide activities & manage user roles            |
| **Reception Staff**  | Eliminate manual scheduling and paperwork                       |
| **Caregivers**       | Easy booking for dependent family members                       |

---

## ⚡ Getting Started Locally

### 🔽 Prerequisites

- Node.js v18+
- MongoDB Atlas
- Razorpay Developer Account
- Stripe Account

---

## 🌐 Frontend Setup (`/frontend`)

```bash
cd frontend
npm install
npm run dev
```

This serves the client application on [https://docontap-project-frontend.onrender.com]([http://localhost:5173](https://docontap-project-frontend.onrender.com))

---

## 🔧 Backend Setup (`/backend`)

```bash
cd backend
npm install
```

### Create `.env` in the `/backend` folder:
```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret
```

Then run the backend server:
```bash
npm run server
```

It will be available on [http://localhost:4000](http://localhost:4000)

---

## 🧪 Sample Environment File

Create a `.env` file inside `/backend/`:

```env
CURRENCY = "-----Enter currency-----"
JWT_SECRET = "-----Enter JWT secret-----"

# Admin Panel Credentials
ADMIN_EMAIL = "-----Enter admin email-----"
ADMIN_PASSWORD = "-----Enter admin password-----"

# MongoDB Setup ( required )
MONGODB_URI = "-----Enter MongoDB URI-----"

# Cloudinary Setup ( required )
CLOUDINARY_NAME = "-----Enter Cloudinary name-----"
CLOUDINARY_API_KEY = "-----Enter Cloudinary API key-----"
CLOUDINARY_SECRET_KEY = "-----Enter Cloudinary secret key-----"

# Razorpay Payment Integration
RAZORPAY_KEY_ID = "-----Enter Razorpay key ID-----"
RAZORPAY_KEY_SECRET = "-----Enter Razorpay key secret-----"

# Stripe Payment Integration
STRIPE_SECRET_KEY = "-----Enter Stripe secret key-----"

# Email/SMTP Setup
BASE_URL = "-----Enter base URL-----"
SERVICE = "-----Enter mail service-----"
HOST = "-----Enter mail host-----"
EMAIL_PORT = "-----Enter mail port-----"
SECURE = "-----true/false for secure connection-----"
USER = "-----Enter mail user-----"
PASS = "-----Enter mail password-----"

# Zoom Ids
zoomAccountId = "-----Enter Zoom account ID-----"
zoomClientId = "-----Enter Zoom client ID-----"
zoomClientSecret = "-----Enter Zoom client secret-----"
```

---

## 📸 Screenshots & Demo (Coming Soon)

> UI mockups, patient-doctor interactions, dashboards, and payment screens will be added in future updates.

---

## 🛡 License



---

## 💡 Future Enhancements

- Email/SMS notifications on appointments
- Telemedicine/video consultation integration
- Mobile app version (React Native)
- AI-based doctor suggestions based on symptoms

---

## 🧑‍💻 Contributing

We welcome contributors! To contribute:

1. Fork the repository
2. Create a feature branch
3. Commit and push your changes
4. Open a Pull Request

---

## ✨ Acknowledgements

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Razorpay](https://razorpay.com/)
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Open-source community ❤️

---

### 💬 Found this project helpful? Don’t forget to ⭐ the repo and share it!
