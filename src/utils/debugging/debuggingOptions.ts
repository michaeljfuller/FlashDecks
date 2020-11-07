import {LogColor} from "../logging/logColors";
import {isPlatformWeb} from "../../platform";

// Log CSS styles
export const defaultBackgroundColor: LogColor = isPlatformWeb ? null: null;
export const defaultPunctuationColor: LogColor = isPlatformWeb ? null : null;
export const defaultClassColor: LogColor = isPlatformWeb ? "Green" : "BrightGreen";
export const defaultMethodColor: LogColor = isPlatformWeb ? "Blue" : "Cyan";
export const defaultArgumentColor: LogColor = isPlatformWeb ? "Yellow" : "Yellow";
export const defaultInfoColor: LogColor = isPlatformWeb ? "BrightRed" : "BrightRed";
