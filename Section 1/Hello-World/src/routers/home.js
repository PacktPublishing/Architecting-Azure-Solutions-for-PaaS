let Express = require("express");
let router = Express.Router();
let logger = require("../services/logging");

// Get the container ID
const os = require('os');

// Routing
router.get("/", function(req, res) {
    res.render("home/index", { pageTitle: "Home Page", containerId: os.hostname()});
});

router.get("/about", function(req, res) {
    res.render("home/about", { pageTitle: "About Container"});
});

router.get("/contact", function(req, res) {
    res.render("home/contact", { pageTitle: "Collab" });
});

module.exports = router;