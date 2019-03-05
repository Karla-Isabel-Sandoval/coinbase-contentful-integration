const Client = require('coinbase').Client;
const express = require('express');

const coinbaseClient = new Client({'apiKey': 'rSPd8ob9NO8IT5vK', 'apiSecret': 'dPqGqtjOi0Nggr5XT8ZuhZmBr8bgRBfs'});
const app = express();

// GET "/"
app.get('/', function (req, resp) {
    coinbaseClient.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, obj) {
      const info = { amount: obj.data.amount };
      resp.send(JSON.stringify(info));
  });
});

// GET /about
// "Made by Karla"
app.get('/about', function (req, res) {
    res.send('Made by Karla');
});

app.listen(3000);


