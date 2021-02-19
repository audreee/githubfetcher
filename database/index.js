const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


let repoSchema = mongoose.Schema({
  repo_id: Number,
  owner_id: Number
  name: String,
  url: String,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  repoData.forEach(repo => {
    newRepo = new Repo({
      repo_id: repo.id,
      owner_id: repo.owner.id,
      name: repo.name,
      url: repo.url,
      forks_count: repo.forks_count
    })
    newRepo.save(function(err, newRepo) {
      if (err) return console.error(err);
      console.log(newRepo);
    })
  })

}

module.exports.save = save;