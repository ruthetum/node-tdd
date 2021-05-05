const express = require('express');
const morgan = require("morgan");
const app = express();

function logger(req, res, next) {
    console.log("logged");
    next();
}

function logger2(req, res, next) {
    console.log("logged 2");
    next();
}

app.use(logger);
app.use(logger2);
app.use(morgan("dev"));

app.listen(3000, function() {
    console.log("Server is running");
})