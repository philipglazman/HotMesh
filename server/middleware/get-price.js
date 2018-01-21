const exec = require('child-process-promise').exec;

const getPrice = () => {

  return async ctx => {
    var address = await exec("$(pwd)'/src/wallet' 1").then ((address) => {
      
      console.log(address.stdout);
      
      address = address.stdout.toString();
      address = address.substring(0,address.length - 1)

      return address;
    });

    ctx.status = 200;
    ctx.body = {
      address,
      usdPrice: 1,
      btcPrice: 0.0001,
    };
  };
}
  

module.exports = getPrice;
