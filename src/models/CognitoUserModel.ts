import Model from "./core/Model";

export interface ApiCognitoUser {
    username: string;
    attributes: ApiCognitoUserAttributes;
}
interface ApiCognitoUserAttributes {
    email: string;
    email_verified: boolean;
    sub: string;
}

export class CognitoUserModel extends Model implements
    Omit<ApiCognitoUser, 'attributes'>,
    ApiCognitoUserAttributes
{
    readonly username: string = '';
    readonly email: string = '';
    readonly email_verified: boolean = false;
    readonly sub: string = '';

    static fromApi(obj: ApiCognitoUser) {
        return (new CognitoUserModel).update({
            username: obj.username,
            email: obj.attributes.email,
            email_verified: obj.attributes.email_verified,
            sub: obj.attributes.sub,
        });
    }
}
