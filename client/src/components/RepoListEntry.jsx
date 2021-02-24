import React from 'react';

let RepoListEntry = ({repo}) => {
  return (
  <tr>
    <td>{repo.owner_name}</td>
    <td><a href={repo.url}>{repo.name}</a></td>
    <td>{repo.forks_count}</td>
  </tr>
  )
}


export default RepoListEntry;
