import React from "react";
import {View, Image, StyleSheet, NativeSyntheticEvent, ImageErrorEventData} from "react-native";
import {Color} from "../../../../styles/Color";
import {getImageSize, getCachedImageSize, ImageSize} from "../../../../utils/media/image";
import {CardMediaError} from "./CardMediaError";
import {CardContentModel} from "../../../../models";

export interface CardMediaImageProps {
    content: CardContentModel;
    height?: number;
}
export interface CardMediaImageState {
    imageSize?: ImageSize;
    error?: string;
}

export class CardMediaImage extends React.Component<CardMediaImageProps, CardMediaImageState> {
    state = {} as CardMediaImageState;

    get uri() {
        return this.props.content.value;
    }

    componentDidUpdate(prevProps: Readonly<CardMediaImageProps>/*, prevState: Readonly<CardMediaImageState>, snapshot?: any*/) {
        if (prevProps.content.value !== this.props.content.value) { // URI changed
            this.setState({
                imageSize: getCachedImageSize(this.props.content.value),
                error: undefined,
            });
        }
    }

    onLoadEnd = async () => {
        await this.measureImage();
    }

    onError = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
        const message = `Failed to load image.`;
        console.warn('CardMediaImage', message, { uri: this.uri, error: error.nativeEvent.error });
        this.setState({ error: message });
    }

    async measureImage() {
        const imageSize = await getImageSize(this.uri);
        if (imageSize.error) {
            console.warn('CardMediaImage - Failed to measure image.', { uri: this.uri, error: imageSize.error });
            this.setState({ error: 'Failed to measure image.' });
        } else {
            this.setState({ imageSize })
        }
    }

    render() {
        const {error, imageSize} = this.state;
        const height = this.props.height || imageSize?.height || undefined;

        if (error) {
            return <CardMediaError message={error} height={height} />;
        }
        return <View style={styles.root}>
            <Image
                source={{ uri: this.uri }}
                resizeMode="contain"
                onLoadEnd={!imageSize && !error ? this.onLoadEnd : undefined}
                onError={this.onError}
                style={{ width: '100%', height }}
                fadeDuration={0}
            />
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
});
