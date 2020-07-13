import React, {useState, useCallback} from "react";
import {View, Text, Image, StyleSheet, NativeSyntheticEvent, ImageErrorEventData} from "react-native";
import {CardContentProps} from "../CardContent";
import {Color} from "../../../../styles/Color";

interface ImageSize {
    width: number;
    height: number;
}

export function CardMediaImage(props: CardContentProps) {
    const uri = props.content.value;
    const [size, setSize] = useState<ImageSize|null>(null);
    const [error, setError] = useState<string|undefined>();

    const onLoadEnd = useCallback(() => {
        Image.getSize(uri,
            (width, height) => setSize({width, height}),
            (error: any) => {
                if (error) {
                    const message = 'Failed to measure image.';
                    console.warn('CardMediaImage', message, {uri, error});
                    setError(error);
                }
            }
        );
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
