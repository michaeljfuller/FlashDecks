import React from "react";
import {View} from "react-native";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import {IconButton, IconType} from "../button/IconButton";

import AppBreadcrumbs from "./breadcrumbs/AppBreadcrumbs";
import {AppBannerProps} from "./AppBanner.common";
import Avatar from "../avatar/Avatar";

export {AppBannerProps} from "./AppBanner.common";

export function AppBanner(props: AppBannerProps) {
    const {
        loggedInUser, onToggleSidebar, onSignOutClick, routerDetails
    } = props;

    const signOutButton = loggedInUser && <IconButton
        text="Sign Out" icon={IconType.Exit} onClick={onSignOutClick} transparent color="White"
    />;
    // TODO signInButton signUpButton when not auth blocking whole AppRoot

    const bannerHeight = 36;
    const bannerSizeStyle = { maxHeight: bannerHeight, minHeight: bannerHeight, lineHeight: bannerHeight };

    return <div style={bannerSizeStyle}>
        <CssBaseline />
        <HideOnScroll>
            <AppBar style={bannerSizeStyle}>
                <Toolbar style={bannerSizeStyle}>

                    <IconButton icon={IconType.Menu} onClick={onToggleSidebar} transparent color="White" />
                    <View style={{ flexGrow: 1 }}>
                        <AppBreadcrumbs routerDetails={routerDetails} />
                    </View>
                    <Avatar
                        user={loggedInUser}
                        size={20}
                        label={loggedInUser ? loggedInUser.displayName : 'guest'}
                        labelPlacement="right"
                    />
                    {signOutButton}

                </Toolbar>
            </AppBar>
        </HideOnScroll>
    </div>;
}
export default AppBanner;

function HideOnScroll(props: { window?: () => Window; children: React.ReactElement }) {
    return <Slide appear={false} direction="down" in={!useScrollTrigger()}>{props.children}</Slide>;
}
