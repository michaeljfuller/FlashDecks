import {Observable} from "rxjs";
import {PromiseAndSubscription} from "../../utils/async";

export interface ApiResponseData<Payload, RequestBody> {
    payload: Payload|undefined;
    requestBody?: Readonly<RequestBody>;
    error?: any;
    complete: boolean;
    success: boolean;
}

/**
 * An Observable that tracks its state.
 */
export default class ApiRequest<
    Payload = object,
    RequestBody = object
>
extends Observable<Payload>
implements ApiResponseData<Payload, RequestBody>
{
    // If the request was a success.
    get success() { return this._success; }
    private _success = false;

    // If an error was returned.
    get error() { return this._error; }
    private _error: any|undefined;

    // If the request finished.
    get complete() { return Boolean(this.success || this.error); }

    // The response data.
    get payload() { return this._payload; }
    private _payload: Payload|undefined;

    // The data at the time this is called.
    get snapshot(): ApiResponseData<Payload, RequestBody> {
        return {
            payload: this.payload,
            requestBody: this.requestBody,
            error: this.error,
            complete: this.complete,
            success: this.success,
        };
    }

    constructor(promise: Promise<Payload>, requestBody?: RequestBody);
    constructor(observable: Observable<Payload>, requestBody?: RequestBody);

    constructor(
        input: Promise<Payload>|Observable<Payload>,
        readonly requestBody?: RequestBody
    ) {
        super(subscribe => {

            const onPayload = (payload: Payload) => {
                this._success = true;
                this._payload = payload;
                subscribe.next(payload);
            };
            const onError = (error: any) => {
                this._error = error;
                subscribe.error(error);
            }
            const onComplete = () => {
                subscribe.complete();
            }

            if (input instanceof Observable) {
                input.subscribe( onPayload, onError, onComplete );
            } else {
                input.then( onPayload, onError ).finally(onComplete);
            }

        });
    }

    toPromiseAndSubscription() {
        return new PromiseAndSubscription(this);
    }

}
