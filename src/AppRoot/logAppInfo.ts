import logger from "../utils/Logger";
import {envName} from "../env";
import {deviceName, platformOS} from "../platform";
import {appName, version} from "../appDetails";

/**
 * Log out app details.
 * @example
 *  ------------------------
 *  Name: FlashDecks
 *  Version: 1.0.0
 *  Environment: development
 *  Platform: web
 *  Device: Chrome
 *  ------------------------
 */
export function logAppInfo() {
    let lines = [
        `Name: ${appName}`,
        `Version: ${version}`,
        `Environment: ${envName}`,
        `Platform: ${platformOS}`,
        `Device: ${deviceName}`,
    ];

    const maxLength = lines.reduce<number>(
        (currentMaxLength, currentLine) => Math.max(currentLine.length, currentMaxLength), 0
    );

    lines = lines.map(line => `| ${line}${' '.repeat(maxLength-line.length)} |`);
    const horizontalLine = '+-' + '-'.repeat(maxLength) + '-+';
    lines = [horizontalLine, ...lines, horizontalLine];

    logger.bgBlue.brightWhite.log( lines.join('\n') );
}
