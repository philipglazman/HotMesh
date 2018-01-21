const exec = require('child_process').exec;

const getPrice = () => {
  //get wallet address
  exec("$(pwd)'/src/wallet' 1", function(err, data) {  
    var address = data.toString();                       
    console.log("Address:", address);
  })
  
  //TODO, async wallet address func
  return async ctx => {
    ctx.status = 200;
    ctx.body = {
      address: address,
      btcPrice: 0.0001,
    };
  };
};

module.exports = getPrice;
