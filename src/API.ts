/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCardInput = {
  name: string,
  sides?: Array< CardSideInput > | null,
  tags?: Array< string > | null,
  deckID: string,
};

export type CardSideInput = {
  content?: Array< CardSideContentInput > | null,
};

export type CardSideContentInput = {
  type: string,
  value: string,
};

export type ModelCardConditionInput = {
  name?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  popularity?: ModelIntInput | null,
  deckID?: ModelIDInput | null,
  and?: Array< ModelCardConditionInput | null > | null,
  or?: Array< ModelCardConditionInput | null > | null,
  not?: ModelCardConditionInput | null,
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

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
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

export type UpdateCardInput = {
  id: string,
  name?: string | null,
  sides?: Array< CardSideInput > | null,
  tags?: Array< string > | null,
  deckID?: string | null,
};

export type DeleteCardInput = {
  id?: string | null,
};

export type CreateDeckInput = {
  name: string,
  description: string,
  tags?: Array< string > | null,
};

export type ModelDeckConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  popularity?: ModelIntInput | null,
  and?: Array< ModelDeckConditionInput | null > | null,
  or?: Array< ModelDeckConditionInput | null > | null,
  not?: ModelDeckConditionInput | null,
};

export type UpdateDeckInput = {
  id?: string | null,
  name: string,
  description: string,
  tags?: Array< string > | null,
};

export type DeleteDeckInput = {
  id?: string | null,
};

export type ModelCardFilterInput = {
  id?: ModelIDInput | null,
  ownerId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  popularity?: ModelIntInput | null,
  deckID?: ModelIDInput | null,
  and?: Array< ModelCardFilterInput | null > | null,
  or?: Array< ModelCardFilterInput | null > | null,
  not?: ModelCardFilterInput | null,
};

export type ModelDeckFilterInput = {
  id?: ModelIDInput | null,
  ownerId?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  popularity?: ModelIntInput | null,
  and?: Array< ModelDeckFilterInput | null > | null,
  or?: Array< ModelDeckFilterInput | null > | null,
  not?: ModelDeckFilterInput | null,
};

