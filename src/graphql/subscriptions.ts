/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard($ownerId: String!) {
    onCreateCard(ownerId: $ownerId) {
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
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard($ownerId: String!) {
    onUpdateCard(ownerId: $ownerId) {
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
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard($ownerId: String!) {
    onDeleteCard(ownerId: $ownerId) {
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
export const onCreateDeck = /* GraphQL */ `
  subscription OnCreateDeck($ownerId: String!) {
    onCreateDeck(ownerId: $ownerId) {
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
        }
        nextToken
      }
    }
  }
`;
export const onUpdateDeck = /* GraphQL */ `
  subscription OnUpdateDeck($ownerId: String!) {
    onUpdateDeck(ownerId: $ownerId) {
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
        }
        nextToken
      }
    }
  }
`;
export const onDeleteDeck = /* GraphQL */ `
  subscription OnDeleteDeck($ownerId: String!) {
    onDeleteDeck(ownerId: $ownerId) {
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
        }
        nextToken
      }
    }
  }
`;
