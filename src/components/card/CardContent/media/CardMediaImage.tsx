import React from "react";
import {View, Image, StyleSheet, NativeSyntheticEvent, ImageErrorEventData} from "react-native";
import ImmutablePureComponent from "../../../ImmutablePureComponent";
import {Color} from "../../../../styles/Color";
import {getImageSize, getCachedImageSize, ImageSize} from "../../../../utils/media/image";
import {CardMediaError} from "./CardMediaError";
import {CardContentModel} from "../../../../models";
import mediaApi from "../../../../api/MediaApi";
import {errorToString} from "../../../../utils/error";
import logger from "../../../../utils/Logger";
import ProgressCircle from "../../../progress/ProgressCircle";
import {Visibility} from "../../../layout/Visibility";
import Center from "../../../layout/Center";
import ApiRequest from "../../../../api/util/ApiRequest";

export interface CardMediaImageProps {
    content: CardContentModel;
    height?: number;
}
export interface CardMediaImageState {
    imageUrl?: string;
    imageSize?: ImageSize;
    error?: string;
    fetching?: boolean;
}

export class CardMediaImage extends ImmutablePureComponent<CardMediaImageProps, CardMediaImageState> {
    readonly state = {} as Readonly<CardMediaImageState>;
    private unmounted = false;

    private fetchMediaUrlRequest?: ApiRequest<string>;

    get imageUri() {
        return this.valueIsS3Key ? this.state.imageUrl : this.props.content.value;
    }
    get imageKey() {
        return this.props.content.value;
    }
    get valueIsS3Key() {
        return this.props.content.format === "S3Key";
    }

    private logger(method: Function) {
        return logger.addLogRef(this).space.addMethod(method).space;
    }

    componentDidMount() {
        this.initMedia();
    }
    componentWillUnmount() {
        this.fetchMediaUrlRequest?.drop();
        this.unmounted = true;
    }

    componentDidUpdate(prevProps: Readonly<CardMediaImageProps>/*, prevState: Readonly<CardMediaImageState>/*, snapshot?: any*/) {
        const {content} = this.props;
        if (prevProps.content.value !== content.value) { // URI changed

            this.logger(this.componentDidUpdate).log();
            this.setStateTo(draft => {
                draft.imageUrl = undefined;
                draft.imageSize = getCachedImageSize(this.imageKey);
                draft.error = undefined;
            });
            this.initMedia();
        }
    }

    initMedia() {
        // this.logger(this.initMedia).info(this.props.content.format, this.props.content);

        if (this.props.content.format === "S3Key") {
            this.fetchMediaUrl(this.props.content.value);
        }
    }

    fetchMediaUrl(key: string) {
        this.logger(this.fetchMediaUrl).green.log(key);
        this.setStateTo({ fetching: true });

        this.fetchMediaUrlRequest?.drop();
        this.fetchMediaUrlRequest = mediaApi.fetchMediaUrl(key);
        this.fetchMediaUrlRequest.wait(false).then(
            request => {
                this.logger(this.fetchMediaUrl).green.log('then', key);
                this.setStateTo({ imageUrl: request.payload })
            }
        ).catch(
            error => {
                this.logger(this.fetchMediaUrl).green.log('catch', key);
                this.setStateTo({ error: errorToString(error) })
            }
        ).finally(
            () => {
                this.logger(this.fetchMediaUrl).green.log('finally', key);
                this.setStateTo({ fetching: false })
            }
        );
    }

    onLoadEnd = async () => {
        if (this.unmounted) return;
        await this.measureImage();
    }

    onError = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
        if (this.unmounted) return;
        const message = `Failed to load image.`;
        this.logger(this.onError).warning(message, { uri: this.imageKey, error: error.nativeEvent.error });
        this.setStateTo({ error: message });
    }

    async measureImage() {
        if (!this.imageUri) {
            const error = 'No image to measure.';
            this.logger(this.measureImage).warning(error, { uri: this.imageKey });
            return this.setStateTo({ error });
        }
        const imageSize = await getImageSize(this.imageUri, this.imageKey);
        if (this.unmounted) return; // TODO replace with dropping promise

        if (imageSize.error) {
            const error = 'Failed to measure image';
            this.logger(this.measureImage).warning(error, { uri: this.imageKey, error: imageSize.error });
            this.setStateTo({ error });
        } else {
            this.logger(this.measureImage).log(imageSize);
            this.setStateTo(draft => draft.imageSize = imageSize);
        }
    }

    render() {
        const {error, imageSize} = this.state;
        const height = this.props.height || imageSize?.height || undefined;
        const imageReady = this.state.imageSize !== undefined;

        if (error) {
            return <CardMediaError message={error+' '+this.imageUri} height={height} />;
        }

        return <View style={[styles.root, { height }]}>
            {imageReady ? null : <Center><ProgressCircle /></Center>}
            <Visibility render={!!this.imageUri} style={[styles.fullSize]}>
                <Image
                    source={{ uri: this.imageUri }}
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
