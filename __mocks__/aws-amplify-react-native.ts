import React from "react";

export function Authenticator(props: object) {
    return React.createElement("aws-authenticator", props);
}

/**
 * A theme object containing empty styles.
 * @example
 *  const authenticatorTheme = {
 *    ...AmplifyTheme,
 *    button: {
 *      ...AmplifyTheme.button,
 *      backgroundColor: '#f90'
 *    },
 *  };
 */
export const AmplifyTheme = new Proxy({}, {
    get(/*target, name, proxy*/) {
        return {}; // Empty style object - e.g. { color: 'red' }
    }
});
