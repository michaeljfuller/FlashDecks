import {ComponentClass, ComponentType, ExoticComponent} from "react";
import PropTypes from "prop-types";

//<editor-fold desc="Components">

/** Any component type. */
export type ComponentUnion<Props extends {} = any> = (
    ComponentType<Props> | ExoticComponent<Props>
) & {
    propTypes?: PropTypesMap<Props>;
    displayName?: string;
}; // Add propTypes missing from ExoticComponent

//</editor-fold>
//<editor-fold desc="PropTypes">

/** The propTypes validation map for a component. */
export type PropTypesMap<Properties extends {}> = Record<keyof Properties, PropTypes.Validator<any>>;

//</editor-fold>
//<editor-fold desc="Properties/State">

/** Get properties from a component type. */
export type ComponentProps<
    Component extends ComponentUnion
> = Component extends ComponentUnion<infer Props> ? Props : null;

/** Get state from a component type. */
export type ComponentState<
    Component extends ComponentClass
> = Component extends ComponentClass<any, infer State> ? State : null;

//</editor-fold>
