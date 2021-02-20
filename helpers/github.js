const axios = require('axios');
const config = require('../config.js');

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
    // note that when you call save function in this block, it works and writes to db
    // right now you pass the data into callback, but inside the cb (in getReposByUsername), the data is undefined
    // console.log('response data inside axios .then ', response.data)
    callback(null, response.data)
  })
  .catch(function(error) {
    console.error(error);
  })

}

// getReposByUsername('octocat', console.log)

module.exports.getReposByUsername = getReposByUsername;