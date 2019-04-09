// Server
let Express = require("express");
let bodyParser = require("body-parser");
let app = new Express();

// Configuration
app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(Express.static("./src/public"));

// Body parsers are needed now.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log the request before passing on
let logger = require("./services/logging");
app.all("*", function(req, res, next) {
    logger.logRequest(req);

    // Move onward and process the request in pipeline.
    next();
});

// Home page
let homeRouter = require("./routers/home");
app.use("/", homeRouter);

// Songs API 
let songsRouter = require("./routers/api/songs");
app.use("/api/songs", songsRouter);

let tasksRouter = require("./routers/api/tasks");
app.use("/api/tasks", tasksRouter);

// Process information
let processApi = require("./routers/api/process");
app.use("/api/process", processApi);

// Catch-all
app.all("*", (req, res) => {
    res.render("/shared/lost", { pageTitle: "404"});
});

let serverConfigurations = require("./serverconfig");
app.listen(serverConfigurations.serverPort, () => {
    let serverStatus = `Server listening on localhost:${serverConfigurations.serverPort}.`;
    logger.logEvent("server start", serverStatus);
    console.log(serverStatus);
});