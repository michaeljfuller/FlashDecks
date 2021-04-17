import {Store} from "redux";
import AStoreHelper from "./AStoreHelper";
import {mockStoreBuilder} from "../../test/mocks/MockStoreBuilder";

const STATE_NAME = 'TestStoreHelperStateName';
interface TestStoreHelperState {
    value: string;
}
class TestStoreHelper extends AStoreHelper<TestStoreHelperState> {
    constructor(store: Store) {
        super(STATE_NAME as any, store);
    }
}
function createMockStore(
    initialValue: TestStoreHelperState = {value: ''}
): Store {
    return mockStoreBuilder.create({ [STATE_NAME]: initialValue });
}

describe('AStoreHelper', () => {

    it('has a default state', () => {
        const initialState: TestStoreHelperState = { value: 'initial-state' };
        const store = createMockStore(initialState);
        const helper = new TestStoreHelper(store);
        expect(helper.state).toBe(initialState);
    });

    it('wraps store subscribe', () => {
        const store = createMockStore();
        const helper = new TestStoreHelper(store);
        const spy = spyOn(store, 'subscribe');
        helper.subscribe(() => {});
        expect(spy).toHaveBeenCalled();
    });

});
