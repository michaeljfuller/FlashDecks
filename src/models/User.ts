import Model from "./Model";

export interface ApiUser {
    id: string;
    displayName: string;
}

export class UserModel extends Model implements ApiUser {
    readonly id: string = '';
    readonly displayName: string = '';

    static fromApi(obj: ApiUser) {
        return (new UserModel).update(obj);
    }
}
export default UserModel;

