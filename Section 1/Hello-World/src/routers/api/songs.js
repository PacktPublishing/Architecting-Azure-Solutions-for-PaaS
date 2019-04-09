let Express = require("express");
let router = Express.Router();

// Import the mock db.
let mockDb = require("../../data/mockdb");

router.get("/", (req, res) => {
    res.json(mockDb.getSongs());
});

router.get("/:id", (req, res) => {
    res.json(mockDb.getSong(req.params.id));
});

module.exports = router;