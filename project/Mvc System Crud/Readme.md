# 🎬 YouTube Video CRUD - MVC System

A full-featured **CRUD application** built with **Node.js**, **Express**, **MongoDB**, and **EJS** following the **MVC (Model-View-Controller)** architecture pattern. This project demonstrates a clean, maintainable, and scalable approach to building web applications with file upload capabilities.

![Home Page](readme%20img/homePage.png)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Routes](#-api-routes)
- [Screenshots](#-screenshots)
- [Database Schema](#-database-schema)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- ✅ **Complete CRUD Operations** - Create, Read, Update, and Delete video entries
- 🎨 **MVC Architecture** - Clean separation of concerns for maintainability
- 📁 **Multiple File Uploads** - Upload thumbnail, profile image, and video GIF simultaneously
- 🗄️ **MongoDB Integration** - Robust NoSQL database for data persistence
- 🖼️ **Image Management** - Automatic file handling with Multer
- 🔄 **Dynamic Rendering** - Server-side rendering with EJS templates
- 🗑️ **Smart File Deletion** - Automatic cleanup of uploaded files when records are deleted
- 📱 **Responsive UI** - Modern and clean user interface
- ⚡ **Auto-Reload** - Nodemon for development hot-reloading

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB object modeling |
| **EJS** | Templating engine |
| **Multer** | File upload middleware |
| **Nodemon** | Development auto-reload |

---

## 📁 Project Structure

```
Mvc System Crud/
│
├── config/
│   └── db.config.js          # MongoDB connection configuration
│
├── controller/
│   └── home.controller.js    # Business logic for CRUD operations
│
├── model/
│   └── you.model.js          # Mongoose schema for YouTube videos
│
├── routes/
│   └── index.js              # Route definitions and Multer setup
│
├── Views/
│   ├── youtube.ejs           # Main page displaying all videos
│   ├── videoAddForm.ejs      # Form to add new video
│   └── editVideoForm.ejs     # Form to edit existing video
│
├── public/                   # Static assets (CSS, JS, images)
│
├── uploads/                  # Uploaded files storage
│
├── readme img/               # README screenshots
│   ├── homePage.png
│   ├── addPage.png
│   └── editPage.png
│
├── server.js                 # Application entry point
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or remote connection)
- **npm** or **yarn**

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Mvc System Crud"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure MongoDB**
   
   Update the MongoDB connection URL in `config/db.config.js`:
   ```javascript
   const url = "mongodb://localhost:27017/Youtube-video-crud";
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:6800
   ```

---

## 💻 Usage

### Adding a New Video

1. Click on the **"Add Video"** button on the home page
2. Fill in the video details:
   - **Thumbnail** - Upload video thumbnail image
   - **Duration** - Video duration (e.g., "10:25")
   - **Profile** - Upload channel profile image
   - **Title** - Video title
   - **Channel** - Channel name
   - **Views** - View count (e.g., "1.2M views")
   - **Video Link** - YouTube video URL
   - **Video GIF** - Upload animated preview GIF
3. Click **Submit** to save

![Add Video Page](readme%20img/addPage.png)

### Editing a Video

1. Click the **"Edit"** button on any video card
2. Modify the desired fields
3. Optionally upload new images (old images will be automatically deleted)
4. Click **Update** to save changes

![Edit Video Page](readme%20img/editPage.png)

### Deleting a Video

1. Click the **"Delete"** button on any video card
2. The video and all associated uploaded files will be permanently removed

---

## 🛣️ API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/` | Display all videos (home page) |
| `GET` | `/addVideoForm` | Render add video form |
| `GET` | `/addVideoEdit` | Render edit video form |
| `GET` | `/deleteVideo/:DeleteID` | Delete video by ID |
| `GET` | `/editVideo/:UpdateID` | Fetch video data for editing |
| `POST` | `/add-video` | Create new video entry |
| `POST` | `/update-video` | Update existing video entry |

---

## 📸 Screenshots

### Home Page - Video Gallery
![Home Page](readme%20img/homePage.png)

### Add New Video
![Add Page](readme%20img/addPage.png)

### Edit Video
![Edit Page](readme%20img/editPage.png)

---

## 🗃️ Database Schema

### YouTube Video Model

```javascript
{
  Thumnail: String,      // Path to thumbnail image
  Duration: String,      // Video duration (e.g., "10:25")
  Profile: String,       // Path to channel profile image
  Title: String,         // Video title
  Channel: String,       // Channel name
  Views: String,         // View count (e.g., "1.2M views")
  VideoLink: String,     // YouTube video URL
  VideoGif: String       // Path to animated preview GIF
}
```

**Collection Name:** `Youtube`

---

## 🎯 Key Features Explained

### MVC Architecture

- **Model** (`model/you.model.js`) - Defines data structure and database interactions
- **View** (`Views/*.ejs`) - Handles presentation layer and user interface
- **Controller** (`controller/home.controller.js`) - Contains business logic and request handling

### File Upload System

The application uses **Multer** for handling multiple file uploads:

```javascript
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
```

**Features:**
- Unique filenames using timestamps
- Organized storage in `uploads/` directory
- Support for multiple file fields (Thumbnail, Profile, VideoGif)
- Automatic cleanup on update/delete operations

### Smart File Management

When updating or deleting records, the application automatically:
1. Checks if old files exist
2. Deletes old files from the filesystem
3. Replaces with new files (on update)
4. Prevents orphaned files

---

## 🔧 Configuration

### Server Configuration

**Port:** `6800` (configurable in `server.js`)

```javascript
const port = 6800;
```

### Database Configuration

**Database Name:** `Youtube-video-crud`

Update in `config/db.config.js`:
```javascript
const url = "mongodb://localhost:27017/Youtube-video-crud";
```

---

## 📦 Dependencies

```json
{
  "ejs": "^3.1.10",
  "express": "^5.2.1",
  "mongoose": "^9.0.2",
  "multer": "^2.0.2",
  "nodemon": "^3.1.11"
}
```

---

## 🚦 Development

### Running in Development Mode

```bash
npm start
```

This uses **Nodemon** for automatic server restart on file changes.

### Project Workflow

1. **Server starts** → Connects to MongoDB
2. **Routes registered** → Express handles incoming requests
3. **Controller processes** → Business logic execution
4. **Model interacts** → Database operations
5. **View renders** → EJS templates generate HTML
6. **Response sent** → Client receives rendered page

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Sujal Kidecha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


## 👨‍💻 Author

**Sujal Kidecha**

- GitHub: [@sujal68](https://github.com/sujal68)
- Project: Node.js MVC CRUD System

---

## 🙏 Acknowledgments

- Express.js community for excellent documentation
- MongoDB for robust database solution
- EJS for simple and powerful templating
- Multer for seamless file upload handling

---

## 📞 Support

If you encounter any issues or have questions, please:
- Open an issue in the repository
- Contact the maintainer

---

## 🎓 Learning Resources

This project is perfect for learning:
- MVC architecture patterns
- RESTful API design
- File upload handling in Node.js
- MongoDB CRUD operations
- EJS templating
- Express.js middleware

---

**Made with ❤️ using Node.js and Express**
