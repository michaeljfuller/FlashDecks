/* tslint:disable */
/* eslint-disable */

export const getDeckIncludingCards = /* GraphQL */ `
  query GetDeckIncludingCards($id: ID!) {
    getDeckIncludingCards: getDeck(id: $id) {
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
      cards {
        items {
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
        nextToken
      }
    }
  }
`;
