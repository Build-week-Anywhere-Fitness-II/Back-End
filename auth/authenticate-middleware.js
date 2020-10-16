const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || 'Some insecure secret';

module.exports = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : "";
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
        if(err) {
            next({ apiCode: 401, apiMessage: "Invalid credentials", ...err })
        } else {
            req.decodedToken = decodedToken;
            next();
        }
    });
  } else {
    next({ apiCode: 404, apiMessage: "No credentials provided" })
  }
};
