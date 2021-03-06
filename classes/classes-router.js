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

router.put('/edit/:id', roleVerification('instructor'), (req, res, next) => {
    let id = req.params.id;
    let changes = req.body;

    Classes.editClass(id, changes)
        .then((updated) => {
            res.status(200).json(updated)
        })
        .catch((err) => {
            next({ apiCode: 500, apiMessage: "error updating class", ...err })
        })
})

router.delete('/delete/:id', roleVerification('instructor'), (req, res, next) => {
    let id = req.params.id;

    Classes.deleteClass(id)
    .then(() => {
        res.status(200).json({message: 'class succesfully deleted'})
    })
    .catch((err) => {
        next({ apiCode: 500, apiMessage: "error deleting class", ...err })
    })
})

router.get("/client/:id", (req, res, next) => {
    let id = req.params.id;

    Classes.findClientClasses(id)
    .then((classList) => {
        res.status(200).json(classList)
    })
    .catch((err) => {
        next({ apiCode: 500, apiMessage: "error retrieving class list", ...err })
    })
})

router.get("/instructor/:id", (req, res, next) => {
    let id = req.params.id;

    Classes.findInstructorClasses(id)
    .then((classList) => {
        res.status(200).json(classList)
    })
    .catch((err) => {
        next({ apiCode: 500, apiMessage: "error retrieving class list", ...err })
    })
})



module.exports = router;