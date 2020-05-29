import React from "react";
import {Body, Header, Title, Left, Right} from 'native-base';
import {IconButton, IconType} from "../button/IconButton";
import {AppBannerProps} from "./AppBanner.common";
import AppBreadcrumbs from "./breadcrumbs/AppBreadcrumbs";
import {Color, DarkColor} from "../../styles/Color";

export {AppBannerProps} from "./AppBanner.common";

export function AppBanner(props: AppBannerProps) {
    const {loggedInUser, onToggleSidebar, onSignOutClick} = props;
    const {displayName = 'guest'} = loggedInUser || {};
    const onClickBack = () => props.navigation.goBack();
    const color = Color.White;
    const backgroundColor = DarkColor.Blue;

    return <Header androidStatusBarColor={backgroundColor} style={{ backgroundColor, paddingHorizontal: 15 }}>
        <Left style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            maxWidth: 70,
            paddingRight: 15
        }}>
            <IconButton transparent icon={IconType.Menu} onClick={onToggleSidebar} style={{ color }} />
            <IconButton transparent icon={IconType.Back} onClick={onClickBack} style={{ color }} />
        </Left>
        <AppBreadcrumbs navigation={props.navigation} />
        <Right>
            <Body><Title style={{ color, textAlign: 'right' }}>{displayName}</Title></Body>
            {loggedInUser && <IconButton transparent icon={IconType.Exit} onClick={onSignOutClick} style={{ color }} />}
        </Right>
    </Header>;
}
export default AppBanner;
