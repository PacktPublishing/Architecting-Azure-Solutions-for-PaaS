let Express = require("express");
let UUID = require("uuid/v4");
let router = Express.Router();

// Import the mock db.
let mockIo = require("../../data/mockio");

router.get("/", (req, res) => {
    res.json(mockIo.getTasks());
});

router.get("/:id", (req, res) => {
    res.json(mockIo.getStatus(req.params.id) || {status: 404, message: "That task cannot be found."});
});

router.post("/", (req, res) => {
    var task = {
        id: UUID(),
        status: "PENDING",
        interval: req.body.interval
    };

    mockIo.addTask(task);
    res.json({status: 200, message: `Task has been added to the collection, visit ${req.protocol}://${req.get("host")}/api/tasks/${task.id} to check the status.`});
});

module.exports = router;