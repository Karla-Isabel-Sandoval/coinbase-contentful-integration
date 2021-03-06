const Client = require('coinbase').Client;
const express = require('express');
const contentful = require('contentful');
const path = require('path');
const cors = require('cors');

var whitelist = ['http://localhost:3001', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;


const coinbaseClient = new Client({'apiKey': process.env.COINBASE_API_KEY, 'apiSecret': process.env.COINBASE_API_SECRET});
const app = express();
app.use(cors(corsOptions));

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
});

  //GET "/"
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

  // GET "/price"
app.get('/price', function (req, resp) {
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

// GET /content
app.get('/content',function(req, res) {
  const entries =  client.getEntries({
    // id of the `Post` content type
    content_type: "2wKn6yEnZewu2SCCkus4as"
  });
  entries.then( function(response) {
    // before

    let posts = [];

    for (element of response.items) {
      const post = { 
        title: element.fields.title,
        body: element.fields.body
      };

      posts.push(post);
    }
    const postsJSON = JSON.stringify(posts);
    // after
    res.send(postsJSON);

  })
  .catch((error) => {
    res.send(error);
  });
});

app.listen(3000);


