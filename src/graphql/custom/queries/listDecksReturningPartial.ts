/* tslint:disable */
/* eslint-disable */

export const listDecksReturningPartial = /* GraphQL */ `
  query ListDecksReturningPartial(
    $filter: ModelDeckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDecksReturningPartial: listDecks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerId
        name
        description
        tags
        popularity
      }
      nextToken
    }
  }
`;
