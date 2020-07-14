import React, {useState, useCallback} from "react";
import {View, Text, Image, StyleSheet, NativeSyntheticEvent, ImageErrorEventData} from "react-native";
import {CardContentProps} from "../CardContent";
import {Color} from "../../../../styles/Color";
import {getImageSize, getCachedImageSize, ImageSize} from "../../../../utils/media/image";

export function CardMediaImage(props: CardContentProps) {
    const uri = props.content.value;
    const [size, setSize] = useState<ImageSize|undefined>(getCachedImageSize(uri));
    const [error, setError] = useState<string|undefined>();

    const onLoadEnd = useCallback(async () => {
        const size = await getImageSize(uri);
        if (size.error) {
            console.warn('CardMediaImage - Failed to measure image.', {uri, error: size.error});
            setError('Failed to measure image.');
        } else {
            setSize(size);
        }
    }, [uri]);

    const onError = useCallback((error: NativeSyntheticEvent<ImageErrorEventData>) => {
        const message = 'Failed to load image.';
        console.warn('CardMediaImage', message, {uri, error: error.nativeEvent.error});
        setError(message);
    }, [uri]);

    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }

    return <View style={styles.root}>
        <Image
            source={{uri}}
            resizeMode="contain"
            onLoadEnd={!size && !error ? onLoadEnd : undefined}
            onError={onError}
            style={size}
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
        padding: 2,
    },
});
