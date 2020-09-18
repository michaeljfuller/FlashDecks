/* tslint:disable */
/* eslint-disable */

export const getCardExcludingDeck = /* GraphQL */ `
  query GetCardExcludingDeck($id: ID!) {
    getCardExcludingDeck: getCard(id: $id) {
      id
      ownerId
      owner {
        id
        displayName
      }
      name
      sides {
        content {
          type
          value
        }
      }
      tags
      popularity
      deckID
    }
  }
`;
