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
          res.status(201).json(saved);
      })
      .catch((err) => {
        next({ apiCode: 500, apiMessage: "Error saving new user", ...err });
      })
});

