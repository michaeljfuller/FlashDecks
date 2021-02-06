import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button, IconType} from "../../../components/button/Button";
import TextButton from "../../../components/button/TextButton";
import IconButton, {IconButtonProps} from "../../../components/button/IconButton";
import Row from "../../../components/layout/Row";
import TempScreenSubsection from "../ui/TempScreenSubsection";
import withDefaultProps from "../../../utils/hoc/withDefaultProps/withDefaultProps";
import LinkButton from "../../../components/button/LinkButton";
import Column from "../../../components/layout/Column";

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

        <Row center><TitleButton title="Button (set size)" width={150} height={20} /></Row>
        <ScrollRow>
            <Button onClick={noop} icon={IconType.Info} height={24} width={24} />
            <Button onClick={noop} icon={IconType.Exit} height={24} width={24} square />
            <Button onClick={noop} icon={IconType.Exit} height={24} />
            <Button onClick={noop} icon={IconType.Info} height={24} title="Hello World" />
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
            <LinkButton url="http://www.google.com" title="Transparent" color="Black"  transparent />
        </ScrollRow>

        <Row center style={{marginBottom: 2}}>
            <IconButton onClick={noop} icon={IconType.Info} />
            <Text style={{marginLeft:2, fontWeight: "bold"}}>IconButton</Text>
        </Row>
        <ScrollRow>
            <LabelledIconButton label="Standard"    icon={IconType.Info} />
            <LabelledIconButton label="Square"      icon={IconType.Info} color="Green"  square />
            <LabelledIconButton label="Flat"        icon={IconType.Info} color="Orange"  flat />
            <LabelledIconButton label="Inverted"    icon={IconType.Info} color="Red"  invertColor />
            <LabelledIconButton label="Transparent" icon={IconType.Info} color="Black" transparent />
            <LabelledIconButton label="Disabled"    icon={IconType.Info} color="Blue" disabled />
            <LabelledIconButton label="No Icon" />
        </ScrollRow>

        <TextButton onClick={noop} title="TextButton" style={styles.titleButton} />
        <ScrollRow>
            <TextButton onClick={noop} title="Standard" />
            <Column center><TextButton onClick={noop} title="120x20" color="Green" width={120} height={20} /></Column>
            <TextButton onClick={noop} title="Disabled" color="Red" disabled />
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
    },
    labelledView: {
        paddingHorizontal: 5,
    },
    labelledViewText: {
        lineHeight: 24,
        marginRight: 2,
    },
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

interface LabelledIconButtonProps extends Omit<IconButtonProps, 'onClick'> {
    label: string;
}
function LabelledIconButton(props: LabelledIconButtonProps) {
    const {label, ...iconButtonProps} = props;
    return <Row style={styles.labelledView}>
        <Text style={styles.labelledViewText}>{label}</Text>
        <IconButton onClick={() => {}} {...iconButtonProps} />
    </Row>;
}
