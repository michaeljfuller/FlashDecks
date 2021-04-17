import {
    usernameMinLength,
    passwordMinLength,
    securityCodeMinLength
} from "./authValidation.values";
export * from "./authValidation.values";

export interface AuthValidation {
    valid: boolean;
    reason: string;
}

/**
 * Return the first false AuthValidation result.
 * @param {AuthValidation[]} validation - The validation results to flatten.
 * @param {string|number} allValidReason - If all valid, use this string. If a number, use as index to get string from validation array.
 */
export function flattenValidation(validation: AuthValidation[], allValidReason: string|number = -1): AuthValidation {
    for (let i=0; i < validation.length; i++) {
        if (!validation[i].valid) return validation[i];
    }
    if (typeof allValidReason === "number") {
        const index = allValidReason >= 0 ? allValidReason : (validation.length - allValidReason);
        allValidReason = validation[index]?.reason;
    }
    return { valid: true, reason: allValidReason || '' };
}

export function validateUsername(username: string): AuthValidation {
    if (!username) return {
        valid: false,
        reason: `Username is required.`,
    };
    // https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_SignUp.html#CognitoUserPools-SignUp-request-Username
    // PCRE RegEx: [\p{L}\p{M}\p{S}\p{N}\p{P}]+
    // https://regex101.com/r/Gr27tw/1
    // * Any kind of letter from any language
    // * A character intended to be combined with another character (e.g. accents, umlauts, enclosing boxes, etc.)
    // * Any math symbols, currency signs, dingbats, box-drawing characters, etc
    // * Any kind of numeric character in any script
    // * Any kind of punctuation character
    if (username.match(/\s/)) return {
        valid: false,
        reason: `Username cannot contain spaces.`,
    };
    if (username.length < usernameMinLength) return {
        valid: false,
        reason: `Username must be at least ${usernameMinLength} characters.`,
    };
    return { valid: true, reason: 'Username valid.' };
}

export function validatePassword(password: string): AuthValidation {
    if (!password) return {
        valid: false,
        reason: `Password is required.`,
    };
    // https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_SignUp.html#CognitoUserPools-SignUp-request-Password
    // PCRE RegEx: [\S]+
    // * Any non-whitespace character
    if (password.match(/\s/)) return {
        valid: false,
        reason: `Password cannot contain spaces.`,
    };
    if (password.length < passwordMinLength) return {
        valid: false,
        reason: `Password must be at least ${passwordMinLength} characters.`,
    };
    return { valid: true, reason: 'Password valid.' };
}

export function validatePasswordConfirm(password: string, confirmPassword: string): AuthValidation {
    if (!confirmPassword) return {
        valid: false,
        reason: `Password must be confirmed.`,
    };
    if (password !== confirmPassword) return {
        valid: false,
        reason: `Password does not match confirmation.`,
    };
    return { valid: true, reason: 'Password matches.' };
}

export function validateEmail(email: string): AuthValidation {
    if (email.length === 0) return {
        valid: false,
        reason: `Email is required.`,
    };
    if (!isEmail(email)) return {
        valid: false,
        reason: `Email isn't valid.`,
    }
    return { valid: true, reason: 'Email valid.' };
}
/** @link https://stackoverflow.com/a/46181/15316701 */
function isEmail(email: string) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(email.toLowerCase());
}

export function validateEmailConfirm(email: string, confirmEmail: string): AuthValidation {
    if (!confirmEmail) return {
        valid: false,
        reason: `Email must be confirmed.`,
    };
    if (email !== confirmEmail) return {
        valid: false,
        reason: `Email does not match confirmation.`,
    };
    return { valid: true, reason: 'Email matches.' };
}

export function validateRegistrationCode(code: string): AuthValidation {
    if (!code) return {
        valid: false,
        reason: `Verification code is required.`,
    };
    if (code.length < securityCodeMinLength) return {
        valid: false,
        reason: `Verification code must be at least ${securityCodeMinLength} characters.`,
    };
    return { valid: true, reason: 'Verification code valid.' };
}

export function validateForgotPasswordCode(code: string): AuthValidation {
    if (!code) return {
        valid: false,
        reason: `Verification code is required.`,
    };
    if (code.length < securityCodeMinLength) return {
        valid: false,
        reason: `Verification code must be at least ${securityCodeMinLength} characters.`,
    };
    return { valid: true, reason: 'Verification code valid.' };
}
