import React from "react";

/**
 * Mock ProgressBar element not using react's "Animated" module.
 * Fixes: Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`
 * @exmaple <progress-bar color="#46F" determinate={false} value={0} visible={true} />
 */
export function ProgressBar(props: object) {
    return React.createElement("progress-bar", props);
}
