const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/fetcher', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Database is connected`);
  }
});

let repoSchema = mongoose.Schema({
  _id: Number,
  owner_id: Number,
  owner_name: String,
  name: String,
  url: String,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData, callback) => {
  mongoose.Promise.all(repoData.map(repo => {
    newRepo = new Repo({
      _id: repo.id,
      owner_id: repo.owner.id,
      owner_name: repo.owner.login,
      name: repo.name,
      url: repo.html_url,
      forks_count: repo.forks_count
    })
    newRepo.save();
    return newRepo;
    })
  )
  .then((responses) => callback(null, responses))
  .catch((err) => {console.error(err)})

}

module.exports.save = save;
module.exports.Repo = Repo;
