import React, {useState, useCallback} from "react";
import {View, Image, StyleSheet, NativeSyntheticEvent, ImageErrorEventData} from "react-native";
import {Color} from "../../../../styles/Color";
import {getImageSize, getCachedImageSize, ImageSize} from "../../../../utils/media/image";
import {CardMediaError} from "./CardMediaError";
import {CardContentModel} from "../../../../models";

export interface CardMediaImageProps {
    content: CardContentModel;
    height?: number;
}

export function CardMediaImage(props: CardMediaImageProps) {
    const uri = props.content.value;
    const [imageSize, setImageSize] = useState<ImageSize|undefined>(getCachedImageSize(uri));
    const [error, setError] = useState<string|undefined>();
    const height = props.height || imageSize?.height || 0;

    const onLoadEnd = useCallback(async () => {
        const size = await getImageSize(uri);
        if (size.error) {
            console.warn('CardMediaImage - Failed to measure image.', {uri, error: size.error});
            setError('Failed to measure image.');
        } else {
            setImageSize(size);
        }
    }, [uri]);

    const onError = useCallback((error: NativeSyntheticEvent<ImageErrorEventData>) => {
        const message = 'Failed to load image.';
        console.warn('CardMediaImage', message, {uri, error: error.nativeEvent.error});
        setError(message);
    }, [uri]);

    if (error) {
        return <CardMediaError message={error} height={height} />;
    }

    return <View style={styles.root}>
        <Image
            source={{uri}}
            resizeMode="contain"
            onLoadEnd={!imageSize && !error ? onLoadEnd : undefined}
            onError={onError}
            style={{ width: '100%', height }}
            fadeDuration={0}
        />
    </View>;
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
