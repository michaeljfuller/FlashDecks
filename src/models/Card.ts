import Model from "./core/Model";
import {ApiUser, UserModel} from "./User";
import {ApiCardSide, CardSideModel} from "./CardSide";

export interface ApiCard {
    id: string;
    name: string;
    ownerId: string;
    owner: ApiUser;
    sides?: ApiCardSide[];
}

export class CardModel extends Model implements Omit<ApiCard, 'owner'|'sides'> {
    readonly id: string = '';
    readonly name: string = '';
    readonly ownerId: string = '';
    readonly owner?: UserModel;
    readonly sides: readonly CardSideModel[] = [];

    static fromApi(obj: ApiCard) {
        const { sides=[] } = obj;
        return (new CardModel()).update({
            id: obj.id,
            ownerId: obj.ownerId,
            owner: UserModel.fromApi(obj.owner),
            name: obj.name,
            sides: sides.map(CardSideModel.fromApi),
        });
    }
}
