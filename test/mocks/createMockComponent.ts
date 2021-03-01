import React from "react";
import {toKebabCase} from "../../src/utils/string";

/**
 * Create a mock component that has no implementation.
 * @param {string} name - Name of the component
 * @param {object} [options]
 * @param {string} [options.tag]       - DOM tag to give the component, otherwise kebab-case `name` is used.
 * @param {string} [options.tagPrefix] - Prefix to add to the tag.
 */
export function createMockComponent(name: string, options?: CreateMockComponentOptions) {
    options = options || {};
    let tag = options.tag || toKebabCase(name);
    if (options.tagPrefix) tag = options.tagPrefix + '-' + tag;

    const component: React.FunctionComponent = function MockComponent(props: object) {
        return React.createElement(tag, props);
    };
    component.displayName = name;

    return component;
}
export default createMockComponent;

export interface CreateMockComponentOptions {
    tag?: string;
    tagPrefix?: string;
}
