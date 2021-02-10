export const usernameMinLength = 1;
export const passwordMinLength = 8;
export const securityCodeMinLength = 6;

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
    return { valid: true, reason: 'Email valid.' };
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
