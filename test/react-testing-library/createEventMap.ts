import {fireEvent, EventType, Matcher} from "@testing-library/react";
import createQueryMap, {BaseMap, MatcherOptions, ScreenQuery} from "./createQueryMap";
import {isPromise} from "../../src/utils/async";
import {addPropertiesToFunction} from "../../src/utils/function";
import {mapToObject} from "../../src/utils/object";

/*
    ###################################################################################################################
    #                                                     ANATOMY                                                     #
    ###################################################################################################################
    const event = createQueryEventMap(  // `createQueryEventMap` creates the `QueryMap`.
        {Foo:'foo'},                    // `BaseMap` containing the `Key`s and `Matcher`s.
        screen.getByTestId              // `ScreenQuery` used to select element(s).
    );
                          // Use `Key` of the `BaseMap` to access `Executor` for that `Query` on the `QueryMap`.
    event.Foo().input(    // Get the element with the "Foo" `Matcher` and trigger the `input` event.
        {value: 'Hello World'}, {bubbles: false}    // Set the value of the element, and give properties to the event.
    );
    event({suggest: true}).Foo().click();           // Trigger click on the "Foo" element.
    event({suggest: true}).Foo()(new Event('test'));           // TODO Weird. Change this.
                                                               // TODO event.Foo.input({value: "Hello"})
                                                               // TODO event.Foo(new Event("test"))
 */

/**
 * Create a helper object that wraps `fireEvent[eventName](element, event)` around the keys of the matcherMap.
 * @example
 *  const input = createFireEventMap({Username: 'username-input' }, screen.getByTestId, "input");
 *  input.Username("Hello");
 *  input({exact:true}).Username("Hello");
 */
export function createQueryEventMap<
    Matchers extends BaseMap<Match>,
    Query extends ScreenQuery,
    EventName extends EventType,
    Match extends Matcher,
>(
    matchers: Matchers,
    query: Query,
) {
    return createQueryMap(
        matchers,
        query,
        (matcherOptions) => {
            return addPropertiesToFunction(
                (event: Event) => executeRawEvent(event, matcherOptions.runQuery()),
                createEventMapObject(matchers, matcherOptions)
            )
        }
    );
}
export default createQueryEventMap;

/** Creates the EventMapObject for createQueryMap(), with Executors bound to the keys. */
function createEventMapObject<
    Matchers extends BaseMap<Match>,
    Query extends ScreenQuery,
    Match extends Matcher,
>(
    matchers: Matchers,
    matcherOptions: MatcherOptions<Query>,
): EventMapObject<Query> {
    return mapToObject(fireEvent, (func, key) => {
        if (typeof func !== 'function') return {skip:true};
        return {
            value: (target?: EventTarget, event?: EventProperties<any>) => executeNamedEvent<Query>(key, matcherOptions, target, event),
        };
    });
}

/** Call fireEvent[eventName](element, event) on the output of a query. */
function executeNamedEvent<Query extends ScreenQuery>(
    key: EventType,
    {runQuery}: MatcherOptions<Query>,
    target?: EventTarget,
    event?: EventProperties<any>,
): CombinedEventResult<Query> {
    const selection = runQuery();
    const options = Object.assign({target}, event) as {target?: EventTarget} & EventProperties<any>;

    if (isPromise(selection)) {
        return (selection as Promise<any>).then<any>(response => {
            if (Array.isArray(response)) {
                return response.map(item => fireEvent[key](item as HTMLElement, options)) as CombinedEventResult<Query>;
            }
            return fireEvent[key](response as HTMLElement, options) as CombinedEventResult<Query>;
        }) as CombinedEventResult<Query>;
    }

    if (Array.isArray(selection)) {
        return selection.map(item => fireEvent[key](item as HTMLElement, options)) as CombinedEventResult<Query>;
    }
    return fireEvent[key](selection as HTMLElement, options) as CombinedEventResult<Query>;
}

/** Call fireEvent(element, event) on the output of a query. */
function executeRawEvent<Query extends ScreenQuery>(
    event: Event,
    selection: ReturnType<Query>
): CombinedEventResult<Query> {
    if (isPromise(selection)) {
        return (selection as Promise<HTMLElement|HTMLElement[]>).then<boolean|boolean[]>(response => {
            if (Array.isArray(response)) return (response as HTMLElement[]).map(item => fireEvent(item, event));
            return fireEvent(response as HTMLElement, event);
        }) as CombinedEventResult<Query>;
    }
    if (Array.isArray(selection)) return (selection as HTMLElement[]).map(item => fireEvent(item, event)) as CombinedEventResult<Query>;
    return fireEvent(selection as HTMLElement, event) as CombinedEventResult<Query>;
}

