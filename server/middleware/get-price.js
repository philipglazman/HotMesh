const exec = require('child_process').exec;

const getPrice = () => {
  //get wallet address
  var getAddress = exec("$(pwd)'/src/wallet' 1", (err, data) => {  
    var address = data.toString();                       
    console.log("Address:", address);
  });
  
  return async ctx => {
    ctx.status = 200;
    ctx.body = {
      address: getAddress(),
      btcPrice: 0.0001,
    };
  };
};

module.exports = getPrice;
