/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard($ownerId: String!) {
    onCreateCard(ownerId: $ownerId) {
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
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard($ownerId: String!) {
    onUpdateCard(ownerId: $ownerId) {
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
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard($ownerId: String!) {
    onDeleteCard(ownerId: $ownerId) {
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
export const onCreateDeck = /* GraphQL */ `
  subscription OnCreateDeck($ownerId: String!) {
    onCreateDeck(ownerId: $ownerId) {
      id
      name
      description
      tags
      popularity
    }
  }
`;
export const onUpdateDeck = /* GraphQL */ `
  subscription OnUpdateDeck($ownerId: String!) {
    onUpdateDeck(ownerId: $ownerId) {
      id
      name
      description
      tags
      popularity
    }
  }
`;
export const onDeleteDeck = /* GraphQL */ `
  subscription OnDeleteDeck($ownerId: String!) {
    onDeleteDeck(ownerId: $ownerId) {
      id
      name
      description
      tags
      popularity
    }
  }
`;
