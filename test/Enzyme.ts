import * as Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Configure Enzyme
export function configureEnzyme() {
    Enzyme.configure({adapter: new Adapter()});
}

// Export as a barrel
export * from "enzyme";
