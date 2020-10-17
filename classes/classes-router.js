const router = require("express").Router();
const Classes = require("../classes/classes-model.js");
const roleVerification = require('../auth/check-role-middleware.js')

router.post("/", roleVerification('instructor'), (req, res, next) => {
    let fitnessClass = req.body;

    Classes.add(fitnessClass)
      .then((savedClass) => {
          res.status(201).json(savedClass)
      })
      .catch((err) => {
          next({ apiCode: 500, apiMessage: "Error saving new class", ...err })
      })
})

module.exports = router;