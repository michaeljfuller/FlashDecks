import React from "react";
import {StyleSheet, Text} from "react-native";
import {Button, IconType} from "../../../components/button/Button";
import TextButton from "../../../components/button/TextButton";
import IconButton from "../../../components/button/IconButton";
import Row from "../../../components/layout/Row";
import TempScreenSubsection from "../ui/TempScreenSubsection";
import withDefaultProps from "../../../utils/hoc/withDefaultProps/withDefaultProps";
import LinkButton from "../../../components/button/LinkButton";

export function TempScreenButtons() {
    const noop = React.useCallback(() => {}, []);

    return <TempScreenSubsection title="Buttons">

        <TitleButton title="Button" />
        <ScrollRow>
            <Button onClick={noop} title="Standard" />
            <Button onClick={noop} title="Square"      square      color="Green" />
            <Button onClick={noop} title="Square"      square      color="Orange" />
            <Button onClick={noop} title="Square"      square      color="Red"    />
            <Button onClick={noop} title="Square Flat" square flat color="Black"  />
            <Button onClick={noop} title="Flat"        flat        color="Blue" />
            <Button onClick={noop} title="Inverted"    invertColor color="White" />
            <Button onClick={noop} title="Disabled"    disabled />
        </ScrollRow>

        <TitleButton title="Button (with icon)" icon={IconType.Info} />
        <ScrollRow>
            <Button onClick={noop} icon={IconType.Info} title="Standard" />
            <Button onClick={noop} icon={IconType.Info} title="Left"     color="Green"  iconPosition="left" />
            <Button onClick={noop} icon={IconType.Info} title="Right"    color="Orange" iconPosition="right" />
            <Button onClick={noop} icon={IconType.Info} title=""         color="Red" />
            <Button onClick={noop} icon={IconType.Info} title="Square"   color="Black" square />
            <Button onClick={noop} icon={IconType.Info} title=""         color="Grey"  square flat />
            <Button onClick={noop} icon={IconType.Info} title="Flat"     color="Blue"  flat />
            <Button onClick={noop} icon={IconType.Info} title="Inverted" color="White" invertColor />
            <Button onClick={noop} icon={IconType.Info} title="Disabled" disabled />
        </ScrollRow>

        <TitleButton title="Button (transparent)" transparent />
        <ScrollRow>
            <Button onClick={noop} transparent title="Standard" />
            <Button onClick={noop} transparent title="Square"      square      color="Green"  />
            <Button onClick={noop} transparent title="Square Flat" square flat color="Orange" />
            <Button onClick={noop} transparent title="Flat"        flat        color="Red"    />
            <Button onClick={noop} transparent title="Inverted"    invertColor color="White"  />
            <Button onClick={noop} transparent title="Disabled"    disabled />
        </ScrollRow>

        <TitleButton title="Button (transparent with icon)" transparent icon={IconType.Info} />
        <ScrollRow>
            <Button onClick={noop} transparent icon={IconType.Info} title="Standard" />
            <Button onClick={noop} transparent icon={IconType.Info} title="Left"   color="Green"  iconPosition="left" />
            <Button onClick={noop} transparent icon={IconType.Info} title="Right"  color="Orange" iconPosition="right" />
            <Button onClick={noop} transparent icon={IconType.Info} title=""       color="Red" />
            <Button onClick={noop} transparent icon={IconType.Info} title="Square" color="Black" square />
            <Button onClick={noop} transparent icon={IconType.Info} title=""       color="Grey"  square flat />
            <Button onClick={noop} transparent icon={IconType.Info} title="Flat"   color="Blue"  flat />
            <Button onClick={noop} transparent icon={IconType.Info} title="Inverted" color="White" invertColor />
            <Button onClick={noop} transparent icon={IconType.Info} title="Disabled" disabled />
        </ScrollRow>

        <LinkButton url="http://www.google.com" title="LinkButton" icon={IconType.Exit} iconPosition="right" square flat style={styles.titleButton} />
        <ScrollRow>
            <LinkButton url="http://www.google.com" />
            <LinkButton />
            <LinkButton url="http://www.google.com" title="Icon"        color="Green"  icon={IconType.Info} />
            <LinkButton url="http://www.google.com" title="Square"      color="Orange" square/>
            <LinkButton url="http://www.google.com" title="Flat"        color="Red"    flat />
            <LinkButton url="http://www.google.com" title="Inverted"    color="White"  invertColor />
            <LinkButton url="http://www.google.com" title="Disabled"    color="Blue"   disabled />
            <LinkButton url="http://www.google.com" title="Transparent" color="Black" transparent />
        </ScrollRow>

        <Text style={{
            fontSize: 20,
            margin: 20,
            color: 'red',
        }}>TODO: Replace other button types with Button using property overrides & omitting them.</Text>

        <Text>IconButton</Text>
        <ScrollRow>
            <Row style={styles.iconButtonWrapper}>
                <IconButton onClick={noop} icon={IconType.Info} />
                <IconButton onClick={noop} icon={IconType.Info} color="Green" />
                <IconButton onClick={noop} icon={IconType.Info} color="Orange" />
                <IconButton onClick={noop} icon={IconType.Info} color="Red" />
                <IconButton onClick={noop} icon={IconType.Info} color="Black" />
            </Row>
            <Row style={styles.iconButtonWrapper}>
                <IconButton onClick={noop} icon={IconType.Info} invertColor />
                <Text style={styles.iconLabel}>Inverted</Text>
            </Row>
            <Row style={styles.iconButtonWrapper}>
                <IconButton onClick={noop} icon={IconType.Info} flat />
                <Text style={styles.iconLabel}>Flat</Text>
            </Row>
            <Row style={styles.iconButtonWrapper}>
                <IconButton onClick={noop} icon={IconType.Info} transparent />
                <Text style={styles.iconLabel}>Transparent</Text>
            </Row>
            <Row style={styles.iconButtonWrapper}>
                <IconButton onClick={noop} icon={IconType.Info} disabled />
                <Text style={styles.iconLabel}>Disabled</Text>
            </Row>
        </ScrollRow>

        <Text>IconButton with text</Text>
        <ScrollRow>
            <IconButton onClick={noop} icon={IconType.Info} text="Text" />
            <IconButton onClick={noop} icon={IconType.Info} text="Inverted" invertColor color="Green" />
            <IconButton onClick={noop} icon={IconType.Info} text="Flat" flat color="Orange" />
            <IconButton onClick={noop} icon={IconType.Info} text="Transparent" transparent color="Red" />
            <IconButton onClick={noop} icon={IconType.Info} text="Disabled" disabled />
        </ScrollRow>

        <Text>TextButton</Text>
        <ScrollRow>
            <TextButton onClick={noop} title="Standard" />
            <TextButton onClick={noop} title="Red" color="Red" />
            <TextButton onClick={noop} title="Green" color="Green" />
            <TextButton onClick={noop} title="Inverted White" invertColor color="White" />
            <TextButton onClick={noop} title="Disabled" disabled />
        </ScrollRow>

    </TempScreenSubsection>;
}
export default TempScreenButtons;

const styles = StyleSheet.create({
    titleButton: {
        marginHorizontal: 2,
    },
    row: {
        borderWidth: 1,
        borderColor: "grey",
        marginHorizontal: 2,
        marginBottom: 10,
    },
    iconLabel: {
        paddingHorizontal: 2,
        lineHeight: 24,
    },
    iconButtonWrapper: {
        marginRight: 5,
    }
});

const TitleButton = withDefaultProps(Button, {
    flat: true,
    square: true,
    onClick: () => {},
    style: styles.titleButton,
});
const ScrollRow = withDefaultProps(Row, {
    scroll: true,
    style: styles.row,
});
