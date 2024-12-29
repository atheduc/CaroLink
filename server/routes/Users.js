

// const express = require("express");
// const router = express.Router();
// const { Users } = require("../models");
// const { validateToken } = require("../middlewares/AuthMiddleware");
// const bcrypt = require("bcrypt");
// const { sign } = require("jsonwebtoken");

// // Route to register a user
// router.post("/", async (req, res) => {
//   const { username, password } = req.body;
//   bcrypt.hash(password, 10).then((hash) => {
//     Users.create({
//       username: username,
//       password: hash,
//     });
//     res.json("SUCCESS");
//   });
// });

// // Route to log in a user
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await Users.findOne({ where: { username: username } });

//   if (!user) {
//     res.json({ error: "User Doesn't Exist" });
//   } else {
//     bcrypt.compare(password, user.password).then((match) => {
//       if (!match) {
//         res.json({ error: "Wrong Username And Password Combination" });
//       } else {
//         const accessToken = sign(
//           { username: user.username, id: user.id },
//           "importantsecret"
//         );
//         res.json({ token: accessToken, username: username, id: user.id });
//       }
//     });
//   }
// });

// // Route to authenticate the user (check the token)
// router.get("/auth", validateToken, (req, res) => {
//   // If the token is valid, the `validateToken` middleware adds `req.user`
//   res.json(req.user); // Respond with the authenticated user data
// });




// // Route to get basic info of a user by ID
// router.get("/basicinfo/:id", async (req, res) => {
//   const id = req.params.id;

//   try {
//     const basicInfo = await Users.findByPk(id, {
//       attributes: { exclude: ["password"] }, // Exclude sensitive info
//     });

//     if (!basicInfo) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json(basicInfo);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });


// router.put("/changepassword", validateToken, async (req, res) => {
//   const { oldPassword, newPassword } = req.body;
//   const user = await Users.findOne({ where: { username: req.user.username } });

//   bcrypt.compare(oldPassword, user.password).then(async (match) => {
//     if (!match) res.json({ error: "Wrong Password Entered!" });

//     bcrypt.hash(newPassword, 10).then((hash) => {
//       Users.update(
//         { password: hash },
//         { where: { username: req.user.username } }
//       );
//       res.json("SUCCESS");
//     });
//   });
// });

// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const { Users } = require("../models");
// const { validateToken } = require("../middlewares/AuthMiddleware");
// const bcrypt = require("bcryptjs"); // Use bcryptjs instead of bcrypt
// const { sign } = require("jsonwebtoken");

// // Route to register a user
// router.post("/", async (req, res) => {
//   const { username, password } = req.body;
//   bcrypt.hash(password, 10).then((hash) => {
//     Users.create({
//       username: username,
//       password: hash,
//     });
//     res.json("SUCCESS");
//   });
// });

// // Route to log in a user
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await Users.findOne({ where: { username: username } });

//   if (!user) {
//     res.json({ error: "User Doesn't Exist" });
//   } else {
//     bcrypt.compare(password, user.password).then((match) => {
//       if (!match) {
//         res.json({ error: "Wrong Username And Password Combination" });
//       } else {
//         const accessToken = sign(
//           { username: user.username, id: user.id },
//           "importantsecret"
//         );
//         res.json({ token: accessToken, username: username, id: user.id });
//       }
//     });
//   }
// });

// // Route to authenticate the user (check the token)
// router.get("/auth", validateToken, (req, res) => {
//   // If the token is valid, the `validateToken` middleware adds `req.user`
//   res.json(req.user); // Respond with the authenticated user data
// });

// // Route to get basic info of a user by ID
// router.get("/basicinfo/:id", async (req, res) => {
//   const id = req.params.id;

//   try {
//     const basicInfo = await Users.findByPk(id, {
//       attributes: { exclude: ["password"] }, // Exclude sensitive info
//     });

//     if (!basicInfo) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json(basicInfo);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

// router.put("/changepassword", validateToken, async (req, res) => {
//   const { oldPassword, newPassword } = req.body;
//   const user = await Users.findOne({ where: { username: req.user.username } });

//   bcrypt.compare(oldPassword, user.password).then(async (match) => {
//     if (!match) res.json({ error: "Wrong Password Entered!" });

//     bcrypt.hash(newPassword, 10).then((hash) => {
//       Users.update(
//         { password: hash },
//         { where: { username: req.user.username } }
//       );
//       res.json("SUCCESS");
//     });
//   });
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const bcrypt = require("bcryptjs"); // Use bcryptjs instead of bcrypt
const { sign } = require("jsonwebtoken");

// Route to register a user
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({
      username: username,
      password: hashedPassword,
    });
    res.status(201).json("User successfully created");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to log in a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username: username } });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);

    // If password doesn't match
    if (!match) {
      return res.status(400).json({ error: "Wrong username and password combination" });
    }

    // Generate a JWT token
    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret", // Use your secret key here
      { expiresIn: "1h" } // Optional: token expiration
    );

    // Respond with token and user info
    res.json({
      token: accessToken,
      username: user.username,
      id: user.id,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to authenticate the user (check the token)
router.get("/auth", validateToken, (req, res) => {
  // If the token is valid, the `validateToken` middleware adds `req.user`
  res.json(req.user); // Respond with the authenticated user data
});

// Route to get basic info of a user by ID
router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const basicInfo = await Users.findByPk(id, {
      attributes: { exclude: ["password"] }, // Exclude sensitive info
    });

    if (!basicInfo) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(basicInfo);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "An error occurred while fetching user" });
  }
});

// Route to change password (for authenticated users)
router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  
  try {
    const user = await Users.findOne({ where: { username: req.user.username } });

    // Compare old password
    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return res.status(400).json({ error: "Wrong password entered!" });
    }

    // Hash the new password and update it in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await Users.update(
      { password: hashedNewPassword },
      { where: { username: req.user.username } }
    );

    res.json("Password successfully changed");
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ error: "An error occurred while changing the password" });
  }
});

module.exports = router;
