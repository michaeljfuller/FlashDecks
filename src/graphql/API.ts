/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateDeckInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  tags?: Array< string > | null,
  cards?: Array< CardInput > | null,
};

export type CardInput = {
  title: string,
  sides?: Array< CardSideInput > | null,
};

export type CardSideInput = {
  content?: Array< CardSideContentInput > | null,
};

export type CardSideContentInput = {
  type: CardSideContentType,
  value: string,
  file?: S3ObjectInput | null,
};

export enum CardSideContentType {
  Text = "Text",
  Image = "Image",
  Video = "Video",
  Link = "Link",
}


export type S3ObjectInput = {
  bucket: string,
  region: string,
  key: string,
};

export type ModelDeckConditionInput = {
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  and?: Array< ModelDeckConditionInput | null > | null,
  or?: Array< ModelDeckConditionInput | null > | null,
  not?: ModelDeckConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateDeckInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  tags?: Array< string > | null,
  cards?: Array< CardInput > | null,
};

export type DeleteDeckInput = {
  id?: string | null,
};

export type ModelDeckFilterInput = {
  id?: ModelIDInput | null,
  ownerId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  and?: Array< ModelDeckFilterInput | null > | null,
  or?: Array< ModelDeckFilterInput | null > | null,
  not?: ModelDeckFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateDeckMutationVariables = {
  input: CreateDeckInput,
  condition?: ModelDeckConditionInput | null,
};

export type CreateDeckMutation = {
  createDeck:  {
    __typename: "Deck",
    id: string,
    ownerId: string,
    owner:  {
      __typename: "User",
      id: string,
      userName: string,
      displayName: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string | null,
    tags: Array< string > | null,
    cards:  Array< {
      __typename: "Card",
      title: string,
      sides:  Array< {
        __typename: "CardSide",
        content:  Array< {
          __typename: "CardSideContent",
          type: CardSideContentType,
          value: string,
        } > | null,
      } > | null,
    } > | null,
  } | null,
};

export type UpdateDeckMutationVariables = {
  input: UpdateDeckInput,
  condition?: ModelDeckConditionInput | null,
};

export type UpdateDeckMutation = {
  updateDeck:  {
    __typename: "Deck",
    id: string,
    ownerId: string,
    owner:  {
      __typename: "User",
      id: string,
      userName: string,
      displayName: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string | null,
    tags: Array< string > | null,
    cards:  Array< {
      __typename: "Card",
      title: string,
      sides:  Array< {
        __typename: "CardSide",
        content:  Array< {
          __typename: "CardSideContent",
          type: CardSideContentType,
          value: string,
        } > | null,
      } > | null,
    } > | null,
  } | null,
};

export type DeleteDeckMutationVariables = {
  input: DeleteDeckInput,
  condition?: ModelDeckConditionInput | null,
};

export type DeleteDeckMutation = {
  deleteDeck:  {
    __typename: "Deck",
    id: string,
    ownerId: string,
    owner:  {
      __typename: "User",
      id: string,
      userName: string,
      displayName: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string | null,
    tags: Array< string > | null,
    cards:  Array< {
      __typename: "Card",
      title: string,
      sides:  Array< {
        __typename: "CardSide",
        content:  Array< {
          __typename: "CardSideContent",
          type: CardSideContentType,
          value: string,
        } > | null,
      } > | null,
    } > | null,
  } | null,
};

export type GetUserQueryVariables = {
  id?: string | null,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    userName: string,
    displayName: string,
  } | null,
};

export type GetDeckQueryVariables = {
  id: string,
};

export type GetDeckQuery = {
  getDeck:  {
    __typename: "Deck",
    id: string,
    ownerId: string,
    owner:  {
      __typename: "User",
      id: string,
      userName: string,
      displayName: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string | null,
    tags: Array< string > | null,
    cards:  Array< {
      __typename: "Card",
      title: string,
      sides:  Array< {
        __typename: "CardSide",
        content:  Array< {
          __typename: "CardSideContent",
          type: CardSideContentType,
          value: string,
        } > | null,
      } > | null,
    } > | null,
  } | null,
};

export type ListDecksQueryVariables = {
  filter?: ModelDeckFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDecksQuery = {
  listDecks:  {
    __typename: "ModelDeckConnection",
    items:  Array< {
      __typename: "Deck",
      id: string,
      ownerId: string,
      owner:  {
        __typename: "User",
        id: string,
        userName: string,
        displayName: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      title: string,
      description: string | null,
      tags: Array< string > | null,
      cards:  Array< {
        __typename: "Card",
        title: string,
      } > | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetDecksByOwnerQueryVariables = {
  ownerId?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDeckFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GetDecksByOwnerQuery = {
  getDecksByOwner:  {
    __typename: "ModelDeckConnection",
    items:  Array< {
      __typename: "Deck",
      id: string,
      ownerId: string,
      owner:  {
        __typename: "User",
        id: string,
        userName: string,
        displayName: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      title: string,
      description: string | null,
      tags: Array< string > | null,
      cards:  Array< {
        __typename: "Card",
        title: string,
      } > | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateDeckSubscription = {
  onCreateDeck:  {
    __typename: "Deck",
    id: string,
    ownerId: string,
    owner:  {
      __typename: "User",
      id: string,
      userName: string,
      displayName: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string | null,
    tags: Array< string > | null,
    cards:  Array< {
      __typename: "Card",
      title: string,
      sides:  Array< {
        __typename: "CardSide",
        content:  Array< {
          __typename: "CardSideContent",
          type: CardSideContentType,
          value: string,
        } > | null,
      } > | null,
    } > | null,
  } | null,
};

export type OnUpdateDeckSubscription = {
  onUpdateDeck:  {
    __typename: "Deck",
    id: string,
    ownerId: string,
    owner:  {
      __typename: "User",
      id: string,
      userName: string,
      displayName: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string | null,
    tags: Array< string > | null,
    cards:  Array< {
      __typename: "Card",
      title: string,
      sides:  Array< {
        __typename: "CardSide",
        content:  Array< {
          __typename: "CardSideContent",
          type: CardSideContentType,
          value: string,
        } > | null,
      } > | null,
    } > | null,
  } | null,
};

export type OnDeleteDeckSubscription = {
  onDeleteDeck:  {
    __typename: "Deck",
    id: string,
    ownerId: string,
    owner:  {
      __typename: "User",
      id: string,
      userName: string,
      displayName: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    title: string,
    description: string | null,
    tags: Array< string > | null,
    cards:  Array< {
      __typename: "Card",
      title: string,
      sides:  Array< {
        __typename: "CardSide",
        content:  Array< {
          __typename: "CardSideContent",
          type: CardSideContentType,
          value: string,
        } > | null,
      } > | null,
    } > | null,
  } | null,
};
