const exec = require('child-process-promise').exec;
const fetch = require("node-fetch");

const getPrice = () => {

  return async ctx => {
    var address = await exec("$(pwd)'/src/wallet' 1").then ((address) => {

      console.log(address.stdout);

      address = address.stdout.toString();
      address = address.substring(0,address.length - 1)

      return address;
    });

    const btcValue = fetch("https://api.coinbase.com/v2/prices/spot?currency=USD")
      .then(response => response.json().then(json => {
        return json.data.amount
      }))

    const btcPrice = 1 / btcValue;

    ctx.status = 200;
    ctx.body = {
      address,
      btcPrice,
      usdPrice: 1,
    };
  };
}


module.exports = getPrice;
