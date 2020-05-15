/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCard = /* GraphQL */ `
  mutation CreateCard(
    $input: CreateCardInput!
    $condition: ModelCardConditionInput
  ) {
    createCard(input: $input, condition: $condition) {
      id
      ownerId
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
export const updateCard = /* GraphQL */ `
  mutation UpdateCard(
    $input: UpdateCardInput!
    $condition: ModelCardConditionInput
  ) {
    updateCard(input: $input, condition: $condition) {
      id
      ownerId
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
export const deleteCard = /* GraphQL */ `
  mutation DeleteCard(
    $input: DeleteCardInput!
    $condition: ModelCardConditionInput
  ) {
    deleteCard(input: $input, condition: $condition) {
      id
      ownerId
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
export const createDeck = /* GraphQL */ `
  mutation CreateDeck(
    $input: CreateDeckInput!
    $condition: ModelDeckConditionInput
  ) {
    createDeck(input: $input, condition: $condition) {
      id
      ownerId
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
export const updateDeck = /* GraphQL */ `
  mutation UpdateDeck(
    $input: UpdateDeckInput!
    $condition: ModelDeckConditionInput
  ) {
    updateDeck(input: $input, condition: $condition) {
      id
      ownerId
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
export const deleteDeck = /* GraphQL */ `
  mutation DeleteDeck(
    $input: DeleteDeckInput!
    $condition: ModelDeckConditionInput
  ) {
    deleteDeck(input: $input, condition: $condition) {
      id
      ownerId
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
