declare interface CognitoUser {
    attributes: {
        email: string;
        email_verified: boolean;
        sub: string;
    };
    username: string;
}
declare interface User {
    id: string;
    displayName: string;
}
declare interface Deck {
    id: string;
    ownerId: string;
    owner: User;
    name: string;
    description: string;
    tags?: string[];
    cards?: Card[];
}
declare interface Card {
    id: string;
    ownerId: string;
    owner: User;
    name: string;
    sides: CardSide[];
}
declare interface CardSide {
    content: CardContent[];
}
declare interface CardContent {
    // A unique ID for the content.
    id: string;
    // The type of content.
    type: CardContentType;
    // The content's value.
    value: string;
    // Fraction of the CardSide height. Total is able to exceed 1.00.
    // If set, content scales to fit size, otherwise no scaling is applied.
    size?: number;
}
declare type CardContentType = 'Text' | 'Image' | 'Video' | 'Link';
