import React from "react";
import TextButton from "../../../components/button/TextButton";
import TempScreenSubsection from "../ui/TempScreenSubsection";

const TestContext = React.createContext('TestContext');

export function TempScreenContext() {
    const [value1, setValue1] = React.useState(0);
    const [value2, setValue2] = React.useState(0);

    const incValue1 = React.useCallback(() => setValue1(value1+1), [value1]);
    const incValue2 = React.useCallback(() => setValue2(value2+1), [value2]);

    return <TempScreenSubsection title="Context">
        <TestContext.Provider value={'TestContext1: '+value1}>
            <TestContext.Consumer>
                {value => <TextButton title={value} onClick={incValue1} />}
            </TestContext.Consumer>
            <TestContext.Provider value={'TestContext2: '+value2}>
                <TestContext.Consumer>
                    {value => <TextButton title={value} onClick={incValue2} />}
                </TestContext.Consumer>
            </TestContext.Provider>
        </TestContext.Provider>
    </TempScreenSubsection>;
}
export default TempScreenContext;
