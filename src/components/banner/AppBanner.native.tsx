import React from "react";
import {Body, Header, Left, Right, Title} from 'native-base';
import {IconButton, IconType} from "../button/IconButton";
import {AppBannerProps} from "./AppBanner.common";
import AppBreadcrumbs from "./breadcrumbs/AppBreadcrumbs";
import {Color} from "../../styles/Color";

export {AppBannerProps} from "./AppBanner.common";

export function AppBanner(props: AppBannerProps) {
    const {loggedInUser, onToggleSidebar, onSignOutClick} = props;
    const {displayName = 'guest'} = loggedInUser || {};
    const onClickBack = () => props.navigation.goBack();
    const color = Color.White;
    const backgroundColor = Color.Blue;

    return <Header androidStatusBarColor={backgroundColor} style={{ backgroundColor, paddingHorizontal: 15 }}>
        <Left style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            maxWidth: 70,
            paddingRight: 15
        }}>
            <IconButton icon={IconType.Menu} onClick={onToggleSidebar} transparent color="White" />
            <IconButton icon={IconType.Back} onClick={onClickBack} transparent color="White" />
        </Left>
        <AppBreadcrumbs navigation={props.navigation} />
        <Right>
            <Body><Title style={{ color, textAlign: 'right' }}>{displayName}</Title></Body>
            {loggedInUser && <IconButton icon={IconType.Exit} onClick={onSignOutClick} transparent color="White" />}
        </Right>
    </Header>;
}
export default AppBanner;
