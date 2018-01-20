const compose = require("koa-compose");
const Router = require("koa-router");
const serveIndex = require("./serve-index");

const createRouter = () => {
  const router = new Router();
  router.get("*", serveIndex());

  return compose([router.routes(), router.allowedMethods()]);
};

module.exports = createRouter;
