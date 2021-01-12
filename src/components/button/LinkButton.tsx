import React, {useCallback, useState} from 'react';

import {LinkButtonProps, linkButtonPropsWithDefaults} from './LinkButton.common';
import Button from './Button';
import {LinkModal} from "../modal/LinkModal/LinkModal";

export * from './LinkButton.common';

/**
 * A button for opening external links, with a confirmation modal.
 */
export const LinkButton = React.memo(function LinkButton(props: LinkButtonProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const {url, ...buttonProps} = linkButtonPropsWithDefaults(props);

    const openModal = useCallback(() => setModalOpen(true), []);
    const closeModal = useCallback(() => setModalOpen(false), []);

    return <React.Fragment>
        <Button {...buttonProps} onClick={openModal} />
        <LinkModal url={url} open={modalOpen} onClose={closeModal} />
    </React.Fragment>;
});
export default LinkButton;
