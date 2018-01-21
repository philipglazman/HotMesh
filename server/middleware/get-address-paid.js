const exec = require('child_process').exec;

const getAddressPaid = () => {

  var getIsPaid = exec("$(pwd)'/src/wallet' 2", function(err, data) {  
    var isPaid = data.toString();    
    return isPaid;                   
    //console.log("isPaid:", isPaid);
  })

  return async ctx => {
    ctx.status = 200;
    ctx.body = {
      paid: getIsPaid(),
    };
  };
};

module.exports = getAddressPaid;
