export const createDeckReturningPartial = /* GraphQL */ `
  mutation CreateDeckReturningPartial(
    $input: CreateDeckInput!
    $condition: ModelDeckConditionInput
  ) {
    createDeckReturningPartial: createDeck(input: $input, condition: $condition) {
      id
      ownerId
      name
      description
      tags
      popularity
    }
  }
`;
