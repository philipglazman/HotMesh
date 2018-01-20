const getPrice = () => {
  return async ctx => {
    ctx.status = 200;
    ctx.body = {
      address: "some-wallet-address",
      btcPrice: 0.0001,
    };
  };
};

module.exports = getPrice;
