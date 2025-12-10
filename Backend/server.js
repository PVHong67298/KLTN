const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const multer = require('multer');
const path = require('path');
const connectDB = require('./app/config/db.config.js');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// // CORS Configuration
// const corsOptions = {
//   origin: "http://localhost:3000",
// };
app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to handle form-data, including image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save images to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Apply multer as middleware globally to handle form-data and image uploads
app.use(upload.any()); // .any() allows for any file type; adjust as needed

// Middleware for method overriding
app.use(methodOverride("_method"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import and set up routes
const route = require("./app/routes/index.js");
route(app);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
