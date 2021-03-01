import {screen, fireEvent, FireFunction, FireObject, RenderResult} from "@testing-library/react";
import {mapToObject} from "../../src/utils/object";

export type BaseTestIDs = Record<string, string>;

//<editor-fold desc="Query">

/**
 * Create a helper object that wraps `RenderResult.getByTestId(id)` around the test ID as the property name.
 * @example
 *  const renderFoo = (props?: FooProps) => render(<Foo {...props} />);
 *  const TestIDs = { Bar: 'foobar', Baz: 'foobaz' };
 *  cont get = createTestIdGetters(TestIDs, renderFoo));
 *  const bar = get.Bar();
 *  const baz = get.Baz(renderFoo());
 */
export function createTestIdGetters<TestIDs extends BaseTestIDs>(
    testIDs: TestIDs,
): Record<keyof TestIDs, TestIdGetter> {
    return mapToObject(testIDs, (value, key) => ({
        value: () => screen.getByTestId(testIDs[key]),
    }));
}
export type TestIdGetter = () => ReturnType<RenderResult['getByTestId']>;

/**
 * Create a helper object that wraps `RenderResult.queryByTestId(id)` around the test ID as the property name.
 * @example
 *  const renderFoo = (props?: FooProps) => render(<Foo {...props} />);
 *  const TestIDs = { Bar: 'foobar', Baz: 'foobaz' };
 *  cont query = createTestIdQueries(TestIDs, renderFoo));
 *  const bar = query.Bar();
 *  const baz = query.Baz(renderFoo());
 */
export function createTestIdQueries<TestIDs extends BaseTestIDs>(
    testIDs: TestIDs,
): Record<keyof TestIDs, TestIdQuery> {
    return mapToObject(testIDs, (value, key) => ({
        value: () => screen.queryByTestId(testIDs[key]),
    }));
}
export type TestIdQuery = () => ReturnType<RenderResult['queryByTestId']>;

/**
 * Create a helper object that wraps `RenderResult.findByTestId(id)` around the test ID as the property name.
 * @example
 *  const renderFoo = (props?: FooProps) => render(<Foo {...props} />);
 *  const TestIDs = { Bar: 'foobar', Baz: 'foobaz' };
 *  cont find = createTestIdFinders(TestIDs, renderFoo));
 *  const bar = find.Bar();
 *  const baz = find.Baz(renderFoo());
 */
export function createTestIdFinders<TestIDs extends BaseTestIDs>(
    testIDs: TestIDs,
): Record<keyof TestIDs, TestIdFinder> {
    return mapToObject(testIDs, (value, key) => ({
        value: () => screen.findByTestId(testIDs[key]),
    }));
}
export type TestIdFinder = () => ReturnType<RenderResult['findByTestId']>;

//</editor-fold>
//<editor-fold desc="Query All">

/**
 * Create a helper object that wraps `RenderResult.getAllByTestId(id)` around the test ID as the property name.
 * @example
 *  const renderFoo = (props?: FooProps) => render(<Foo {...props} />);
 *  const TestIDs = { Bar: 'foobar', Baz: 'foobaz' };
 *  cont getAll = createAllTestIdGetters(TestIDs, renderFoo));
 *  const bar = getAll.Bar();
 *  const baz = getAll.Baz(renderFoo());
 */
export function createAllTestIdGetters<TestIDs extends BaseTestIDs>(
    testIDs: TestIDs,
): Record<keyof TestIDs, AllTestIdGetter> {
    return mapToObject(testIDs, (value, key) => ({
        value: () => screen.getAllByTestId(testIDs[key]),
    }));
}
export type AllTestIdGetter = () => ReturnType<RenderResult['getAllByTestId']>;

/**
 * Create a helper object that wraps `RenderResult.queryAllByTestId(id)` around the test ID as the property name.
 * @example
 *  const renderFoo = (props?: FooProps) => render(<Foo {...props} />);
 *  const TestIDs = { Bar: 'foobar', Baz: 'foobaz' };
 *  cont queryAll = createAllTestIdQueries(TestIDs, renderFoo));
 *  const bar = queryAll.Bar();
 *  const baz = queryAll.Baz(renderFoo());
 */
