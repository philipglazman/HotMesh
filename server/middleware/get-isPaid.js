const exec = require('child_process').exec;

const getIsPaid = () => {
  //get wallet address
  exec("$(pwd)'/src/wallet' 2", function(err, data) {  
    var isPaid = data.toString();                       
    console.log("isPaid:", address);
  })
};

module.exports = getIsPaid;
