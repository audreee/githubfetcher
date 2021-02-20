const axios = require('axios');
const config = require('../config.js');
const save = require('../database/index.js').save;

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  let options = {
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios(options)
  .then(function(response) {
    save(response.data);
    callback(response.data);
  })
  .catch(function(error) {
    console.error(error);
  })

}

// getReposByUsername('octocat', console.log)

module.exports.getReposByUsername = getReposByUsername;