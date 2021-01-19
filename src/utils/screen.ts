import {Dimensions, ScaledSize} from 'react-native';
import {CallbackManager} from "./async";

type Orientation = "LANDSCAPE"|"PORTRAIT";
type Size = Readonly<{ width: number; height: number; orientation: Orientation }>;
function extractSize({width, height}: ScaledSize): Size {
    return { width, height, orientation: width > height ? "LANDSCAPE" : "PORTRAIT" };
}

export type OnScreenSize = (current: Size, previous?: Size) => void|boolean;
export type OnScreenOrientation = (current: Orientation, previous?: Orientation) => void|boolean;

type DimensionsChangeListener = Parameters<typeof Dimensions.addEventListener>[1];

/**
 * Utility for getting screen size and changes.
 * @example
 * class MyComponent() {
 *     screen = new PlatformScreen;
 *     componentDidMount() {
 *         this.screen.startListening().onOrientationChange(this.onReorient);
 *     }
 *     componentWillUnmount() {
 *         this.screen.stopListening();
 *     }
 *     onReorient: OnScreenOrientation = (orientation) => {
 *      // ...
 *     }
 * }
 */
export class PlatformScreen {
    private listening = false;

    private currentSize = extractSize(Dimensions.get("window"));
    get size() { return this.currentSize; }

    private sizeChange = new CallbackManager<OnScreenSize>();
    get onSideChange() { return this.sizeChange.listeners; }

    private orientationChange = new CallbackManager<OnScreenOrientation>();
    get onOrientationChange() { return this.orientationChange.listeners; }

    constructor(startListening = false) {
        if (startListening) this.startListening();
    }

    public startListening() {
        if (!this.listening) Dimensions.addEventListener('change', this.changeListener);
        this.listening = true;
        return this;
    }

    /** Call this to tidy up, such as in componentWillUnmount */
    public stopListening() {
        if (this.listening) Dimensions.removeEventListener('change', this.changeListener);
        this.listening = false;
        return this;
    }

    private readonly changeListener: DimensionsChangeListener = ({ window }) => {
        this.setSize(extractSize(window));
    }

    setSize(size: Size) {
        const previousSize = this.currentSize;
        this.currentSize = size;

        if (previousSize.width !== this.currentSize.width || previousSize.height !== this.currentSize.height) { // If size changed
            this.sizeChange.call(this.currentSize, previousSize);

            if (previousSize?.orientation !== this.currentSize.orientation) { // If orientation changed
                this.orientationChange.call(this.currentSize.orientation, previousSize.orientation);
            }
        }
    }

}

export default PlatformScreen;
