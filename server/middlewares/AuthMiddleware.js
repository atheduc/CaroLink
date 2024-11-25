







// const { verify } = require("jsonwebtoken");

// const validateToken = (req, res, next) => {
//   const accessToken = req.header("accessToken");

//   console.log("Access Token Received:", accessToken); // Log to check if the token is coming through

//   if (!accessToken) return res.json({ error: "User not logged in!" });

//   try {
//     const validToken = verify(accessToken, "importantsecret");

//     if (validToken) {
//       return next();
//     }
//   } catch (err) {
//     return res.json({ error: err });
//   }
// };

// module.exports = { validateToken };


// const { verify } = require("jsonwebtoken");

// const validateToken = (req, res, next) => {
//   const accessToken = req.header("accessToken");

//   if (!accessToken) {
//     return res.json({ error: "User not logged in!" });
//   }

//   try {
//     const validToken = verify(accessToken, "importantsecret");
//     req.user = validToken;//ep10
//     if (validToken) {
//       return next();
//     } else {
//       return res.json({ error: "Invalid token!" });
//     }
//   } catch (err) {
//     return res.json({ error: err.message });
//   }
// };

// module.exports = { validateToken };





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

