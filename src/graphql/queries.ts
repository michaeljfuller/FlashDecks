/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID) {
    getUser(id: $id) {
      id
      userName
      displayName
    }
  }
`;
export const getDeck = /* GraphQL */ `
  query GetDeck($id: ID!) {
    getDeck(id: $id) {
      id
      ownerId
      owner {
        id
        userName
        displayName
      }
      createdAt
      updatedAt
      title
      description
      tags
      cards {
        title
        sides {
          content {
            type
            value
            size
          }
        }
      }
    }
  }
`;
export const listDecks = /* GraphQL */ `
  query ListDecks(
    $filter: ModelDeckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDecks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerId
        owner {
          id
          userName
          displayName
        }
        createdAt
        updatedAt
        title
        description
        tags
        cards {
          title
        }
      }
      nextToken
    }
  }
`;
export const getDecksByOwner = /* GraphQL */ `
  query GetDecksByOwner(
    $ownerId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDeckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getDecksByOwner(
      ownerId: $ownerId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ownerId
        owner {
          id
          userName
          displayName
        }
        createdAt
        updatedAt
        title
        description
        tags
        cards {
          title
        }
      }
      nextToken
    }
  }
`;
