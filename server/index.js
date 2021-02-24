const express = require('express');
const getReposByUsername = require('../helpers/github.js').getReposByUsername;
const save = require('../database/index.js').save;
const Repo = require('../database/index.js').Repo;

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(express.json());

app.post('/repos', (req, res) => {
  let username = req.body.username;

  getReposByUsername(username, (err, data) => {
    if (err) {
      console.error(err);
      res.send(400);
    } else {
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
  Repo.find().sort( { forks_count: -1, name: 1 } ).limit(25).exec((err, results) => {
    if (err) {
      console.error(err);
      res.status(400)
    } else {
      res.status(200).send(results);
    }
  });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
