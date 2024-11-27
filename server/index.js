



const express = require('express');
const cors = require('cors');
const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow your React client
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add 'OPTIONS' to allow preflight requests
  allowedHeaders: ['Content-Type', 'Authorization', 'accessToken'], // Allow headers including 'accessToken'
  credentials: true, // Allow credentials like cookies (if needed)
};

// Use the CORS middleware
app.use(cors(corsOptions));

// Middleware to handle preflight OPTIONS requests
app.options('*', cors(corsOptions));  // Handle preflight for all routes

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  next();
});

app.use(express.json());

const db = require('./models');

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});

// Authenticate database connection
db.sequelize.authenticate().then(() => {
  console.log('Database connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});