type EventMapObject<Query extends ScreenQuery> = { [Key in EventType]: EventMapFunction<Query, Key> };
type EventMapFunction<Query extends ScreenQuery, Event extends EventType> = (target?: EventTarget, event?: EventProperties<Event>) => CombinedEventResult<Query>;

/** Output of combined events, based on the type of Query. */
type CombinedEventResult<Query extends ScreenQuery> =
    ReturnType<Query> extends HTMLElement ? boolean :
    ReturnType<Query> extends HTMLElement[] ? boolean[] :
    ReturnType<Query> extends Promise<HTMLElement> ? Promise<boolean> :
    ReturnType<Query> extends Promise<HTMLElement[]> ? Promise<boolean[]> :
    never;

/**
 * The EventProperties to pass to a FireObject function.
 * @link https://testing-library.com/docs/dom-testing-library/api-events/#fireeventeventname
 */
type EventProperties<Event extends EventType> = EventInitFromEventType<Event> & { target?: EventTarget };
type EventTarget = Partial<AnyHTMLElement>;
type AnyHTMLElement = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];

/**
 * Get the related EventInit from the EventType.
 * @link https://github.com/testing-library/dom-testing-library/blob/master/src/event-map.js
 */
type EventInitFromEventType<T extends EventType> =
    // Clipboard Events
    T extends 'copy'|'cut'|'paste' ? ClipboardEventInit :
    // Composition Events
    T extends 'compositionEnd'|'compositionStart'|'compositionUpdate' ? CompositionEventInit :
    // Keyboard Events
    T extends 'keyDown'|'keyPress'|'keyUp' ? KeyboardEventInit :
    // Focus Events
    T extends 'focus'|'blur'|'focusIn'|'focusOut' ? FocusEventInit :
    // Form Events
    T extends 'change'|'invalid'|'submit'|'reset' ? EventInit :
    T extends 'input' ? InputEventInit :
    // Mouse Events
    T extends 'click'|'contextMenu'|'dblClick' ? MouseEventInit :
    T extends 'drag'|'dragEnd'|'dragEnter'|'dragExit'|'dragLeave'|'dragOver'|'dragStart'|'drop' ? MouseEventInit :
    T extends 'mouseDown'|'mouseEnter'|'mouseLeave'|'mouseMove'|'mouseOut'|'mouseOver'|'mouseUp' ? MouseEventInit :
    // Selection Events
    T extends 'select' ? EventInit :
    // Touch Events
    T extends 'touchCancel'|'touchEnd'|'touchMove'|'touchStart' ? TouchEventInit :
    // UI Events
    T extends 'scroll' ? UIEventInit :
    // Wheel Events
    T extends 'wheel' ? WheelEventInit :
    // Media Events
    T extends 'abort'|'canPlay'|'canPlayThrough'|'durationChange'|'emptied'|'encrypted'|'ended' ? EventInit :
    T extends 'loadedData'|'loadedMetadata'|'loadStart'|'pause'|'play'|'playing'|'progress' ? EventInit :
    T extends 'rateChange'|'seeked'|'seeking'|'stalled'|'suspend'|'timeUpdate'|'volumeChange'|'waiting' ? EventInit :
    // Image Events
    T extends 'load'|'error' ? EventInit :
    // Animation Events
    T extends 'animationStart'|'animationEnd'|'animationIteration' ? AnimationEventInit :
    // Transition Events
    T extends 'transitionEnd' ? TransitionEventInit :
    // Pointer events
    T extends 'transitionEnd'|'doubleClick'|'pointerOver'|'pointerEnter' ? PointerEventInit :
    T extends 'pointerDown'|'pointerMove'|'pointerUp'|'pointerCancel' ? PointerEventInit :
    T extends 'pointerOut'|'pointerLeave'|'gotPointerCapture'|'lostPointerCapture' ? PointerEventInit :
    // History events
    T extends 'popState' ? PopStateEventInit :
    // Catch-all
    EventInit;
