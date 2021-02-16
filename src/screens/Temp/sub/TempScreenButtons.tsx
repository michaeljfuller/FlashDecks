import React from "react";
import {StyleSheet, Text} from "react-native";
import {Button, IconType} from "../../../components/button/Button";
import TextButton from "../../../components/button/TextButton";
import IconButton, {IconButtonProps} from "../../../components/button/IconButton";
import Row from "../../../components/layout/Row";
import TempScreenSubsection from "../ui/TempScreenSubsection";
import withDefaultProps from "../../../utils/hoc/withDefaultProps/withDefaultProps";
import LinkButton from "../../../components/button/LinkButton";
import Column from "../../../components/layout/Column";

export function TempScreenButtons() {
    const [clicks1, setClicks1] = React.useState(0);
    const [clicks2, setClicks2] = React.useState(0);
    const [clicks3, setClicks3] = React.useState(0);
    const [clicks4, setClicks4] = React.useState(0);
    const [clicks5, setClicks5] = React.useState(0);
    const [clicks6, setClicks6] = React.useState(0);
    const [clicks7, setClicks7] = React.useState(0);

    const incClicks1 = React.useCallback(() => setClicks1(clicks1 + 1), [clicks1]);
    const incClicks2 = React.useCallback(() => setClicks2(clicks2 + 1), [clicks2]);
    const incClicks3 = React.useCallback(() => setClicks3(clicks3 + 1), [clicks3]);
    const incClicks4 = React.useCallback(() => setClicks4(clicks4 + 1), [clicks4]);
    const incClicks5 = React.useCallback(() => setClicks5(clicks5 + 1), [clicks5]);
    const incClicks6 = React.useCallback(() => setClicks6(clicks6 + 1), [clicks6]);
    const incClicks7 = React.useCallback(() => setClicks7(clicks7 + 1), [clicks7]);

    return <TempScreenSubsection title="Buttons">

        <TitleButton title={`Button [${clicks1}]`} onClick={incClicks1} />
        <ScrollRow>
            <Button onClick={incClicks1} title="Standard" />
            <Button onClick={incClicks1} title="Square"      square      color="Green" />
            <Button onClick={incClicks1} title="Square"      square      color="Orange" />
            <Button onClick={incClicks1} title="Square"      square      color="Red"    />
            <Button onClick={incClicks1} title="Square Flat" square flat color="Black"  />
            <Button onClick={incClicks1} title="Flat"        flat        color="Blue" />
            <Button onClick={incClicks1} title="Inverted"    invertColor color="White" />
            <Button onClick={incClicks1} title="Disabled"    disabled />
        </ScrollRow>

        <TitleButton title={`Button (with icon) [${clicks2}]`} icon={IconType.Info} onClick={incClicks2} />
        <ScrollRow>
            <Button onClick={incClicks2} icon={IconType.Info} title="Standard" />
            <Button onClick={incClicks2} icon={IconType.Info} title="Left"     color="Green"  iconPosition="left" />
            <Button onClick={incClicks2} icon={IconType.Info} title="Right"    color="Orange" iconPosition="right" />
            <Button onClick={incClicks2} icon={IconType.Info} title=""         color="Red" />
            <Button onClick={incClicks2} icon={IconType.Info} title="Square"   color="Black" square />
            <Button onClick={incClicks2} icon={IconType.Info} title=""         color="Grey"  square flat />
            <Button onClick={incClicks2} icon={IconType.Info} title="Flat"     color="Blue"  flat />
            <Button onClick={incClicks2} icon={IconType.Info} title="Inverted" color="White" invertColor />
            <Button onClick={incClicks2} icon={IconType.Info} title="Disabled" disabled />
        </ScrollRow>

        <TitleButton title={`Button (transparent) [${clicks3}]`} transparent onClick={incClicks3} />
        <ScrollRow>
            <Button onClick={incClicks3} transparent title="Standard" />
            <Button onClick={incClicks3} transparent title="Square"      square      color="Green"  />
            <Button onClick={incClicks3} transparent title="Square Flat" square flat color="Orange" />
            <Button onClick={incClicks3} transparent title="Flat"        flat        color="Red"    />
            <Button onClick={incClicks3} transparent title="Inverted"    invertColor color="White"  />
            <Button onClick={incClicks3} transparent title="Disabled"    disabled />
        </ScrollRow>

        <TitleButton title={`Button (transparent with icon) [${clicks4}]`} transparent icon={IconType.Info} onClick={incClicks4} />
        <ScrollRow>
            <Button onClick={incClicks4} transparent icon={IconType.Info} title="Standard" />
            <Button onClick={incClicks4} transparent icon={IconType.Info} title="Left"   color="Green"  iconPosition="left" />
            <Button onClick={incClicks4} transparent icon={IconType.Info} title="Right"  color="Orange" iconPosition="right" />
            <Button onClick={incClicks4} transparent icon={IconType.Info} title=""       color="Red" />
            <Button onClick={incClicks4} transparent icon={IconType.Info} title="Square" color="Black" square />
            <Button onClick={incClicks4} transparent icon={IconType.Info} title=""       color="Grey"  square flat />
            <Button onClick={incClicks4} transparent icon={IconType.Info} title="Flat"   color="Blue"  flat />
            <Button onClick={incClicks4} transparent icon={IconType.Info} title="Inverted" color="White" invertColor />
            <Button onClick={incClicks4} transparent icon={IconType.Info} title="Disabled" disabled />
        </ScrollRow>

        <Row center><TitleButton title={`Button (set size) [${clicks5}]`} width={200} height={20} onClick={incClicks5} /></Row>
        <ScrollRow>
            <Button onClick={incClicks5} icon={IconType.Info} height={24} width={24} />
            <Button onClick={incClicks5} icon={IconType.Exit} height={24} width={24} square />
            <Button onClick={incClicks5} icon={IconType.Exit} height={24} />
            <Button onClick={incClicks5} icon={IconType.Info} height={24} title="Hello World" />
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
            <IconButton onClick={incClicks6} icon={IconType.Info} />
            <Text style={{marginLeft:2, fontWeight: "bold"}}>IconButton [{clicks6}]</Text>
        </Row>
        <ScrollRow>
            <LabelledIconButton onClick={incClicks6} label="Standard"    icon={IconType.Info} />
            <LabelledIconButton onClick={incClicks6} label="Square"      icon={IconType.Info} color="Green"  square />
            <LabelledIconButton onClick={incClicks6} label="Flat"        icon={IconType.Info} color="Orange"  flat />
            <LabelledIconButton onClick={incClicks6} label="Inverted"    icon={IconType.Info} color="Red"  invertColor />
            <LabelledIconButton onClick={incClicks6} label="Transparent" icon={IconType.Info} color="Black" transparent />
            <LabelledIconButton onClick={incClicks6} label="Disabled"    icon={IconType.Info} color="Blue" disabled />
            <LabelledIconButton onClick={incClicks6} label="No Icon" />
        </ScrollRow>

        <TextButton onClick={incClicks7} title={`TextButton [${clicks7}]`} style={styles.titleButton} />
        <ScrollRow>
            <TextButton onClick={incClicks7} title="Standard" />
            <Column center><TextButton onClick={incClicks7} title="120x20" color="Green" width={120} height={20} /></Column>
            <TextButton onClick={incClicks7} title="Disabled" color="Red" disabled />
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

interface LabelledIconButtonProps extends IconButtonProps {
    label: string;
}
function LabelledIconButton(props: LabelledIconButtonProps) {
    const {label, ...iconButtonProps} = props;
    return <Row style={styles.labelledView}>
        <Text style={styles.labelledViewText}>{label}</Text>
        <IconButton {...iconButtonProps} />
    </Row>;
}
