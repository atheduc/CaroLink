



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
const helmet = require('helmet');

// CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://your-frontend-domain.com' : 'http://localhost:3000', // Change production domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'accessToken'],
  credentials: true,
};

// Use Helmet for HTTP header security
app.use(helmet());

// Use the CORS middleware
app.use(cors(corsOptions));

// Middleware to handle preflight OPTIONS requests
app.options('*', cors(corsOptions));  // Handle preflight for all routes

// Middleware to log incoming requests
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  next();
});

app.use(express.json());

// Sequelize and database connection
const { Sequelize } = require('sequelize');

// Create the Sequelize instance and use environment variables for database credentials
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();  // Authenticate first
    console.log('Database connection has been established successfully.');
    await sequelize.sync();  // Sync after authenticating
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);  // Exit process with failure
  }
};

startServer();

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

// Catch-all route handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler for uncaught errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
