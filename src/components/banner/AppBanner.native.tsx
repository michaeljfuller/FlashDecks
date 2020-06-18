import React from "react";
import {Body, Header, Left, Right, Title} from 'native-base';
import {IconButton, IconType} from "../button/IconButton";
import {AppBannerProps} from "./AppBanner.common";
import {Color} from "../../styles/Color";
import AppBreadcrumbs from "./breadcrumbs/AppBreadcrumbs";
import Avatar from "../avatar/Avatar";

export {AppBannerProps} from "./AppBanner.common";

const color = Color.White;
const backgroundColor = Color.Blue;

export function AppBanner(props: AppBannerProps) {
    const {
        loggedInUser, onToggleSidebar, onSignOutClick, routerDetails
    } = props;

    return <Header androidStatusBarColor={backgroundColor} style={{ backgroundColor, paddingHorizontal: 15, height: 35 }}>
        <Left style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            maxWidth: 40,
            paddingRight: 15
        }}>
            <IconButton icon={IconType.Menu} onClick={onToggleSidebar} transparent color="White" />
        </Left>
        <AppBreadcrumbs routerDetails={routerDetails} />
        <Right>
            <AppBannerUserDisplay user={loggedInUser} onSignOutClick={onSignOutClick} />
        </Right>
    </Header>;
}
export default AppBanner;

interface AppBannerUserDisplayProps {
    user: User|null|undefined;
    onSignOutClick: () => void;
}
function AppBannerUserDisplay(props: AppBannerUserDisplayProps) {
    const {user, onSignOutClick} = props;
    if (user) {
        return <React.Fragment>
            <Body style={{ flexDirection: 'row' }}>
                <Title style={{ color, textAlign: 'right', marginRight: 5 }}>{user.displayName}</Title>
                <Avatar user={user} style={{ size:20 }} />
            </Body>
            <IconButton icon={IconType.Exit} onClick={onSignOutClick} transparent color="White" />
        </React.Fragment>;
    }
    return <React.Fragment>
        <Body style={{ flexDirection: 'row' }}>
            <Title style={{ color, textAlign: 'right', marginRight: 5 }}>Not logged in</Title>
        </Body>
    </React.Fragment>;
}
