let express = require("express");
let router = express.Router();

// For information
let process = require("os");

router.get("/containerId", (req, res) => {
    res.json({ 
        containerId: process.hostname(),
        ramAllocated: process.totalmem(),
        freeMemory: process.freemem()
    });
});

module.exports = router;