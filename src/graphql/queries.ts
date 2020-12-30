/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncProblems = /* GraphQL */ `
  query SyncProblems(
    $filter: ModelProblemFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProblems(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        url
        replUrl
        notes
        difficulty
        duration
        timestamp
        algorithms
        dataStructures
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getProblem = /* GraphQL */ `
  query GetProblem($id: ID!) {
    getProblem(id: $id) {
      id
      title
      url
      replUrl
      notes
      difficulty
      duration
      timestamp
      algorithms
      dataStructures
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listProblems = /* GraphQL */ `
  query ListProblems(
    $filter: ModelProblemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProblems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        url
        replUrl
        notes
        difficulty
        duration
        timestamp
        algorithms
        dataStructures
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
