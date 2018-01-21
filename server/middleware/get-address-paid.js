const exec = require('child_process').exec;

const getAddressPaid = () => {
  var isPaid

  var getIsPaid = () => {exec("$(pwd)'/src/wallet' 2", function(err, data) 
  {  
    isPaid = data.toString();         
    return isPaid;
  })
  };

  return async ctx => {
    const paid = await getIsPaid();
    ctx.status = 200;
    ctx.body = {
      paid,
    };
  };
  
};

module.exports = getAddressPaid;
