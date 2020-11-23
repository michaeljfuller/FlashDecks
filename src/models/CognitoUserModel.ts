import Model, {ModelUpdate} from "./core/Model";

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

    static create(input: ModelUpdate<CognitoUserModel>) {
        return (new CognitoUserModel).update(input, false);
    }

    static fromApi(obj: ApiCognitoUser) {
        return CognitoUserModel.create({
            username: obj.username,
            email: obj.attributes.email,
            email_verified: obj.attributes.email_verified,
            sub: obj.attributes.sub,
        });
    }
}
