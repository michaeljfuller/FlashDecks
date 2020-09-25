/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDeck = /* GraphQL */ `
  mutation CreateDeck(
    $input: CreateDeckInput!
    $condition: ModelDeckConditionInput
  ) {
    createDeck(input: $input, condition: $condition) {
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
export const updateDeck = /* GraphQL */ `
  mutation UpdateDeck(
    $input: UpdateDeckInput!
    $condition: ModelDeckConditionInput
  ) {
    updateDeck(input: $input, condition: $condition) {
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
export const deleteDeck = /* GraphQL */ `
  mutation DeleteDeck(
    $input: DeleteDeckInput!
    $condition: ModelDeckConditionInput
  ) {
    deleteDeck(input: $input, condition: $condition) {
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
