export interface ApiResponseData <Payload, RequestBody> {
    payload?: Payload;
    requestBody?: Readonly<RequestBody>;
    error?: any;
    dropped?: boolean;
}
type ApiResponseCancel = () => void;

export default class ApiRequest<
    Payload = object,
    RequestBody = object
> implements ApiResponseData<Payload, RequestBody> {

    // If the request was a success (even if dropped).
    get success() { return this._success; }
    private _success = false;

    // If an error was returned.
    get error() { return this._error; }
    private _error: any|undefined;

    // If the request finished (even if dropped).
    get complete() { return Boolean(this.success || this.error); }

    // If the request wasn't finished and isn't dropped.
    get waiting() { return Boolean(!this.complete && !this.dropped); }

    // The response data.
    get payload() { return this._payload; }
    private _payload: Payload|undefined;

    // If the user requested to drop the response.
    get dropped() { return this._dropped; }
    private _dropped = false;

    // Captured functions to stop each `wait(stopOnDrop = true)`.
    private _droppable: ApiResponseCancel[] = [];

    // The request promise.
    private readonly promise: Promise<void>

    // The data at the time this is called.
    get snapshot(): ApiResponseData<Payload, RequestBody> {
        return {
            payload: this.payload,
            requestBody: this.requestBody,
            dropped: this.dropped,
            error: this.error
        };
    }

    constructor(promise: Promise<Payload|undefined>, readonly requestBody?: RequestBody) {
        this.promise = promise.then(
            payload => {
                // Capture payload and flag success. No need to re-resolve.
                this._success = true;
                this._payload = payload;
                this._droppable = [];
            },
            error => {
                // Capture error. No need to re-throw.
                this._error = error;
            }
        );
    }

    /**
     * Wait for the request to finish.
     * @param {boolean} stopOnDrop - If true and `drop()` was called, finish immediately.
     */
    async wait(stopOnDrop = true): Promise<ApiResponseData<Payload, RequestBody>> {
        if (!this.waiting) {
            return this.snapshot;
        }
        return new Promise(resolve => {
            // Resolve now, unless already done from drop.
            // Never reject. Errors are on resolved data object.
            this.promise.finally(() => resolve(this.snapshot));
            if (stopOnDrop) {
                this._droppable.push(() => resolve(this.snapshot));
            }
        });
    }

    /** Flag as dropped and stop any calls to `wait()` where `stopOnDrop = true`. */
    drop() {
        if (!this.dropped && !this.complete) {
            this._dropped = true;
            this._droppable.forEach(drop => drop());
            this._droppable = [];
        }
    }

}
