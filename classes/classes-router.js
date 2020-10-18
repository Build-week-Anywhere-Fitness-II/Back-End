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

router.get('/', (req, res, next) => {
    Classes.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch((err) => {
        next({apiCode: 500, apiMessage: "error retrieving classes", ...err})
    })
})

router.post("/signup", (req, res, next) => {
    const attendee = req.body;

    Classes.signUp(attendee)
     .then((count) => {
         res.status(200).json(count)
     })
     .catch((err) => {
         next({ apiCode: 500, apiMessage: "error signin up for class", ...err })
     })
})

module.exports = router;