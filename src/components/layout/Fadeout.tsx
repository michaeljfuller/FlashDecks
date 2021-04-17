import React from 'react';
import './Fadeout.css';

export interface FadeoutProps {
    maxHeight: number;
    fadeColor?: string;
    fadeHeight?: number|string;
}

/**
 * Component that adds a gradient to the bottom when the children exceed the passed `maxHeight`.
 */
export default class Fadeout extends React.Component<FadeoutProps, any>{
    readonly childrenRef = React.createRef<HTMLDivElement>();

    get showFadeout(): boolean {
        const {clientHeight, offsetHeight, scrollHeight} = this.childrenRef.current || {};
        const height = clientHeight || offsetHeight || scrollHeight || 0;
        return height > this.props.maxHeight;
    }

    render() {
        const {maxHeight, fadeColor, fadeHeight} = this.props;

        return <div className='fd-Fadeout-root' style={{ maxHeight }}>
            <div className='fd-Fadeout-children' ref={this.childrenRef}>
                {this.props.children}
            </div>
            {this.showFadeout && <div className='fd-Fadeout-cover' style={{
                backgroundImage: fadeColor ? `linear-gradient(to bottom, transparent, ${fadeColor})` : undefined,
                height: fadeHeight || undefined,
            }}/>}
        </div>;
    }
}
