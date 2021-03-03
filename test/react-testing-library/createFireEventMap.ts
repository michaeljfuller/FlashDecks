import {fireEvent, EventType, Matcher} from "@testing-library/react";
import type {OmitFirst} from "../../src/utils/type";
import {mapToObject} from "../../src/utils/object";
import {MatchOptions, applyMatchOptions} from "./matcherOptions";

/**
 * Create a helper object that wraps `fireEvent[eventName](element, event)` around the keys of the matcherMap.
 * @example
 *  const input = createFireEventMap({Username: 'username-input' }, screen.getByTestId, "input");
 *  input.Username("Hello");
 */
export function createFireEventMap<
    Map extends Record<string, Match>,
    Query extends (match: Match, ...rest: any) => any,
    EventName extends EventType,
    Match extends Matcher,
    Value extends FireEventFunction<Match, EventName, Query>
                = FireEventFunction<Match, EventName, Query>
>(
    matcherMap: Map,
    query: Query,
    eventName: EventName,
): Record<keyof Map, Value> {
    return mapToObject<Map, Value>(matcherMap, (match: Match) => {
        const value = (
            (targetOrValue?: EventTargetOrValue, eventInit?: EventInit, matchOptions?: MatchOptions<Match>, ...queryParams: any) => {
                let target: EventTarget|undefined = undefined;
                if (targetOrValue !== undefined) {
                    target = typeof targetOrValue === "object" ? targetOrValue : {value: targetOrValue};
                }
                return fireEvent[eventName](
                    query(
                        applyMatchOptions(match, matchOptions),
                        ...queryParams
                    ),
                    Object.assign({target}, eventInit) as EventProperties
                );
            }
        ) as Value;
        return { value };
    });
}
export default createFireEventMap;

type EventTarget = Partial<AnyHTMLElement>;
type EventTargetOrValue = EventTarget|any;

/** Function that calls fireEvent on the passed target. */
type FireEventFunction<
    Match extends Matcher = any,
    EventName extends EventType = any,
    Query extends (match: Match, ...rest: any) => any = any,
> = (
    targetOrValue?: EventTargetOrValue,
    eventInit?: EventInitFromEventType<EventName>,
    matchOptions?: MatchOptions<Match>,
    ...queryParams: OmitFirst<Parameters<Query>>
) => boolean

/** Union of all HTMLElements */
type AnyHTMLElement = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];

/**
 * The EventProperties to pass to a FireObject function.
 * @link https://testing-library.com/docs/dom-testing-library/api-events/#fireeventeventname
 */
type EventProperties = EventInit & { target?: EventTarget };

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
