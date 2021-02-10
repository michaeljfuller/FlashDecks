export const usernameMinLength = 1;
export const passwordMinLength = 8;

export interface AuthValidation {
    valid: boolean;
    reason?: string;
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
    return { valid: true };
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
    return { valid: true };
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
    return { valid: true };
}

export function validateEmail(email: string): AuthValidation {
    if (email.length === 0) return {
        valid: false,
        reason: `Email is required.`,
    };
    return { valid: true };
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
    return { valid: true };
}

export function validateForgotPasswordCode(code: string): AuthValidation {
    if (!code) return {
        valid: false,
        reason: `Code is required.`,
    };
    return { valid: true };
}
