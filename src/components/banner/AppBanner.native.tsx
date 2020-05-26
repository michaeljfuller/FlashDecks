import React from "react";
import {Text, View} from "react-native";

import TextButton from "../button/TextButton";
import {IconButton, IconType} from "../button/IconButton";

import AppBreadcrumbs from "./breadcrumbs/AppBreadcrumbs";
import {AppBannerProps} from "./AppBanner.common";
export {AppBannerProps} from "./AppBanner.common";

export function AppBanner(props: AppBannerProps) {
    const {loggedInUser, onToggleSidebar, onSignOutClick} = props;
    const {displayName = 'guest'} = loggedInUser || {};

    const signOutButton = loggedInUser && <TextButton title="Sign Out" onClick={onSignOutClick} />;
    // TODO signInButton signUpButton when not auth blocking whole AppRoot

    return <View>

        <IconButton icon={IconType.Menu} onClick={onToggleSidebar} />
        <View style={{ flexGrow: 1 }}>
            <AppBreadcrumbs navigation={props.navigation} />
        </View>
        <Text>User: ”{displayName}”</Text>
        {signOutButton}

    </View>;
}
export default AppBanner;
