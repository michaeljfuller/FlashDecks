export interface ApiResponseData <Payload> {
    payload?: Payload;
    error?: any;
    cancelled?: boolean;
}
type ApiResponseCancel = () => void;

export default class ApiRequest <Payload = object> implements ApiResponseData<Payload> {

    // If the request was a success (even if cancelled).
    get success() { return this._success; }
    private _success = false;

    // If an error was returned.
    get error() { return this._error; }
    private _error: any|undefined;

    // If the request finished (even if cancelled).
    get complete() { return Boolean(this.success || this.error); }

    // If the request wasn't finished and isn't cancelled.
    get waiting() { return Boolean(!this.complete && !this.cancelled); }

    // The response data.
    get payload() { return this._payload; }
    private _payload: Payload|undefined;

    // If the user requested to cancel the request.
    get cancelled() { return this._cancelled; }
    private _cancelled = false;

    // Captured functions to stop each `wait(stopOnCancel = true)`.
    private _cancels: ApiResponseCancel[] = [];

    // The request promise.
    private readonly promise: Promise<void>

    // The data at the time this is called.
    get snapshot(): ApiResponseData<Payload> {
        return {
            payload: this.payload,
            cancelled: this.cancelled,
            error: this.error
        };
    }

    constructor(promise: Promise<Payload>) {
        this.promise = promise.then(
            payload => {
                // Capture payload and flag success. No need to re-resolve.
                this._success = true;
                this._payload = payload;
                this._cancels = [];
            },
            error => {
                // Capture error. No need to re-throw.
                this._error = error;
            }
        );
    }

    /**
     * Wait for the request to finish.
     * @param {boolean} stopOnCancel - If true and `cancel()` was called, finish immediately.
     */
    async wait(stopOnCancel = true): Promise<ApiResponseData<Payload>> {
        if (!this.waiting) {
            return this.snapshot;
        }
        return new Promise(resolve => {
            // Resolve now, unless already done from cancel.
            // Never reject. Errors are on resolved data object.
            this.promise.finally(() => resolve(this.snapshot));
            if (stopOnCancel) {
                this._cancels.push(() => resolve(this.snapshot));
            }
        });
    }

    /** Flag as cancelled and stop any calls to `wait()` where `stopOnCancel = true`. */
    cancel() {
        if (!this.cancelled && !this.complete) {
            this._cancelled = true;
            this._cancels.forEach(cancel => cancel());
            this._cancels = [];
        }
    }

}