export function createAllTestIdQueries<TestIDs extends BaseTestIDs>(
    testIDs: TestIDs,
): Record<keyof TestIDs, AllTestIdQuery> {
    return mapToObject(testIDs, (value, key) => ({
        value: () => screen.queryAllByTestId(testIDs[key]),
    }));
}
export type AllTestIdQuery = () => ReturnType<RenderResult['queryAllByTestId']>;

/**
 * Create a helper object that wraps `RenderResult.findAllByTestId(id)` around the test ID as the property name.
 * @example
 *  const renderFoo = (props?: FooProps) => render(<Foo {...props} />);
 *  const TestIDs = { Bar: 'foobar', Baz: 'foobaz' };
 *  cont findAll = createAllTestIdFinders(TestIDs, renderFoo));
 *  const bar = findAll.Bar();
 *  const baz = findAll.Baz(renderFoo());
 */
export function createAllTestIdFinders<TestIDs extends BaseTestIDs>(
    testIDs: TestIDs,
): Record<keyof TestIDs, AllTestIdFinder> {
    return mapToObject(testIDs, (value, key) => ({
        value: () => screen.findAllByTestId(testIDs[key]),
    }));
}
export type AllTestIdFinder = () => ReturnType<RenderResult['findAllByTestId']>;

//</editor-fold>
//<editor-fold desc="Event">

/**
 * Create a helper object that wraps `fireEvent(RenderResult.getByTestId(id), event)` around the test ID as the property name.
 * @example
 *  const renderFoo = (props?: FooProps) => render(<Foo {...props} />);
 *  const TestIDs = { Bar: 'foobar', Baz: 'foobaz' };
 *  cont click = createTestIdClickers(TestIDs, renderFoo));
 *  const bar = click.Bar();
 *  const baz = click.Baz(renderFoo());
 */
export function createTestIdEventEmitter<TestIDs extends BaseTestIDs>(
    testIDs: TestIDs,
): Record<keyof TestIDs, TestIdEventEmitter> {
    return mapToObject(testIDs, testId => ({
        value: (event) => fireEvent(
            screen.getByTestId(testId), event
        ),
    }));
}
export type TestIdEventEmitter = (event: Event) => ReturnType<FireFunction>;

/**
 * Create a helper object that wraps `fireEvent.click(RenderResult.getByTestId(id))` around the test ID as the property name.
 * @example
 *  const renderFoo = (props?: FooProps) => render(<Foo {...props} />);
 *  const TestIDs = { Bar: 'foobar', Baz: 'foobaz' };
 *  cont click = createTestIdClickers(TestIDs, renderFoo));
 *  const bar = click.Bar();
 *  const baz = click.Baz(renderFoo());
 */
export function createTestIdClickers<TestIDs extends BaseTestIDs>(
    testIDs: TestIDs,
): Record<keyof TestIDs, TestIdClicker> {
    return mapToObject(testIDs, testId => ({
        value: () => fireEvent.click(
            screen.getByTestId(testId)
        ),
    }));
}
export type TestIdClicker = () => ReturnType<FireObject['click']>;

/**
 * Create a helper object that wraps `fireEvent.input(RenderResult.getByTestId(id), {target:{value}})` around the test ID as the property name.
 * @example
 *  const renderFoo = (props?: FooProps) => render(<Foo {...props} />);
 *  const TestIDs = { Bar: 'foobar', Baz: 'foobaz' };
 *  cont input = createTestIdInputters(TestIDs, renderFoo));
 *  const bar = bar.Bar("Hello");
 *  const baz = bar.Baz("World", renderFoo());
 */
export function createTestIdInputters<TestIDs extends BaseTestIDs>(
    testIDs: TestIDs,
): Record<keyof TestIDs, TestIdInputter> {
    return mapToObject(testIDs, testId => ({
        value: (inputValue: any) => fireEvent.input(
            screen.getByTestId(testId), { target: { value: inputValue }}
        ),
    }));
}
export type TestIdInputter = (value: any) => ReturnType<FireObject['click']>;

//</editor-fold>
