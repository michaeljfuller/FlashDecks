import React from "react";
import {Button} from "../../../components/button/Button";
import TextButton from "../../../components/button/TextButton";
import IconButton, {IconType} from "../../../components/button/IconButton";
import Row from "../ui/TempScreenRow";
import TempScreenSubsection from "../ui/TempScreenSubsection";

export function TempScreenButtons() {
    const noop = React.useCallback(() => {}, []);

    return <TempScreenSubsection title="Buttons">
        <Row>
            <Button title="Button" onClick={noop} square />
            <TextButton title="TextButton" onClick={noop} color="Blue" />
            <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" text="Blue" />
            <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" />
            <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" flat />
            <IconButton icon={IconType.QuestionMark} onClick={noop} color="Blue" transparent />
        </Row>
        <Row borderColor='red' backgroundColor='#fee'>
            <Button title="Button" onClick={noop} color="Red" flat={true} square />
            <TextButton title="TextButton" onClick={noop} color="Red" />
            <IconButton icon={IconType.Home} onClick={noop} text="Red" color="Red" />
            <IconButton icon={IconType.Home} onClick={noop} text="Home" color="Red" transparent />
        </Row>
        <Row borderColor='green' backgroundColor='#efe'>
            <Button title="Button" onClick={noop} color="Green" square />
            <TextButton title="TextButton" onClick={noop} color="Green" />
            <IconButton icon={IconType.Menu} onClick={noop} text="Green" color="Green" />
            <IconButton icon={IconType.Menu} onClick={noop} text="Menu" color="Green" transparent />
        </Row>
        <Row borderColor='grey' backgroundColor='#eee'>
            <Button title="Disabled Button" square />
            <TextButton title="Disabled TextButton" onClick={noop} disabled={true} color="Grey" />
            <IconButton icon={IconType.QuestionMark} color="White" />
            <IconButton icon={IconType.QuestionMark} color="Black" transparent />
        </Row>
    </TempScreenSubsection>;
}
export default TempScreenButtons;
