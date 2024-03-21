const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./api");
const { env,port } = require("./api/vars");

/**
 * Express instance
 * @public
 */
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());

// mount api v1 routes
app.use("/", routes);

app.listen(3003, () => console.info(`${env} server started on port ${port}`));

module.exports = app;
