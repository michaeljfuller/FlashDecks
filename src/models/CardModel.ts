import Model from "./core/Model";
import {ApiList} from "../api/util/ApiTypes";
import {ApiUser, UserModel} from "./UserModel";
import {ApiCardSide, CardSideModel} from "./CardSideModel";

export interface ApiCard {
    id: string;
    name: string;
    ownerId: string;
    owner: ApiUser;
    sides?: ApiList<ApiCardSide>;
}

export class CardModel extends Model implements Omit<ApiCard, 'owner'|'sides'> {
    readonly id: string = '';
    readonly name: string = '';
    readonly ownerId: string = '';
    readonly owner?: UserModel;
    readonly sides: readonly CardSideModel[] = [];

    static fromApi(obj: ApiCard) {
        return (new CardModel()).update({
            id: obj.id,
            ownerId: obj.ownerId,
            owner: UserModel.fromApi(obj.owner),
            name: obj.name,
            sides: obj.sides?.items?.map(CardSideModel.fromApi) || [],
        });
    }
}
