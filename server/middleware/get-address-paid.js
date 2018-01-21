const exec = require('child_process').exec;

const getAddressPaid = () => {

  exec("$(pwd)'/src/wallet' 2", function(err, data) {  
    var isPaid = data.toString();                       
    console.log("isPaid:", isPaid);
  })

  return async ctx => {
    ctx.status = 200;
    ctx.body = {
      paid: false,
    };
  };
};

module.exports = getAddressPaid;
