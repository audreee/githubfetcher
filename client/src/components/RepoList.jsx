import React from 'react';
import RepoListEntry from './RepoListEntry.jsx'

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div id="repo-list">
      <table>
        <thead>
          <tr>
            <th scope="col">Owner</th>
            <th scope="col">Name</th>
            <th scope="col">Link</th>
            <th scope="col">Forks</th>
          </tr>
        </thead>
        <tbody>
          {props.repos.map(repo => {
           return <RepoListEntry repo={repo} key={repo._id} />
          })}
        </tbody>
      </table>
    </div>
  </div>
)

export default RepoList;
