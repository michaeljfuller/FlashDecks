import createMockComponent from "./createMockComponent";

/**
 * Returns an object that can be assigned as `module.exports`, where any property is treated as a mock component.
 * @param {string} defaultName - Name to give to the component used for the module default.
 * @param {string} [tagPrefix] - Prefix given to DOM tags to prevent clashes.
 * @param {object} [moduleOverrides] - Known items you want to define, such as those that are not components.
 * @example
 *  const createMockComponentModule = require("../../../test/mocks/createMockComponentModule");
 *  module.exports = createMockComponentModule("Button");
 */
module.exports = function createMockComponentModule(
    defaultName: string,
    tagPrefix?: string,
    moduleOverrides?: Record<string, any>
) {
    return new Proxy(moduleOverrides || {}, {

        // When trying to access a property:
        get: (target, name: string) => {
            // Return original if defined.
            if (Object.prototype.hasOwnProperty.call(target, name)) {
                return target[name];
            }
            // Otherwise, return a mock component.
            return createMockComponent(
                name === 'default' ? defaultName : name,
                { tagPrefix }
            );
        }

    });
};
