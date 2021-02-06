import ImmutablePureComponent from "../../../../ImmutablePureComponent";
import {CardContentModel} from "../../../../../models";
import logger from "../../../../../utils/Logger";
import mediaApi from "../../../../../api/MediaApi";
import {getErrorText} from "../../../../../utils/string";
import {Observable, Subscription} from "rxjs";

export interface BaseCardMediaProps {
    content: CardContentModel;
    height?: number;
}
export interface BaseCardMediaState {
    mediaUrl?: string;
    error?: string;
    fetching?: boolean;
}

/**
 * Base component class that takes a CardContentModel whose value can be a URI or an S3Key.
 */
export abstract class BaseCardMedia<
    Props extends BaseCardMediaProps = BaseCardMediaProps,
    State extends BaseCardMediaState = BaseCardMediaState
> extends ImmutablePureComponent<Props, State> {
    state = {} as Readonly<State>;

    get mediaUri() { return this.valueIsS3Key ? this.state.mediaUrl : this.props.content.value; }
    get mediaKey() { return this.props.content.value; }
    get valueIsS3Key() { return this.props.content.format === "S3Key"; }

    protected fetchMediaUrlSub?: Subscription;

    /**
     * Prepares a logger with the class name, instance ref, and method name.
     * @example
     *  myMethod(msg: string) {
     *      this.logger(this.myMethod).log("msg =", msg); // "MyClass{1}.myMethod(msg) msg = Hello World"
     *  }
     */
    protected logger(method?: Function) {
        let log = logger.addLogRef(this);
        if (method) log = log.space.addMethod(method);
        return log.space;
    }

    componentDidMount() {
        this.initMedia();
    }
    componentWillUnmount() {
        this.fetchMediaUrlSub?.unsubscribe();
    }

    componentDidUpdate(prevProps: Readonly<BaseCardMediaProps>/*, prevState: Readonly<BaseCardMediaState>/*, snapshot?: any*/) {
        const {content} = this.props;
        if (prevProps.content.value !== content.value) { // URI/S3Key changed
            this.initMedia();
        }
    }

    /** Reset state and fetchMediaUrl if content uses S3Key. */
    initMedia() {
        this.setStateTo({ mediaUrl: undefined, error: undefined });
        if (this.props.content.format === "S3Key") {

            this.setStateTo({ fetching: true });
            this.fetchMediaUrl(this.props.content.value).then(
                mediaUrl => this.setStateTo({ mediaUrl }),
                error => this.setStateTo({ error: getErrorText(error) }),
            ).finally(
                () => this.setStateTo({ fetching: false })
            );
        }
    }

    /** Get the mediaUrl from the s3Key */
    fetchMediaUrl(s3Key: string) {
        const result = new Observable<string>(subscriber => {
            this.fetchMediaUrlSub?.unsubscribe();
            this.fetchMediaUrlSub = mediaApi.fetchMediaUrl(s3Key).subscribe(subscriber);
        });
        return result.toPromise(); // Use toPromise to trigger Observable to run, and because only a single response.
    }

}
