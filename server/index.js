/* eslint-disable no-console */
const path = require("path");
const Koa = require("koa");
const compress = require("koa-compress");
const conditional = require("koa-conditional-get");
const etag = require("koa-etag");
const logger = require("koa-logger");
const serve = require("koa-static");

import router from "./middleware/router";

const app = new Koa();

app.use(logger());
app.use(compress());
app.use(conditional());
app.use(etag());
app.use(serve(path.resolve("static")));
app.use(router());

app.listen(80, () => {
  console.log(`Server running on port ${80}`);
});
