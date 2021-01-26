let express = require('express');
const { route } = require('../../../05-Node-Server/server/controllers/usercontroller');
let router = express.Router();
let validateSession = require("../middleware/validate-session");
let Log = require("../db").import("../models/log");

router.get('/practice', validateSession, function(req, res){
    res.send("Hey! This is a practice route!")
})

//Log Create

router.post("/", validateSession, (req, res) => {
    const logEntry = {
        description: req.body.description,
        definition: req.body.definition, 
        result: req.body.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

//Get ALL entries

router.get("/", (req, res) =>{
    Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

//Get entry by ID
router.get("/:id", validateSession, (req, res) => {
    let userid = req.params.id
    Log.findAll({
        where: {owner_id: userid}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

//Update log
router.put("/update/:entryId", validateSession, (req, res) => {
    const updateLogEntry = {
        description: req.body.description,
        definition: req.body.definition,
        results: req.body.results
    };
    const query = {where: {id: req.params.entryId, owner_id: req.user.id}};

    Log.update(updateLogEntry, query)
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}));
});

//Delete log
router.delete("/delete/:id", validateSession, (req,res) => {
    const query = {where: {id: req.params.id, owner_id: req.user.id}};

    Log.destroy(query)
    .then(() => res.status(200).json({message: "Workout Log Removed"}))
    .catch((err) => res.status(500).json({error: err}));
});


module.exports = router