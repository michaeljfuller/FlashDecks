import {fireEvent} from "@testing-library/react";
import type {BaseMap, EventType, Matcher, QueryParams, ScreenQuery} from "./rtl-types";
import {isPromise} from "../../src/utils/async";
import {addPropertiesToFunction} from "../../src/utils/function";
import {mapToObject} from "../../src/utils/object";

/*
    ###################################################################################################################
    #                                                     ANATOMY                                                     #
    ###################################################################################################################
    const trigger = createEventMap({Foo:''}, screen.getByTestId); // `createEventMap` creates the `EventMap`.
    trigger.Foo.input({value: 'Hello'}, {bubbles:false});   // Call "input" event, with target value and event props.
    trigger.Foo.input('Hello', {bubbles:false});            // Call "input" event, with target value and event props.
    trigger.Foo({suggest:true}).click();                    // Add options for the `Query`, and call "click".
    trigger.Foo.event(new Event("custom"));                 // Pass an `Event` object,
 */

/**
 * Create a helper object that wraps `fireEvent[eventName](element, event)` around the keys of the matcherMap.
 * @example
 *  const trigger = createEventMap({Foo:''}, screen.getByTestId);
 *  trigger.Foo.input({value: 'Hello'}, {bubbles:false});
 *  trigger.Foo({suggest:true}).click();
 *  trigger.Foo.event(new Event("custom"));
 */
export function createEventMap<
    Matchers extends BaseMap<Match>,
    Match extends Matcher,
    Query extends ScreenQuery,
    EventName extends EventType,
>(  // event.Foo.input({value: "Hello"})
    matchers: Matchers,
    query: Query,
): EventMap<Matchers, Match, Query> {
    return mapToObject(matchers, (matcher: Match) => { // event[Key="Foo"]
        return {
            value: addPropertiesToFunction(
                // event[Key="Foo"]({suggest:true}).input({value: "Hello"})
                (...queryParams: QueryParams<Query>) => createProperties(matcher, query, queryParams),
                // event[Key="Foo"].event(new Event("test"))
                // event[Key="Foo"][eventType="input"](target={value: "Hello"})
                createProperties(matcher, query)
            ) as EventMapTarget<Match, Query>
        };
    });
}
export default createEventMap;

/**
 * Output of `createEventMap`
 * @example createEventMap({Target:'target'}, screen.getByTestId);
 */
type EventMap<
    Matchers extends BaseMap<Match>,
    Match extends Matcher,
    Query extends ScreenQuery,
> = { [K in keyof Matchers]: EventMapTarget<Match, Query> };

/**
 * The `EventMap` members as an object.
 * @example createEventMap({Target:'target'}, screen.getByTestId).Target;
 */
type EventMapTarget<
    Match extends Matcher,
    Query extends ScreenQuery,
> = EventMapTargetFunction<Match, Query> & EventMapTargetProperties<Query>;

/**
 * The `EventMap` members as a function.
 * createEventMap({Target:'target'}, screen.getByTestId).Target({suggest:true})
 */
type EventMapTargetFunction<
    Match extends Matcher,
    Query extends ScreenQuery,
> = (...queryParams: QueryParams<Query>) => EventMapTargetProperties<Query>;

/**
 * The event properties on the `EventMap` members.
 * @example createEventMap({Target:'target'}, screen.getByTestId).Target.input({value: 'Hello'});
 */
type EventMapTargetProperties<Query extends ScreenQuery> = {
    [Key in EventType]: Executor<Query, Key>;
} & {
    event: (event: Event) => CombinedEventResult<Query>;
};

/**
 * Creates the trigger functions for `EventMapTargetProperties`.
 * @example event.Foo.event(new Event("test"));
 * @example event.Foo[eventType="input"](target={value:"foo"}, event={bubbles:false});
 */
function createProperties<
    Match extends Matcher,
    Query extends ScreenQuery,
>(
    matcher: Match,
    query: Query,
    queryParams?: QueryParams<Query>,
): EventMapTargetProperties<Query> {
    // event.Foo[eventType="input"](target={value:"foo"}, event={bubbles:false});
    const result: EventMapTargetProperties<Query> = mapToObject(
        fireEvent, (func, eventType: EventType) => {
            if (typeof func !== 'function') return {skip:true};
            return {
                value: (targetOrValue?: EventTarget|any, event?: EventProperties<any>) => {
                    const selection = query(matcher, ...(queryParams||[])) as ReturnType<Query>;
                    const target: EventTarget = typeof targetOrValue === "object" ? targetOrValue : {value: targetOrValue};
                    const options = Object.assign({target}, event) as {target?: EventTarget} & EventProperties<any>;
                    return execute(selection, element => fireEvent[eventType](element, options));
                },
            };
        }
    );

    // event.Foo.event(new Event("test"));
    result.event = (event: Event) => {
        const selection = query(matcher, ...(queryParams||[])) as ReturnType<Query>;
        return execute(selection, (element => fireEvent(element, event)));
    };

    return result;
}

//
/**
 * Call `fireEvent` or `fireEvent[name="click"] on the output(s) of a Query.
 * @example execute(selection, (element => fireEvent(element, event)));
 * @example execute(selection, (element => fireEvent[name="click"](element, target)));
 */
function execute<Query extends ScreenQuery>(
    selection: ReturnType<Query>,
    fire: (element: HTMLElement) => boolean,
): CombinedEventResult<Query> {
    // Handle an async response
    if (isPromise(selection)) {
        return (selection as Promise<HTMLElement|HTMLElement[]>).then<boolean|boolean[]>(response => {
            if (Array.isArray(response)) return (response as HTMLElement[]).map(item => fire(item));
            return fire(response);
        }) as CombinedEventResult<Query>;
    }
    // Handle a sync response
    if (Array.isArray(selection)) return (selection as HTMLElement[]).map(item => fire(item)) as CombinedEventResult<Query>;
    return fire(selection as HTMLElement) as CombinedEventResult<Query>;
}

/**
 * The final function in the chain, running the query and firing the event.
 * @example createEventMap({Target:'target'}, screen.getByTestId).Target.input({value: 'Hello'});
 */
type Executor<
    Query extends ScreenQuery,
    Event extends EventType
> = (target?: EventTarget, event?: EventProperties<Event>) => CombinedEventResult<Query>;

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
