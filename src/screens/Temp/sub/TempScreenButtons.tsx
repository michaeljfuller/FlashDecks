import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button, IconType} from "../../../components/button/Button";
import TextButton from "../../../components/button/TextButton";
import IconButton from "../../../components/button/IconButton";
import Row from "../../../components/layout/Row";
import TempScreenSubsection from "../ui/TempScreenSubsection";

export function TempScreenButtons() {
    const noop = React.useCallback(() => {}, []);

    return <TempScreenSubsection title="Buttons">
        <Text>Button</Text>
        <Row style={styles.row} scroll>
            <Button onClick={noop} title="Standard" />
            <Button onClick={noop} title="Square"       color="Green" square />
            <Button onClick={noop} icon={IconType.Info} color="Orange" iconPosition="left"  title="Icon" />
            <Button onClick={noop} icon={IconType.Info} color="Red"    iconPosition="right" title="Icon" />
            <Button onClick={noop} icon={IconType.Info} color="Black"  iconPosition="right" />
            <Button onClick={noop} title="Inverted" invertColor />
            <Button onClick={noop} title="Flat" flat />
            <Button onClick={noop} title="Disabled" disabled />
        </Row>

        <Text>IconButton</Text>
        <Row style={styles.row} scroll>
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
        </Row>

        <Text>IconButton with text</Text>
        <Row style={styles.row} scroll>
            <IconButton onClick={noop} icon={IconType.Info} text="Text" />
            <IconButton onClick={noop} icon={IconType.Info} text="Inverted" invertColor color="Green" />
            <IconButton onClick={noop} icon={IconType.Info} text="Flat" flat color="Orange" />
            <IconButton onClick={noop} icon={IconType.Info} text="Transparent" transparent color="Red" />
            <IconButton onClick={noop} icon={IconType.Info} text="Disabled" disabled />
        </Row>

        <Text>TextButton</Text>
        <Row style={styles.row} scroll>
            <TextButton onClick={noop} title="Standard" />
            <TextButton onClick={noop} title="Red" color="Red" />
            <TextButton onClick={noop} title="Green" color="Green" />
            <TextButton onClick={noop} title="Inverted White" invertColor color="White" />
            <TextButton onClick={noop} title="Disabled" disabled />
        </Row>

    </TempScreenSubsection>;
}
export default TempScreenButtons;

const styles = StyleSheet.create({
    row: {
        borderWidth: 1,
        borderColor: "grey",
        padding: 3,
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
