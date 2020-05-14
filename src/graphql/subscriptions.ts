/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCard = /* GraphQL */ `
  subscription OnCreateCard {
    onCreateCard {
      name
    }
  }
`;
export const onUpdateCard = /* GraphQL */ `
  subscription OnUpdateCard($ownerId: String!) {
    onUpdateCard(ownerId: $ownerId) {
      name
    }
  }
`;
export const onDeleteCard = /* GraphQL */ `
  subscription OnDeleteCard($ownerId: String!) {
    onDeleteCard(ownerId: $ownerId) {
      name
    }
  }
`;
