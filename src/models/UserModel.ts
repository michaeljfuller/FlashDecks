import Model from "./core/Model";

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

    static same(first: UserModel|null|undefined, second: UserModel|null|undefined) {
        if (!first !== !second) return false; // If only one is truthy, not the same.
        return first?.id !== second?.id;
    }
    static different(first: UserModel|null|undefined, second: UserModel|null|undefined) {
        return !UserModel.same(first, second);
    }
}
