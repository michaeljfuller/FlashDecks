/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDeck = /* GraphQL */ `
  subscription OnCreateDeck {
    onCreateDeck {
      id
      ownerId
      owner {
        id
        userName
        displayName
      }
      createdAt
      updatedAt
      title
      description
      tags
      cards {
        title
        sides {
          content {
            type
            value
            size
          }
        }
      }
    }
  }
`;
export const onUpdateDeck = /* GraphQL */ `
  subscription OnUpdateDeck {
    onUpdateDeck {
      id
      ownerId
      owner {
        id
        userName
        displayName
      }
      createdAt
      updatedAt
      title
      description
      tags
      cards {
        title
        sides {
          content {
            type
            value
            size
          }
        }
      }
    }
  }
`;
export const onDeleteDeck = /* GraphQL */ `
  subscription OnDeleteDeck {
    onDeleteDeck {
      id
      ownerId
      owner {
        id
        userName
        displayName
      }
      createdAt
      updatedAt
      title
      description
      tags
      cards {
        title
        sides {
          content {
            type
            value
            size
          }
        }
      }
    }
  }
`;
