import PubSub from '@aws-amplify/pubsub';

export interface ApiList<ListElement> {
    nextToken?: string|null;
    items?: ListElement[];
}

export type GraphQueryResponse<Data=any> = Promise<{
    data?: Data;
}>;
export type GraphMutationResponse<Data=any> = Promise<{
    data?: Data;
}>;

type GraphObservable = ReturnType<typeof PubSub.subscribe>;
export type GraphSubscriptionResponse = GraphObservable;
