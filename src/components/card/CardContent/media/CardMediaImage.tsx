import React from "react";
import {View, Image, StyleSheet, NativeSyntheticEvent, ImageErrorEventData} from "react-native";
import {Subscription} from "rxjs";
import {Color} from "../../../../styles/Color";
import {getImageSize, getCachedImageSize, ImageSize} from "../../../../utils/media/image";
import {CardMediaError} from "./CardMediaError";
import ProgressCircle from "../../../progress/ProgressCircle";
import {Visibility} from "../../../layout/Visibility";
import Center from "../../../layout/Center";
import {BaseCardMedia, BaseCardMediaProps, BaseCardMediaState} from "./core/BaseCardMedia";

export interface CardMediaImageProps extends BaseCardMediaProps {
    height?: number;
}
export interface CardMediaImageState extends BaseCardMediaState {
    imageSize?: ImageSize;
}

export class CardMediaImage extends BaseCardMedia<CardMediaImageProps, CardMediaImageState> {

    private getImageSizeSub?: Subscription;
    componentWillUnmount() {
        super.componentWillUnmount();
        this.getImageSizeSub?.unsubscribe();
    }

    initMedia() {
        this.setStateTo(draft => draft.imageSize = getCachedImageSize(this.mediaKey));
        super.initMedia();
    }

    onLoadEnd = async () => {
        await this.measureImage();
    }

    onError = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
        const message = `Failed to load image.`;
        this.logger(this.onError).warning(message, { media: this.mediaKey, error: error.nativeEvent.error });
        this.setStateTo({ error: message });
    }

    async measureImage() {
        if (!this.mediaUri) {
            const error = 'No image to measure.';
            this.logger(this.measureImage).warning(error, { media: this.mediaKey });
            return this.setStateTo({ error });
        }

        this.getImageSizeSub?.unsubscribe();
        this.getImageSizeSub = getImageSize(this.mediaUri, this.mediaKey).subscribe(
            imageSize => {
                this.setStateTo(draft => draft.imageSize = imageSize);
            },
            error => {
                const msg = 'Failed to measure image';
                this.logger(this.measureImage).warning(msg, { media: this.mediaKey, error });
                this.setStateTo({ error: msg });
            },
        );
    }

    render() {
        const {error, imageSize} = this.state;
        const height = this.props.height || imageSize?.height || undefined;
        const imageReady = this.state.imageSize !== undefined;

        if (error) {
            return <CardMediaError message={error} height={height} />;
        }

        return <View style={[styles.root, { height }]}>
            {imageReady ? null : <Center><ProgressCircle /></Center>}
            <Visibility render={!!this.mediaUri} style={[styles.fullSize]}>
                <Image
                    source={{ uri: this.mediaUri }}
                    resizeMode="contain"
                    onLoadEnd={!imageSize && !error ? this.onLoadEnd : undefined}
                    onError={this.onError}
                    style={styles.fullSize}
                    fadeDuration={0}
                />
            </Visibility>
        </View>;
    }
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
    },
    error: {
        color: Color.White,
        backgroundColor: Color.Red,
        textAlign: "center",
    },
    fullSize: {
        width: '100%',
        height: '100%',
    }
});
