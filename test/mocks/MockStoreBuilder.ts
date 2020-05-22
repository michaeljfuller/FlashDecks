import configureStore, {MockStoreCreator} from 'redux-mock-store';
export {MockStoreEnhanced} from 'redux-mock-store';
export {Store} from 'redux';
export {expectStore} from '../expects/expectStore';

export class MockStoreBuilder {
    private readonly mockStoreCreator: MockStoreCreator;

    constructor(middleware: any[] = []) {
        this.mockStoreCreator = configureStore(middleware);
    }

    create<State = any>(initialState: State = ({} as any)) {
        return this.mockStoreCreator(initialState);
    }
}

export const mockStoreBuilder = new MockStoreBuilder();
export default mockStoreBuilder;
