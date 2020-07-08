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
    type: CardContentType;
    value: string;
}
declare type CardContentType = 'Text' | 'Image' | 'Video' | 'Link';
