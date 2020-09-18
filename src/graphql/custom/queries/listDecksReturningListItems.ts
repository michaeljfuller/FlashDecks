/* tslint:disable */
/* eslint-disable */

export const listDecksReturningListItems = /* GraphQL */ `
  query ListDecksReturningListItems(
    $filter: ModelDeckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDecksReturningListItems: listDecks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerId
        owner {
          id
          displayName
        }
        name
        description
        tags
        popularity
      }
      nextToken
    }
  }
`;
