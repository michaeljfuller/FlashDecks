/**
 * A class that adds controls to the passed target.
 */
export class JestMockManager {
    constructor(public readonly target: object) {}

    /** Get mocks on target. */
    get mocks(): jest.Mock[] {
        return Object.values(this.target).filter(jest.isMockFunction);
    }

    /**
     * Resets all information stored in the mockFn.mock.calls and mockFn.mock.instances arrays.
     *
     * Often this is useful when you want to clean up a mock's usage data between two assertions.
     *
     * Beware that mockClear will replace mockFn.mock, not just mockFn.mock.calls and mockFn.mock.instances.
     * You should, therefore, avoid assigning mockFn.mock to other variables,
     * temporary or not, to make sure you don't access stale data.
     * The clearMocks configuration option is available to clear mocks automatically between tests.
     *
     * @link https://jestjs.io/docs/mock-function-api#mockfnmockclear
     */
    public clearAll() {
        this.mocks.forEach(mock => mock.mockClear());
    }

    /**
     * Does everything that mockFn.mockClear() does, and also removes any mocked return values or implementations.
     *
     * This is useful when you want to completely reset a mock back to its initial state.
     * (Note that resetting a spy will result in a function with no return value).
     *
     * Beware that mockReset will replace mockFn.mock, not just mockFn.mock.calls and mockFn.mock.instances.
     * You should, therefore, avoid assigning mockFn.mock to other variables,
     * temporary or not, to make sure you don't access stale data.
     *
     * @link https://jestjs.io/docs/mock-function-api#mockfnmockreset
     */
    public resetAll() {
        this.mocks.forEach(mock => mock.mockReset());
    }

}
