import React from "react";
import {StyleSheet, Text, View} from "react-native";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import {IconButton, IconType} from "../button/IconButton";

import AppBreadcrumbs from "./breadcrumbs/AppBreadcrumbs";
import {AppBannerProps} from "./AppBanner.common";
import {LightColor} from "../../styles/Color";

export {AppBannerProps} from "./AppBanner.common";

export function AppBanner(props: AppBannerProps) {
    const {loggedInUser, onToggleSidebar, onSignOutClick} = props;
    const {displayName = 'guest'} = loggedInUser || {};

    const signOutButton = loggedInUser && <IconButton transparent text="Sign Out" icon={IconType.Exit} onClick={onSignOutClick} style={{
        color: LightColor.White
    }} />;
    // TODO signInButton signUpButton when not auth blocking whole AppRoot

    const bannerHeight = 36;
    const bannerSizeStyle = { maxHeight: bannerHeight, minHeight: bannerHeight, lineHeight: bannerHeight };

    return <div style={bannerSizeStyle}>
        <CssBaseline />
        <HideOnScroll>
            <AppBar style={bannerSizeStyle}>
                <Toolbar style={bannerSizeStyle}>

                    <IconButton transparent icon={IconType.Menu} onClick={onToggleSidebar} />
                    <View style={{ flexGrow: 1 }}>
                        <AppBreadcrumbs navigation={props.navigation} />
                    </View>
                    <Text style={[styles.bannerText, { marginRight: 15 }]}>User: ”{displayName}”</Text>
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
