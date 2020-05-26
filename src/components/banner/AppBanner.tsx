import React from "react";
import {StyleSheet, Text, View} from "react-native";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import TextButton from "../button/TextButton";
import {IconButton, IconType} from "../button/IconButton";

import {AppBannerProps} from "./AppBanner.common";
import AppBreadcrumbs from "./breadcrumbs/AppBreadcrumbs";
export {AppBannerProps} from "./AppBanner.common";

export function AppBanner(props: AppBannerProps) {
    const {loggedInUser, onToggleSidebar, onSignOutClick} = props;
    const {displayName = 'guest'} = loggedInUser || {};

    const signOutButton = loggedInUser && <TextButton title="Sign Out" onClick={onSignOutClick} />;
    // TODO signInButton signUpButton when not auth blocking whole AppRoot

    const bannerHeight = 36;
    const bannerSizeStyle = { maxHeight: bannerHeight, minHeight: bannerHeight, lineHeight: bannerHeight };

    return <div style={bannerSizeStyle}>
        <CssBaseline />
        <HideOnScroll>
            <AppBar style={bannerSizeStyle}>
                <Toolbar style={bannerSizeStyle}>

                    <IconButton icon={IconType.Menu} onClick={onToggleSidebar} />
                    <View style={{ flexGrow: 1 }}>
                        <AppBreadcrumbs navigation={props.navigation} />
                    </View>
                    <Text style={styles.bannerText}>User: ”{displayName}”</Text>
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

const styles = StyleSheet.create({
    bannerText: {
        color: 'white',
        marginLeft: 5,
        paddingRight: 5
    }
});
