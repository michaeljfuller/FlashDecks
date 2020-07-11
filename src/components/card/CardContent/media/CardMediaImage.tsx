import React, {useState} from "react";
import {Text, Image, StyleSheet, NativeSyntheticEvent, ImageErrorEventData} from "react-native";
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

    const onLoadEnd = () => {
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
    }
    const onError = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
        const message = 'Failed to load image.';
        console.warn('CardMediaImage', message, {uri, error: error.nativeEvent.error});
        setError(message);
    };

    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }

    return <Image
        source={{uri}}
        resizeMode="contain"
        onLoadEnd={!size && !error ? onLoadEnd : undefined}
        onError={onError}
        style={[styles.img, size]}
    />;
}

const styles = StyleSheet.create({
    img: {
        marginHorizontal: "auto"
    },
    error: {
        color: Color.White,
        backgroundColor: Color.Red,
        padding: 2,
    },
});
