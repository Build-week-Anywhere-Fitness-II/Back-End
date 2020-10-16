const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model.js");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res, next) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);

    user.password = hash;

    Users.add(user)
      .then((saved) => {
          const token = generateToken(user);
          res.status(201).json({userDetails: saved, token: token});
      })
      .catch((err) => {
        next({ apiCode: 500, apiMessage: "Error saving new user", ...err });
      })
});

router.post("/login", (req, res, next) => {
    let { username, password } = req.body;
    Users.findBy({ username })
     .first()
     .then((user) => {
         if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({ message: `Welcome ${user.name}!`, id: user.id, role: user.role, token })
         } else {
            next({ apiCode: 404, apiMessage: "Invalid credentials", ...err })
         }
     })
     .catch((error) => {
         next({ apiCode: 500, apiMessage: "Error loggin in", ...err })
     })
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        iat: Date.now(),
    };

    const secret = process.env.JWT_SECRET || "Some insecure secret"

    const options = {
        expiresIn: "1d"
    };

    const token =  jwt.sign(payload, secret, options);

    return token;
}

module.exports = router;