export type SearchableCardFilterInput = {
  id?: SearchableIDFilterInput | null,
  ownerId?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  tags?: SearchableStringFilterInput | null,
  popularity?: SearchableIntFilterInput | null,
  deckID?: SearchableIDFilterInput | null,
  and?: Array< SearchableCardFilterInput | null > | null,
  or?: Array< SearchableCardFilterInput | null > | null,
  not?: SearchableCardFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
};

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableCardSortInput = {
  field?: SearchableCardSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableCardSortableFields {
  id = "id",
  ownerId = "ownerId",
  name = "name",
  tags = "tags",
  popularity = "popularity",
  deckID = "deckID",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableDeckFilterInput = {
  id?: SearchableIDFilterInput | null,
  ownerId?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  description?: SearchableStringFilterInput | null,
  tags?: SearchableStringFilterInput | null,
  popularity?: SearchableIntFilterInput | null,
  and?: Array< SearchableDeckFilterInput | null > | null,
  or?: Array< SearchableDeckFilterInput | null > | null,
  not?: SearchableDeckFilterInput | null,
};

export type SearchableDeckSortInput = {
  field?: SearchableDeckSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableDeckSortableFields {
  id = "id",
  ownerId = "ownerId",
  name = "name",
  description = "description",
  tags = "tags",
  popularity = "popularity",
}


export type CreateCardMutationVariables = {
  input: CreateCardInput,
  condition?: ModelCardConditionInput | null,
};

export type CreateCardMutation = {
  createCard:  {
    __typename: "Card",
    id: string,
    ownerId: string,
    name: string,
    sides:  Array< {
      __typename: "CardSide",
      content:  Array< {
        __typename: "CardSideContent",
        type: string,
        value: string,
      } > | null,
    } > | null,
    tags: Array< string > | null,
    popularity: number,
    deck:  {
      __typename: "Deck",
      id: string,
      ownerId: string,
      name: string,
      description: string,
      tags: Array< string > | null,
      popularity: number,
      cards:  {
        __typename: "ModelCardConnection",
        nextToken: string | null,
      } | null,
    },
    deckID: string,
  } | null,
};

export type UpdateCardMutationVariables = {
  input: UpdateCardInput,
  condition?: ModelCardConditionInput | null,
};

export type UpdateCardMutation = {
  updateCard:  {
    __typename: "Card",
    id: string,
    ownerId: string,
    name: string,
    sides:  Array< {
      __typename: "CardSide",
      content:  Array< {
        __typename: "CardSideContent",
        type: string,
        value: string,
      } > | null,
    } > | null,
    tags: Array< string > | null,
    popularity: number,
    deck:  {
      __typename: "Deck",
      id: string,
      ownerId: string,
      name: string,
      description: string,
      tags: Array< string > | null,
      popularity: number,
      cards:  {
        __typename: "ModelCardConnection",
        nextToken: string | null,
      } | null,
    },
    deckID: string,
  } | null,
};

export type DeleteCardMutationVariables = {
  input: DeleteCardInput,
  condition?: ModelCardConditionInput | null,
};

export type DeleteCardMutation = {
  deleteCard:  {
    __typename: "Card",
    id: string,
    ownerId: string,
    name: string,
    sides:  Array< {
      __typename: "CardSide",
      content:  Array< {
        __typename: "CardSideContent",
        type: string,
        value: string,
      } > | null,
    } > | null,
    tags: Array< string > | null,
    popularity: number,
    deck:  {
      __typename: "Deck",
      id: string,
      ownerId: string,
      name: string,
      description: string,
      tags: Array< string > | null,
      popularity: number,
      cards:  {
        __typename: "ModelCardConnection",
        nextToken: string | null,
      } | null,
    },
    deckID: string,
  } | null,
};

export type CreateDeckMutationVariables = {
  input: CreateDeckInput,
  condition?: ModelDeckConditionInput | null,
};

export type CreateDeckMutation = {
  createDeck:  {
    __typename: "Deck",
    id: string,
    ownerId: string,
    name: string,
    description: string,
    tags: Array< string > | null,
    popularity: number,
    cards:  {
      __typename: "ModelCardConnection",
      items:  Array< {
        __typename: "Card",
        id: string,
        ownerId: string,
        name: string,
        tags: Array< string > | null,
        popularity: number,
        deckID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    name: string,
    description: string,
    tags: Array< string > | null,
    popularity: number,
    cards:  {
      __typename: "ModelCardConnection",
      items:  Array< {
        __typename: "Card",
        id: string,
        ownerId: string,
        name: string,
        tags: Array< string > | null,
        popularity: number,
        deckID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    name: string,
    description: string,
    tags: Array< string > | null,
    popularity: number,
    cards:  {
      __typename: "ModelCardConnection",
      items:  Array< {
        __typename: "Card",
        id: string,
        ownerId: string,
        name: string,
        tags: Array< string > | null,
        popularity: number,
        deckID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
    id: string,
    ownerId: string,
    name: string,
    sides:  Array< {
      __typename: "CardSide",
      content:  Array< {
        __typename: "CardSideContent",
        type: string,
        value: string,
      } > | null,
    } > | null,
    tags: Array< string > | null,
    popularity: number,
    deck:  {
      __typename: "Deck",
      id: string,
      ownerId: string,
      name: string,
      description: string,
      tags: Array< string > | null,
      popularity: number,
      cards:  {
        __typename: "ModelCardConnection",
        nextToken: string | null,
      } | null,
    },
    deckID: string,
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
      id: string,
      ownerId: string,
      name: string,
      tags: Array< string > | null,
      popularity: number,
      deck:  {
        __typename: "Deck",
        id: string,
        ownerId: string,
        name: string,
        description: string,
        tags: Array< string > | null,
        popularity: number,
      },
      deckID: string,
    } | null > | null,
    nextToken: string | null,
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
    name: string,
    description: string,
    tags: Array< string > | null,
    popularity: number,
    cards:  {
      __typename: "ModelCardConnection",
      items:  Array< {
        __typename: "Card",
        id: string,
        ownerId: string,
        name: string,
        tags: Array< string > | null,
        popularity: number,
        deckID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
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
      name: string,
      description: string,
      tags: Array< string > | null,
      popularity: number,
      cards:  {
        __typename: "ModelCardConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type SearchCardsQueryVariables = {
  filter?: SearchableCardFilterInput | null,
  sort?: SearchableCardSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SearchCardsQuery = {
  searchCards:  {
    __typename: "SearchableCardConnection",
    items:  Array< {
      __typename: "Card",
      id: string,
      ownerId: string,
      name: string,
      tags: Array< string > | null,
      popularity: number,
      deck:  {
        __typename: "Deck",
        id: string,
        ownerId: string,
        name: string,
        description: string,
        tags: Array< string > | null,
        popularity: number,
      },
      deckID: string,
    } | null > | null,
    nextToken: string | null,
    total: number | null,
  } | null,
};

export type SearchDecksQueryVariables = {
  filter?: SearchableDeckFilterInput | null,
  sort?: SearchableDeckSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SearchDecksQuery = {
  searchDecks:  {
    __typename: "SearchableDeckConnection",
    items:  Array< {
      __typename: "Deck",
      id: string,
      ownerId: string,
      name: string,
      description: string,
      tags: Array< string > | null,
      popularity: number,
      cards:  {
        __typename: "ModelCardConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
    total: number | null,
  } | null,
};

export type OnCreateCardSubscriptionVariables = {
  ownerId: string,
};

export type OnCreateCardSubscription = {
  onCreateCard:  {
    __typename: "Card",
    id: string,
    ownerId: string,
    name: string,
    sides:  Array< {
      __typename: "CardSide",
      content:  Array< {
        __typename: "CardSideContent",
        type: string,
        value: string,
      } > | null,
    } > | null,
    tags: Array< string > | null,
    popularity: number,
    deck:  {
      __typename: "Deck",
      id: string,
      ownerId: string,
      name: string,
      description: string,
      tags: Array< string > | null,
      popularity: number,
      cards:  {
        __typename: "ModelCardConnection",
        nextToken: string | null,
      } | null,
    },
    deckID: string,
  } | null,
};

export type OnUpdateCardSubscriptionVariables = {
  ownerId: string,
};

export type OnUpdateCardSubscription = {
  onUpdateCard:  {
    __typename: "Card",
    id: string,
    ownerId: string,
    name: string,
    sides:  Array< {
      __typename: "CardSide",
      content:  Array< {
        __typename: "CardSideContent",
        type: string,
        value: string,
      } > | null,
    } > | null,
    tags: Array< string > | null,
    popularity: number,
    deck:  {
      __typename: "Deck",
      id: string,
      ownerId: string,
      name: string,
      description: string,
      tags: Array< string > | null,
      popularity: number,
      cards:  {
        __typename: "ModelCardConnection",
        nextToken: string | null,
      } | null,
    },
    deckID: string,
  } | null,
};

export type OnDeleteCardSubscriptionVariables = {
  ownerId: string,
};

export type OnDeleteCardSubscription = {
  onDeleteCard:  {
    __typename: "Card",
    id: string,
    ownerId: string,
    name: string,
    sides:  Array< {
      __typename: "CardSide",
      content:  Array< {
        __typename: "CardSideContent",
        type: string,
        value: string,
      } > | null,
    } > | null,
    tags: Array< string > | null,
    popularity: number,
    deck:  {
      __typename: "Deck",
      id: string,
      ownerId: string,
      name: string,
      description: string,
      tags: Array< string > | null,
      popularity: number,
      cards:  {
        __typename: "ModelCardConnection",
        nextToken: string | null,
      } | null,
    },
    deckID: string,
  } | null,
};

export type OnCreateDeckSubscriptionVariables = {
  ownerId: string,
};

export type OnCreateDeckSubscription = {
  onCreateDeck:  {
    __typename: "Deck",
    id: string,
    ownerId: string,
    name: string,
    description: string,
    tags: Array< string > | null,
    popularity: number,
    cards:  {
      __typename: "ModelCardConnection",
      items:  Array< {
        __typename: "Card",
        id: string,
        ownerId: string,
        name: string,
        tags: Array< string > | null,
        popularity: number,
        deckID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateDeckSubscriptionVariables = {
  ownerId: string,
};

export type OnUpdateDeckSubscription = {
  onUpdateDeck:  {
    __typename: "Deck",
    id: string,
    ownerId: string,
    name: string,
    description: string,
    tags: Array< string > | null,
    popularity: number,
    cards:  {
      __typename: "ModelCardConnection",
      items:  Array< {
        __typename: "Card",
        id: string,
        ownerId: string,
        name: string,
        tags: Array< string > | null,
        popularity: number,
        deckID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteDeckSubscriptionVariables = {
  ownerId: string,
};

export type OnDeleteDeckSubscription = {
  onDeleteDeck:  {
    __typename: "Deck",
    id: string,
    ownerId: string,
    name: string,
    description: string,
    tags: Array< string > | null,
    popularity: number,
    cards:  {
      __typename: "ModelCardConnection",
      items:  Array< {
        __typename: "Card",
        id: string,
        ownerId: string,
        name: string,
        tags: Array< string > | null,
        popularity: number,
        deckID: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};
