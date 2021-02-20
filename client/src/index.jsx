import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.handleSearchResults = this.handleSearchResults.bind(this);
    this.handleGetTopReposResults = this.handleGetTopReposResults.bind(this);
  }

  handleSearchResults(returnedRepos) {
    this.setState({repos: returnedRepos});
    // console.log(returnedRepos);
  }

  search(username, callback) {
    username = JSON.stringify(username)
    $.ajax({
      type: "POST",
      url: '/repos',
      data: username,
      contentType: "application/json; charset=utf-8",
      success: callback,
      // error: (err) => {
      //   console.error(err);
      // }
    });
  }

  getTopRepos(callback) {
    $.ajax({
      type: "GET",
      url: '/repos',
      success: callback
    })
  }

  handleGetTopReposResults(topRepos) {
    this.setState({repos: topRepos});
  }

  componentDidMount() {
    this.getTopRepos(this.handleGetTopReposResults);
  }

  render () {
    return (<div>
      <h1 onClick={e => this.getTopRepos(this.handleGetTopReposResults)}>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search handleSearchResults={this.handleSearchResults} onSearch={this.search.bind(this)}/>
    </div>)
  }
}


ReactDOM.render(<App />, document.getElementById('app'));