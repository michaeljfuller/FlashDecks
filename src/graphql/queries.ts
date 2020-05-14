/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID) {
    getUser(id: $id) {
      id
      displayName
    }
  }
`;
export const getCard = /* GraphQL */ `
  query GetCard($id: ID!) {
    getCard(id: $id) {
      id
      name
      sides {
        content {
          type
          value
        }
      }
      tags
      popularity
    }
  }
`;
export const listCards = /* GraphQL */ `
  query ListCards(
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        tags
        popularity
      }
      nextToken
    }
  }
`;
export const getDeck = /* GraphQL */ `
  query GetDeck($id: ID!) {
    getDeck(id: $id) {
      id
      name
      description
      tags
      popularity
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
        name
        description
        tags
        popularity
      }
      nextToken
    }
  }
`;
export const searchCards = /* GraphQL */ `
  query SearchCards(
    $filter: SearchableCardFilterInput
    $sort: SearchableCardSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchCards(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        tags
        popularity
      }
      nextToken
      total
    }
  }
`;
export const searchDecks = /* GraphQL */ `
  query SearchDecks(
    $filter: SearchableDeckFilterInput
    $sort: SearchableDeckSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchDecks(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        tags
        popularity
      }
      nextToken
      total
    }
  }
`;
