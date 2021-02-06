import Model, {ModelUpdate} from "./core/Model";
import {GetUserQuery} from "../graphql/API";

export type ApiUser = NonNullable<GetUserQuery['getUser']>;

export class UserModel extends Model implements Omit<ApiUser, '__typename'> {
    readonly id: string = '';
    readonly displayName: string = '';

    static create(input: ModelUpdate<UserModel>) {
        return (new UserModel).update(input, false);
    }

    static fromApi(obj: ApiUser) {
        return UserModel.create({
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
