const express = require('express');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const save = require('../database/index.js').save;

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(express.json());

app.post('/repos', (req, res) => {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  let username = req.body.username;

  getReposByUsername(username, (err, data) => {
    console.log('data inside getRepos ', data);
    if (err) {
      console.log('error at getReposByUsername');
      res.send(400);
    } else {
      // console.log(data);
      save(data);
      res.status(201).send(data);
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

