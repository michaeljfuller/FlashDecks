declare interface CognitoUser {
    attributes: {
        email: string,
        email_verified: boolean,
        sub: string
    },
    username: string
}
declare interface User {
    id: string,
    displayName: string
}
