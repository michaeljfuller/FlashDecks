import React, {SyntheticEvent} from "react";
import {View} from "react-native";
import {CardMediaVideoProps} from "./CardMediaVideo.common";
import {CardMediaError} from "./CardMediaError";

export interface CardMediaVideoState {
    error?: string;
}
export class CardMediaVideo extends React.Component<CardMediaVideoProps, CardMediaVideoState> {
    state = {} as CardMediaVideoState;

    componentDidUpdate(prevProps: Readonly<CardMediaVideoProps>/*, prevState: Readonly<CardMediaVideoState>, snapshot?: any*/) {
        if (prevProps.content.value !== this.props.content.value) { // URI changed
            this.setState({ error: undefined });
        }
    }

    onError = (error: SyntheticEvent<HTMLVideoElement, Event>) => {
        const message = `Failed to load video.`;
        console.warn(message, this.props.content.value, error);
        this.setState({ error: message });
    }

    render() {
        const {error} = this.state;
        const {content, height} = this.props;

        if (error) {
            return <CardMediaError message={error} height={height} />;
        }

        return <View>
            <video autoPlay loop muted controls
                   height={height}
                   key={content.value}
                   onError={this.onError}
            >
                <source src={content.value} type={"video/"+content.value.split('.').pop()} />
            </video>
        </View>;
    }
}
