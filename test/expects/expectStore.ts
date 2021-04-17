import {MockStoreEnhanced} from "redux-mock-store";
import {Action} from "redux";
import {isEqual} from "underscore";

interface StoreExpects {
    not: StoreExpects;
    toOnlyHaveAction: <T extends Action>(action: T) => void;
}
export const expectStore = (expect as any) as (store: MockStoreEnhanced) => StoreExpects & typeof expect;

expect.extend({

        /**
         * Tests if the only action sent to the store is one matching the given one.
         * @param store
         * @param action
         */
        toOnlyHaveAction(this: jest.MatcherUtils, store: MockStoreEnhanced, action: Action): jest.CustomMatcherResult {
            const storeActions: Action[] = store.getActions();
            return {
                pass: Boolean(storeActions.find(current => isEqual(current, action))),
                message: () => {
                    const received = this.utils.printExpected(action);
                    const expected = this.utils.printExpected(storeActions);
                    return this.isNot ?
                        `Expected store to not have the given "${action.type}" action.\n\nExpected\n${received}\nnot to be in\n${expected}\n` :
                        `Expected store to have given "${action.type}" action.\n\nExpected\n${received}\nto be in\n${expected}\n`
                }
            };
        }

    }
);

