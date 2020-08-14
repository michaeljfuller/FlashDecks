import React, {useCallback, useState} from 'react';

import {LinkButtonProps, linkButtonPropsWithDefaults} from './LinkButton.common';
import Button from './Button';
import {LinkModal} from "../modal/LinkModal/LinkModal";
export * from './LinkButton.common';

/**
 * A button for opening links
 */
export function LinkButton(props: LinkButtonProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const { title, url, disabled, color, invertColor, square, flat, style, width, height } = linkButtonPropsWithDefaults(props);

    const openModal = useCallback(() => setModalOpen(true), []);
    const closeModal = useCallback(() => setModalOpen(false), []);

    return <React.Fragment>
        <Button
            title={title}
            onClick={openModal}
            disabled={disabled}
            style={style}
            width={width}
            height={height}
            color={color}
            invertColor={invertColor}
            flat={flat}
            square={square}
        />
        <LinkModal url={url} open={modalOpen} onClose={closeModal} />
    </React.Fragment>;
}
export default LinkButton;
