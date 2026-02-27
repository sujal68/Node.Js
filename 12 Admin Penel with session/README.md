<div align="center">

# 🎯 Admin Panel - Session & Passport.js Authentication

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v9.1.1-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Passport](https://img.shields.io/badge/Passport.js-v0.7.0-34E27A?style=for-the-badge&logo=passport&logoColor=white)](https://www.passportjs.org/)

**A powerful, feature-rich admin panel built with Node.js, Express, MongoDB, EJS templating engine, and Passport.js for robust session-based authentication.**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Routes](#-api-routes) • [Project Structure](#-project-structure) • [Technologies](#-technologies-used)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [Database Schema](#-database-schema)
- [Authentication & Security](#-authentication--security)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

This **Admin Panel** is a full-stack web application designed for managing administrative users with complete CRUD (Create, Read, Update, Delete) operations. Built using the **MVC (Model-View-Controller)** architecture pattern, it provides a robust and scalable solution for user management.

This upgraded version integrates **Passport.js** and **Express-Session** to maintain secure login sessions instead of relying solely on basic cookies. It also leverages **Connect-Flash** and **Toastify-js** to deliver a seamless dynamic flash-message experience for the end-user. The application continues to feature full profile management, password recovery, email verification with OTP, and file upload capabilities for admin profiles.

---

## ✨ Features

### 🔐 **Authentication & Security**
- ✅ Robust authentication using **Passport.js (Local Strategy)**
- ✅ Secure session management with **Express-Session**
- ✅ Protected and isolated routes via Passport middleware
- ✅ Dynamic interactive alerts using **Connect-Flash** & **Toastify-JS**
- ✅ Email verification with OTP (One-Time Password)
- ✅ Forgot password functionality & Password change capabilities
- ✅ Automatic logout mechanisms

### 👥 **Admin Management**
- ✅ View all admins in a comprehensive dashboard
- ✅ Add new admin users with detailed information
- ✅ Edit existing admin profiles
- ✅ Delete admin users securely
- ✅ Profile picture upload powered by **Multer**
- ✅ Personal profile page for logged-in administration

### 📊 **Dashboard Features**
- ✅ Interactive admin dashboard with real-time feedback
- ✅ User statistics, analytics, and data visualization
- ✅ Highly responsive interface for all platform resolutions

### 📧 **Email Integration**
- ✅ Email notifications using **Nodemailer**
- ✅ OTP verification to fortify registration and password resets
- ✅ HTML formatted instructional emails

---

## 🛠 Technologies Used

### **Backend Core**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | JavaScript runtime environment |
| **Express.js**| ^5.2.1 | Web application framework |
| **MongoDB** | Latest | NoSQL database system |
| **Mongoose** | ^9.1.1 | MongoDB object modeling tool |

### **Authentication & Utilities**
| Package | Version | Purpose |
|---------|---------|---------|
| **Passport.js**| ^0.7.0 | Core Authentication Middleware |
| **Passport Local**| ^1.0.0 | Username and Password Strategy |
| **Express-Session**| ^1.19.0| Application Session Management |
| **Connect-Flash** | ^0.1.1 | Temporary Flash Messaging System |
| **Toastify-JS** | ^1.12.0 | Frontend Toast Notifications |

### **Additional Packages**
| Package | Version | Purpose |
|---------|---------|---------|
| **EJS** | ^3.1.10 | Server-side templating engine |
| **Multer** | ^2.0.2 | File upload processing manager |
| **Nodemailer** | ^7.0.12 | SMTP Email dispatch module |
| **Dotenv** | ^17.3.1 | Environment variables management |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

---

## 🚀 Installation

Follow these steps to set up the project locally:

### 1️⃣ **Clone the Repository**
```bash
git clone <your-repository-url>
cd "12 Admin Penel with session"
```

### 2️⃣ **Install Dependencies**
```bash
npm install
```

### 3️⃣ **Environment Configuration**
Create a `.env` file in the root directory referencing your port numbers and internal email logic to match:
```bash
PORT=6800
SESSION_SECRET=YourSecretString
# Add your Nodemailer credentials here if configured via env
```

### 4️⃣ **Set Up MongoDB**
Make sure MongoDB is running on your system locally:

**Windows:**
```bash
mongod
```
The application will automatically connect and create a database named `Admin-Penel` on `mongodb://localhost:27017` upon inserting elements.

### 5️⃣ **Create Upload Directory**
The application uses the `upload/admin` directory for storing profile pictures. While structurally included, it can be regenerated by running:
```bash
mkdir -p upload/admin
```

---

## ⚙️ Configuration

### **Database Configuration**
The database configuration is located in `config/db.config.js`:
```javascript
const URI = 'mongodb://localhost:27017/Admin-Penel';
```

### **Session Configuration**
Session security configurations and settings reflect within `server.js` using `express-session`:
```javascript
app.use(session({
    name: "AdminPenelSession",
    secret: "12AdminPenel^(*&$%^)*",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
```

---

## 🎮 Usage

### **Start the Development Server**
```bash
npm start
```
This will start the server utilizing **Nodemon**, automatically reloading upon code modification.

### **Access the Application**
Open your browser and navigate to exactly:
```
http://localhost:6800
```
*(Or match the custom port set within `server.js` / `.env`)*

---

## 📁 Project Structure

```
12 Admin Penel with session/
│
├── config/
│   └── db.config.js          # Database connection instructions
│
├── controller/
│   └── admin.controller.js   # Application business logic handler
│
├── middleware/
│   ├── flash.middleware.js   # Connect-Flash local setup
│   ├── multer.middleware.js  # Dedicated express Multer processor
│   └── passport.localMiddleware.js # Main Passport handling logic
│
├── model/
│   └── admin.model.js        # Admin mongoose schema definition
│
├── routes/
│   └── index.js              # Application routing structure
│
├── views/                    # EJS Application Frontend rendering
│   ├── auth/                 # EJS Authenticative view portals
│   ├── Profile/              # EJS specific localized views
│   ├── dashboard.ejs         
│   ├── viewAdmin.ejs         
│   ├── addAdmin.ejs          
│   ├── editAdmin.ejs         
│   ├── header.ejs            
│   └── footer.ejs            
│
├── public/                   # Publicly static readable assets
│   ├── css/                  
│   ├── js/                   
│   └── img/                  
│
├── upload/
│   └── admin/                # Dynamically stored admin profile snaps
│
├── node_modules/             # Internal project dependencies
├── package.json              # Project operational blueprint
├── package-lock.json         # Dependency mapping structure
├── server.js                 # Primary Application initialization bridge
└── README.md                 # Project Overview 
```

---

##  ถนน API Routes

### **Public Routes** (No Authentication Required)
| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/` | User Login index page |
| `POST` | `/login` | Submit login attempt via Passport Local |
| `GET` | `/Otp-Page` | Input standard verify OTP strings |
| `POST` | `/VerifyOtp` | Execute submitted OTP checks |
| `GET` | `/forgot-pass` | Input lost password retrieval queries |
| `POST` | `/forgot-pass` | Deliver reset links via Nodemailer |

### **Protected Routes** (Passport Authentication Required)
| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/dashboard` | Protected application metric dashboard |
| `GET` | `/viewAdmin` | Visualize generated system administrators |
| `GET` | `/addAdmin` | Submit an addition user platform request |
| `POST` | `/addAdmin` | Controller handles administrator generation |
| `GET` | `/editAdmin/:id` | Fetch unique parameters related to designated IDs |
| `POST` | `/updateAdmin/:id` | Pushes overwrite changes relative to targeted admin |
| `GET` | `/deleteAdmin/:id` | Clears and resolves explicit user removal requests |
| `GET` | `/profile` | Unique dynamic scope relative to internal logged-in admins |
| `GET` | `/logout` | Expunges internal passport session details comprehensively |

---

## 🔒 Session Authentication & Flash Operations

### **Passport Local Implementation**
- Passport intelligently compares requested local submission via `passport-local` utilizing custom validations mapped within `middleware/passport.localMiddleware.js`.
- Express-Session serializes/deserializes designated logged instances into continuous memory states spanning `1000 * 60 * 60 * 24` ms intervals.

### **Flash Integration Flow**
- Rejections inside passport authenticating generate unique error messages natively sent identically to the client-view parameter utilizing `connect-flash`. EJS injects frontend outputs via `Toastify-JS`.

### **General Security**
- Profile media uploaded successfully is renamed locally ensuring data purity: `timestamp-originalname` formatting.

---

## 🤝 Contributing

Contributions are heavily welcomed to build upon this robust architectural basis:

1. **Fork** the repository systematically.
2. **Create** a branch dedicated to feature implementation (`git checkout -b feature/NewFeatureDesign`).
3. **Commit** tested and functional pushes (`git commit -m 'Added NewFeatureDesign'`).
4. **Push** natively into the designated branch mapping (`git push origin feature/NewFeatureDesign`).
5. **Open** a Pull Request referencing issue logs appropriately.

---

## 📄 License

This comprehensive boilerplate architecture reflects standard project logic structures and operates entirely localized utilizing **ISC** permissive standardizations.

---

## 👨‍💻 Author

**Sujal**
- GitHub: [@sujal68](https://github.com/sujal68)
- Email: sujalkidecha68@gmail.com

---

<div align="center">

### ⭐ If this architecture scales smoothly for your development scope, consider starring it!

**Made with ❤️ by Sujal**

</div>
