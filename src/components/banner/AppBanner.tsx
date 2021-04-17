import React from "react";
import {View, StyleSheet} from "react-native";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import Button, {IconType} from "../button/Button";
import IconButton from "../button/IconButton";
import Avatar from "../avatar/Avatar";

import AppBreadcrumbs from "./breadcrumbs/AppBreadcrumbs";
import {AppBannerProps} from "./AppBanner.common";
import {reduxConnector, AppBannerStoreProps} from "./AppBanner_redux";

export {AppBannerProps} from "./AppBanner.common";

export const TestIDs = {
    Root: "AppBanner-Root",
    SidebarButton: "AppBanner-SidebarButton",
    Breadcrumbs: "AppBanner-Breadcrumbs",
    SignOut: "AppBanner-SignOut",
}

export const AppBanner: React.FunctionComponent<AppBannerProps> = React.memo(reduxConnector(function AppBanner(
    props: AppBannerProps & AppBannerStoreProps
) {
    const {
        loggedInUser, onToggleSidebar, onSignOutClick, routerDetails
    } = props;

    const bannerHeight = 36;
    const bannerSizeStyle = { maxHeight: bannerHeight, minHeight: bannerHeight, lineHeight: bannerHeight };

    return <div data-testid={TestIDs.Root} style={bannerSizeStyle}>
        <CssBaseline />
        <HideOnScroll>
            <AppBar style={bannerSizeStyle}>
                <Toolbar style={bannerSizeStyle}>

                    <IconButton testID={TestIDs.SidebarButton}
                        icon={IconType.Menu} onClick={onToggleSidebar} transparent square color="White"
                    />
                    <View style={styles.breadcrumbs}>
                        <AppBreadcrumbs testID={TestIDs.Breadcrumbs} routerDetails={routerDetails} />
                    </View>
                    <Avatar
                        user={loggedInUser}
                        size={20}
                        label={loggedInUser ? loggedInUser.displayName : 'guest'}
                        labelPlacement="right"
                    />
                    <Button
                        testID={TestIDs.SignOut}
                        title="Sign Out" icon={IconType.Exit} onClick={onSignOutClick}
                        style={styles.signOut} transparent square color="White"
                    />

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
    signOut: {
        marginLeft: 4,
    },
});
