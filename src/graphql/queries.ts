/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDeck = /* GraphQL */ `
  query GetDeck($id: ID!) {
    getDeck(id: $id) {
      id
      ownerId
      title
      description
      tags
      cards {
        title
      }
      createdAt
      updatedAt
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
        title
        description
        tags
        cards {
          title
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
