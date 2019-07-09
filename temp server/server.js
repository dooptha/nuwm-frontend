const express = require('express');
const http = require('http');
const NuwmApi = require('./api');

var app = express();

app.get('/', function(req, res) {

  let link = encodeURI(NuwmApi.generateLink(req.query));

  console.log(link)

  http.get(link, (apiRes) => {

    var bodyChunks = '';

    apiRes.on('data', (chunk) => {
      bodyChunks += chunk;
    }).on('end', () => {

      bodyChunks = JSON.parse(bodyChunks);

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ body: bodyChunks }));
    })
  });
});


app.listen(3000, function() {

  console.log('Server is running on PORT:', 3000);
});
