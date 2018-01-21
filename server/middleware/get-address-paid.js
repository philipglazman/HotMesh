const getAddressPaid = () => {
  return async ctx => {
    ctx.status = 200;
    ctx.body = {
      paid: false,
    };
  };
};

module.exports = getAddressPaid;
