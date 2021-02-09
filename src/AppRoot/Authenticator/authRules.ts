export const usernameMinLength = 1;
export const passwordMinLength = 8;

export function validateUsername(username: string): { valid: boolean; reason?: string } {
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

export function validatePassword(password: string): { valid: boolean; reason?: string } {
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

export function validatePasswordConfirm(password: string, confirmPassword: string): { valid: boolean; reason?: string } {
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

export function validateEmail(email: string): { valid: boolean; reason?: string } {
    if (email.length === 0) return {
        valid: false,
        reason: `Email is required.`,
    };
    return { valid: true };
}

export function validateEmailConfirm(email: string, confirmEmail: string): { valid: boolean; reason?: string } {
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
