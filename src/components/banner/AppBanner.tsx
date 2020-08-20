import React from "react";
import {View, StyleSheet} from "react-native";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import {IconButton, IconType} from "../button/IconButton";
import Avatar from "../avatar/Avatar";

import AppBreadcrumbs from "./breadcrumbs/AppBreadcrumbs";
import {AppBannerProps} from "./AppBanner.common";
import {reduxConnector, AppBannerStoreProps} from "./AppBanner_redux";

export {AppBannerProps} from "./AppBanner.common";

export const AppBanner = React.memo(reduxConnector(function AppBanner(props: AppBannerProps & AppBannerStoreProps) {
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
                    <View style={styles.breadcrumbs}>
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
}));
export default AppBanner;

function HideOnScroll(props: { window?: () => Window; children: React.ReactElement }) {
    return <Slide appear={false} direction="down" in={!useScrollTrigger()}>{props.children}</Slide>;
}

const styles = StyleSheet.create({
    breadcrumbs: {
        flexGrow: 1,
    },
});
