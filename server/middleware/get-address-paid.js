const exec = require('child-process-promise').exec;

const getAddressPaid = () => {
  var isPaid
  
  return async ctx => {
    var paid = await exec("$(pwd)'/src/wallet' 2").then ((isPaid) => {
      console.log(isPaid.stdout);
      return Boolean(Number(isPaid.stdout));
    });

    ctx.status = 200;
    ctx.body = {
      paid,
    };
  };
  
};

module.exports = getAddressPaid;
