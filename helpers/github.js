const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
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
    callback(null, response.data)
  })
  .catch(function(error) {
    console.error(error);
  })

}

module.exports.getReposByUsername = getReposByUsername;
