import MockDate from "mockdate";
const FRAME_MILLISECONDS = 10;

// https://medium.com/@joncardasis/react-native-how-to-test-components-implementing-animated-with-jest-8cabb5fc2730
// The default implementation of requestAnimationFrame normally calls setTimeout(callback, 0)
// which will result in a large number of timers being created.
// Jest watches the number of timers created and once it reaches a threshold,
// it assumes infinite recursion is taking place and can fail tests.
// By settings the timeout to 10ms, we can avoid this issue.
global.requestAnimationFrame = ((callback: FrameRequestCallback) => {
    setTimeout(callback, FRAME_MILLISECONDS);
}) as typeof requestAnimationFrame;

// Convenience functions we will consume in our tests.
// We serially step through every 10ms of the animation,
// allowing RN Animated to process any callbacks needed.
/*
    describe("MyComponent", () => {
        it("should do something", () => {
            global.withAnimatedTimeTravelEnabled(() => {
                renderComponent();
                global.timeTravel(1000);
                expect(something).toBe(true);
            });
        }
    });
 */

/**
 * Wrap code in a block where fake timers are used.
 * Use `timeTravel()` to advance time within that block.
 */
export function usingTimeTravel<Result>(func: (...args: any[]) => Result): Result {
    MockDate.set(0);
    jest.useFakeTimers();
    const result = func();
    MockDate.reset();
    jest.useRealTimers();
    return result;
}

/**
 * Advances time within a `usingTimeTravel` block.
 */
export function timeTravel(milliseconds = FRAME_MILLISECONDS) {
    const tickTravel = () => {
        const now = Date.now();
        MockDate.set(new Date(now + FRAME_MILLISECONDS));
        // Run the timers forward
        jest.advanceTimersByTime(FRAME_MILLISECONDS);
    }
    // Step through each of the frames
    const frames = milliseconds / FRAME_MILLISECONDS;
    for (let i = 0; i < frames; i++) {
        tickTravel();
    }
}
