







// // const { verify } = require("jsonwebtoken");

// // const validateToken = (req, res, next) => {
// //   const accessToken = req.header("accessToken");

// //   console.log("Access Token Received:", accessToken); // Log to check if the token is coming through

// //   if (!accessToken) return res.json({ error: "User not logged in!" });

// //   try {
// //     const validToken = verify(accessToken, "importantsecret");

// //     if (validToken) {
// //       return next();
// //     }
// //   } catch (err) {
// //     return res.json({ error: err });
// //   }
// // };

// // module.exports = { validateToken };


// // const { verify } = require("jsonwebtoken");

// // const validateToken = (req, res, next) => {
// //   const accessToken = req.header("accessToken");

// //   if (!accessToken) {
// //     return res.json({ error: "User not logged in!" });
// //   }

// //   try {
// //     const validToken = verify(accessToken, "importantsecret");
// //     req.user = validToken;//ep10
// //     if (validToken) {
// //       return next();
// //     } else {
// //       return res.json({ error: "Invalid token!" });
// //     }
// //   } catch (err) {
// //     return res.json({ error: err.message });
// //   }
// // };

// // module.exports = { validateToken };





const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };

// const { verify } = require("jsonwebtoken");

// const validateToken = (req, res, next) => {
//   // Extract the access token from the request header
//   const accessToken = req.header("accessToken");

//   // If no token is provided, return an error message
//   if (!accessToken) {
//     return res.status(401).json({ error: "User not logged in!" });
//   }

//   try {
//     // Verify the token with your secret key
//     const validToken = verify(accessToken, "importantsecret");

//     // Attach the decoded user information to the request object
//     req.user = validToken; // This makes user information available in routes

//     // Call the next middleware or route handler
//     next();
//   } catch (err) {
//     // Handle errors related to token verification
//     return res.status(403).json({ error: "Invalid or expired token!" });
//   }
// };

// module.exports = { validateToken };

