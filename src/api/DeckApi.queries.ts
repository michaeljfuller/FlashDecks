import {getDeck, listDecks, getDecksByOwner} from "../graphql/queries";
import {createDeck, updateDeck, deleteDeck} from "../graphql/mutations";
import {
    CreateDeckInput, CreateDeckMutation, CreateDeckMutationVariables,
    UpdateDeckInput, UpdateDeckMutation, UpdateDeckMutationVariables,
    GetDeckQuery, GetDeckQueryVariables,
    GetDecksByOwnerQuery, GetDecksByOwnerQueryVariables,
    ListDecksQuery, ListDecksQueryVariables,
    DeleteDeckInput, DeleteDeckMutation, DeleteDeckMutationVariables,
} from "../API";

export {
    getDeck, listDecks, getDecksByOwner,
    createDeck, updateDeck, deleteDeck,
}
export * from "../API";

// Type of query strings
export type GetDeckQueryString = typeof getDeck;
export type ListDecksQueryString = typeof listDecks;
export type GetDecksByOwnerQueryString = typeof getDecksByOwner;
export type CreateDeckMutationString = typeof createDeck;
export type UpdateDeckMutationString = typeof updateDeck;
export type DeleteDeckMutationString = typeof deleteDeck;

type AnyQueryOrMutationString = (
    GetDeckQueryString |
    ListDecksQueryString |
    GetDecksByOwnerQueryString |
    CreateDeckMutationString |
    UpdateDeckMutationString |
    DeleteDeckMutationString
);

// Generic that gets Variables from the passed type.
export type VariablesFromQueryString<T extends AnyQueryOrMutationString> =
    T extends GetDeckQueryString         ? GetDeckQueryVariables :
    T extends ListDecksQueryString       ? ListDecksQueryVariables|undefined :
    T extends GetDecksByOwnerQueryString ? GetDecksByOwnerQueryVariables :
    T extends CreateDeckMutationString   ? CreateDeckMutationVariables :
    T extends UpdateDeckMutationString   ? UpdateDeckMutationVariables :
    T extends DeleteDeckMutationString   ? DeleteDeckMutationVariables :
    never;

// Generic that gets Query payload the passed type.
export type QueryFromQueryString<T extends AnyQueryOrMutationString> =
    T extends CreateDeckMutationString   ? CreateDeckMutation :
    T extends UpdateDeckMutationString   ? UpdateDeckMutation :
    T extends GetDeckQueryString         ? GetDeckQuery :
    T extends GetDecksByOwnerQueryString ? GetDecksByOwnerQuery :
    T extends ListDecksQueryString       ? ListDecksQuery :
    T extends DeleteDeckMutationString   ? DeleteDeckMutation :
    never;
