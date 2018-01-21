const compose = require("koa-compose");
const Router = require("koa-router");

const getPrice = require("./get-price");
const getAddressPaid = require("./get-address-paid");
const serveIndex = require("./serve-index");

const createRouter = () => {
  const api = new Router();
  api.get("/price", getPrice());
  api.get("/address-paid", getAddressPaid());

  const router = new Router();
  router.use("/api", api.routes(), api.allowedMethods());
  router.get("*", serveIndex());

  return compose([router.routes(), router.allowedMethods()]);
};

module.exports = createRouter;
