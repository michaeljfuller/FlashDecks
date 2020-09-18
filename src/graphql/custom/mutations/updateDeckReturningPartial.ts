export const updateDeckReturningPartial = /* GraphQL */ `
  mutation UpdateDeckReturningPartial(
    $input: UpdateDeckInput!
    $condition: ModelDeckConditionInput
  ) {
    updateDeckReturningPartial: updateDeck(input: $input, condition: $condition) {
      id
      ownerId
      name
      description
      tags
      popularity
    }
  }
`;
