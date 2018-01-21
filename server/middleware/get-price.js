const exec = require('child_process').exec;
const request = require('request');

const getPrice = () => {
  //get wallet address
  // var getAddress = exec("$(pwd)'/src/wallet' 1", (err, data) => {  
  //   var address = data.toString();                       
  //   console.log("Address:", address);
  //   return address;
  // });

  return async ctx => {


    var address = await exec("$(pwd)'/src/wallet' 1", (err, data) => {  
      var add = data.toString();                       
    console.log("Add:", add);
    return add;                       
    });

    ctx.status = 200;
    ctx.body = {
      address,
      usdPrice: 1,
      btcPrice: 0.0001,
    };
  };
};

module.exports = getPrice;
