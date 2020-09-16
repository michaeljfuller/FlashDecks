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
      deck {
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
          nextToken
        }
      }
      deckID
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
        ownerId
        owner {
          id
          displayName
        }
        name
        tags
        popularity
        deck {
          id
          ownerId
          name
          description
          tags
          popularity
        }
        deckID
      }
      nextToken
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
        displayName
      }
      name
      description
      tags
      popularity
      cards {
        items {
          id
          ownerId
          name
          tags
          popularity
          deckID
          sides {
            content {
              type
              value
            }
          }
        }
        nextToken
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
          displayName
        }
        name
        description
        tags
        popularity
        cards {
          nextToken
        }
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
        ownerId
        owner {
          id
          displayName
        }
        name
        tags
        popularity
        deck {
          id
          ownerId
          name
          description
          tags
          popularity
        }
        deckID
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
          nextToken
        }
      }
      nextToken
      total
    }
  }
`;
