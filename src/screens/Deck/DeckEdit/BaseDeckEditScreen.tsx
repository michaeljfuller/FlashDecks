import {Observable, Subscription, of as toObservable} from "rxjs";

import ImmutablePureComponent from "../../../components/ImmutablePureComponent";
import {NavigationScreenProps, NavigationScreenState} from "../../../navigation/navigation_types";

import {DeckEditScreenStoreProps} from "./DeckEditScreen_redux";
import {DeckModel} from "../../../models";
import deckApi from "../../../api/DeckApi";
import mediaApi, {UploadingContent} from "../../../api/MediaApi";
import ToastStore, {toastStore} from "../../../store/toast/ToastStore";
import navigationStore from "../../../store/navigation/NavigationStore";
import {getErrorText} from "../../../utils/string";

export interface DeckEditScreenProps extends NavigationScreenProps<
    NavigationScreenState, { deckId: string }
> {}

export abstract class BaseDeckEditScreen<State>
extends ImmutablePureComponent<DeckEditScreenProps & DeckEditScreenStoreProps, State>
{
    toast = new ToastStore(this);
    getDeckSub?: Subscription;
    uploadContentSub?: Subscription;
    SaveDeckSub?: Subscription;

    componentWillUnmount() {
        this.toast.removeByRef();
        this.blockNavigation(false);

        this.getDeckSub?.unsubscribe();
        this.uploadContentSub?.unsubscribe();
        this.SaveDeckSub?.unsubscribe();
    }

    blockNavigation(value = true) {
        const ref = 'DeckEditScreen_Modified';
        if (value) {
            !navigationStore.has(ref) && navigationStore.block({
                ref, reason: "There are unsaved changes.", attemptCallback: this.onBlockedNavAttempt
            });
        } else {
            navigationStore.unblock(ref);
        }
    }

    abstract onBlockedNavAttempt: (reason: string) => void;

    /** Asynchronously get a Deck, either locally or remotely. */
    getDeck(deckId: DeckModel['id']): Observable<DeckModel> {
        const deck = this.props.decks[deckId];
        if (deck) return toObservable(deck);

        // Return a new Observable that only progresses while still subscribed.
        return new Observable<DeckModel>(observer => {
            this.getDeckSub?.unsubscribe();
            this.getDeckSub = deckApi.getById(deckId).subscribe(observer);
        });
    }

    /** Send content inside the deck to be uploaded */
    private uploadContent(deck: DeckModel): Observable<UploadingContent> {
        return new Observable(observer => {
            const request = mediaApi.uploadFromDeck(deck);

            // Return a new Observable that only progresses while still subscribed.
            this.uploadContentSub?.unsubscribe();
            this.uploadContentSub = request.subscribe(observer);

            // Separate toast subscription, which isn't unsubscribed from if component unmounts
            request.subscribe(
                data => {
                    if (data.contentList.length) {
                        toastStore.removeByRef();
                        toastStore.add({title: 'Media Upload', text: 'Complete', type: "success", duration: 1000})
                    }
                },
                error => toastStore.addError(error, 'Media Upload')
            );

        });
    }

    /** Send deck to the server */
    private pushDeck(deck: DeckModel): Observable<DeckModel> {
        return new Observable<DeckModel>(observer => {
            const request = deckApi.push(deck);

            // Return a new Observable that only progresses while still subscribed.
            this.SaveDeckSub?.unsubscribe();
            this.SaveDeckSub = request.subscribe(observer);

            // Separate toast subscription, which isn't unsubscribed from if component unmounts
            request.subscribe(
                undefined,
                error => toastStore.addError(error, 'Save Deck')
            );
        });
    }

    /** Send deck to the server, along with its contents */
    saveDeckAndContent(deck: DeckModel): Observable<SaveDeckProgress> {
        return new Observable(subscriber => {
            let progress: SaveDeckProgress = { deck, contentList: [], currentIndex: 0, contentUploaded: false, finished: false };

            // Upload the content, passing UploadingContent on to subscribers
            this.uploadContent(progress.deck).subscribe(
                next => subscriber.next(progress = {...progress, ...next}),
                error => {
                    subscriber.next(progress = {...progress, error: getErrorText(error)});
                    subscriber.error(error);
                },
                () => {
                    // Push the deck, with updated references from uploadContent().
                    subscriber.next(progress = {...progress, contentUploaded: true });
                    this.pushDeck(progress.deck).subscribe(
                        finalDeck => subscriber.next(progress = {...progress, deck: finalDeck}),
                        error => {
                            subscriber.next(progress = {...progress, error: getErrorText(error)});
                            subscriber.error(error);
                        },
                        () => {
                            subscriber.next(progress = {...progress, finished: true});
                            subscriber.complete();
                        }
                    );
                }
            );
        });
    }

}

export interface SaveDeckProgress extends UploadingContent {
    contentUploaded: boolean;
    finished: boolean;
    error?: string;
}
