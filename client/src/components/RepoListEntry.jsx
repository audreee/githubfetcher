import React from 'react';

let RepoListEntry = ({repo}) => {
  return (
  <tr>
    <td>{repo.owner_name}</td>
    <td>{repo.name}</td>
    <td>{repo.url}</td>
    <td>{repo.forks_count}</td>
  </tr>
  )
}


export default RepoListEntry;