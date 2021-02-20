const express = require('express');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const save = require('../database/index.js').save;
const Repo = require('../database/index.js').Repo;

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
    // console.log('data inside getRepos ', data);
    if (err) {
      console.log('error at getReposByUsername');
      res.send(400);
    } else {
      // console.log(data);
      save(data, (err, savedData) => {
        if (err) {
          console.error(err);
        } else {
          res.status(201).send(savedData)
        }
      });
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  // query db and sort in descending order by forks_count (and alphabetically for ties), limits to top 25
  Repo.find().sort( { forks_count: -1, name: 1 } ).limit(25).exec((err, results) => {
    if (err) {
      console.error(err);
      res.status(400)
    } else {
      // console.log('get query results ', results);
      res.status(200).send(results);
    }
  });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

