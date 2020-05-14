/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type UpdateUserInput = {
  id: string,
  displayName?: string | null,
};

export type ModelUserConditionInput = {
  displayName?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
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

export type CreateCardInput = {
  name: string,
};

export type ModelCardConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelCardConditionInput | null > | null,
  or?: Array< ModelCardConditionInput | null > | null,
  not?: ModelCardConditionInput | null,
};

export type UpdateCardInput = {
  name?: string | null,
};

export type DeleteCardInput = {
  id?: string | null,
};

export type ModelCardFilterInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelCardFilterInput | null > | null,
  or?: Array< ModelCardFilterInput | null > | null,
  not?: ModelCardFilterInput | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    displayName: string,
  } | null,
};

export type CreateCardMutationVariables = {
  input: CreateCardInput,
  condition?: ModelCardConditionInput | null,
};

export type CreateCardMutation = {
  createCard:  {
    __typename: "Card",
    name: string,
  } | null,
};

export type UpdateCardMutationVariables = {
  input: UpdateCardInput,
  condition?: ModelCardConditionInput | null,
};

export type UpdateCardMutation = {
  updateCard:  {
    __typename: "Card",
    name: string,
  } | null,
};

export type DeleteCardMutationVariables = {
  input: DeleteCardInput,
  condition?: ModelCardConditionInput | null,
};

export type DeleteCardMutation = {
  deleteCard:  {
    __typename: "Card",
    name: string,
  } | null,
};

export type GetUserQueryVariables = {
  id?: string | null,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    displayName: string,
  } | null,
};

export type GetCardQueryVariables = {
  id: string,
};

export type GetCardQuery = {
  getCard:  {
    __typename: "Card",
    name: string,
  } | null,
};

export type ListCardsQueryVariables = {
  filter?: ModelCardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCardsQuery = {
  listCards:  {
    __typename: "ModelCardConnection",
    items:  Array< {
      __typename: "Card",
      name: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateCardSubscription = {
  onCreateCard:  {
    __typename: "Card",
    name: string,
  } | null,
};

export type OnUpdateCardSubscriptionVariables = {
  ownerId: string,
};

export type OnUpdateCardSubscription = {
  onUpdateCard:  {
    __typename: "Card",
    name: string,
  } | null,
};

export type OnDeleteCardSubscriptionVariables = {
  ownerId: string,
};

export type OnDeleteCardSubscription = {
  onDeleteCard:  {
    __typename: "Card",
    name: string,
  } | null,
};
