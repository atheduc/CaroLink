

// require('dotenv').config(); // Load environment variables

// const express = require('express');
// const cors = require('cors');
// const app = express();

// // CORS Configuration
// const corsOptions = {
//   origin: 'http://localhost:3000', // Allow your React client
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add 'OPTIONS' to allow preflight requests
//   allowedHeaders: ['Content-Type', 'Authorization', 'accessToken'], // Allow headers including 'accessToken'
//   credentials: true, // Allow credentials like cookies (if needed)
// };

// // Use the CORS middleware
// app.use(cors(corsOptions));

// // Middleware to handle preflight OPTIONS requests
// app.options('*', cors(corsOptions));  // Handle preflight for all routes

// // Middleware to log incoming requests
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   console.log('Request Headers:', req.headers);
//   next();
// });

// app.use(express.json());

// const db = require('./models');

// // Routers
// const postRouter = require("./routes/Posts");
// app.use("/posts", postRouter);
// const commentsRouter = require("./routes/Comments");
// app.use("/comments", commentsRouter);
// const usersRouter = require("./routes/Users");
// app.use("/auth", usersRouter);
// const likesRouter = require("./routes/Likes");
// app.use("/likes", likesRouter);

// // Sync database and start server
// db.sequelize.sync().then(() => {
//   app.listen(3001, () => {
//     console.log("Server running on port 3001");
//   });
// });

// // Authenticate database connection
// db.sequelize.authenticate().then(() => {
//   console.log('Database connection has been established successfully.');
// }).catch((error) => {
//   console.error('Unable to connect to the database:', error);
// });



require('dotenv').config();  // Load environment variables

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

// Sequelize and database connection
const { Sequelize } = require('sequelize');

// Create the Sequelize instance and use environment variables for database credentials
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,  // e.g. carolinkdb_user
  password: process.env.DB_PASSWORD,  // e.g. your password
  database: process.env.DB_NAME,     // e.g. carolinkdb
  host: process.env.DB_HOST,         // e.g. dpg-cthc2kogph6c73dbajrg-a.oregon-postgres.render.com
  port: process.env.DB_PORT,         // e.g. 5432
  dialect: 'postgres',               // We're using PostgreSQL
  dialectOptions: {
    ssl: {
      require: true,                 // Use SSL connection for security
      rejectUnauthorized: false      // Don't reject self-signed certificates
    }
  }
});

// Sync database and start server
sequelize.sync().then(() => {
  const port = process.env.PORT || 3001;  // Use dynamic port for Render, fallback to 3001 for local
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

// Authenticate database connection
sequelize.authenticate().then(() => {
  console.log('Database connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);
