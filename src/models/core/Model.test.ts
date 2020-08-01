import {assertNewInstance, assertProperties} from "./model-test-utils";
import Model from "./Model";
import immutable from "./immutable";

@immutable class TestModelChild {
    constructor(readonly value: string) {}
}
class TestModel extends Model {
    message = 'initial-message';
    child = new TestModelChild('initial-child');
}

describe('Model', () => {

    it('can be created', () => {
        expect(new TestModel).toBeDefined()
    });

    describe('#update()', () => {

        describe('with callback', () => {
            const original = new TestModel;
            const updated = original.update(draft => {
                draft.message = 'new-message';
                draft.child.value = 'new-child';
            });
            assertNewInstance(original, updated);
            assertNewInstance(original.child, updated.child, 'has a new child');
            assertProperties(updated, { message: 'new-message' });
            assertProperties(updated.child, { value: 'new-child' });
        });

        describe('with object', () => {
            const original = new TestModel;
            const updated = original.update({
                message: 'new-message',
                child: new TestModelChild('new-child'),
            });
            assertNewInstance(original, updated);
            assertNewInstance(original.child, updated.child, 'has a new child');
            assertProperties(updated, { message: 'new-message' });
            assertProperties(updated.child, { value: 'new-child' });
        });

    });

});
