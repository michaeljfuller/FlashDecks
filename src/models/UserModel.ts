import Model from "./core/Model";
import {GetUserQuery} from "../API";

export type ApiUser = NonNullable<GetUserQuery['getUser']>;

export class UserModel extends Model implements Omit<ApiUser, '__typename'> {
    readonly id: string = '';
    readonly displayName: string = '';

    static fromApi(obj: ApiUser) {
        return (new UserModel).update({
            id: obj.id,
            displayName: obj.displayName,
        });
    }

    static same(first: UserModel|null|undefined, second: UserModel|null|undefined) {
        if (!first !== !second) return false; // If only one is truthy, not the same.
        return first?.id !== second?.id;
    }
    static different(first: UserModel|null|undefined, second: UserModel|null|undefined) {
        return !UserModel.same(first, second);
    }
}
