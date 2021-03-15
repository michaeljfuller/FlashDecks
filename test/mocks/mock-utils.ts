import {AsyncResult} from "../../src/utils/async";
import {GenericFunction} from "../../src/utils/function";

/** Create a mock, typed for a function. */
export function createMock<
    Func extends (...args: any[]) => any
>(): jest.Mock<
    ReturnType<Func>, Parameters<Func>
> {
    return jest.fn();
}

export const mockImplementation = Object.freeze({
    resolve: createMockResolveImplementation,
    reject: createMockRejectImplementation,
});

/** Create an implementation for an async mock method. */
function createMockResolveImplementation<Func extends GenericFunction>() {
    return function(response: AsyncResult<Func>): Func {
        return (() => {
            return Promise.resolve(response);
        }) as any;
    }
}

/** Create an implementation for an async mock method. */
function createMockRejectImplementation<Func extends GenericFunction>(
    defaultValue = new Error("mock-error")
) {
    return function(error: any = defaultValue): Func {
        return (() => {
            return Promise.reject(error);
        }) as any;
    }
}
