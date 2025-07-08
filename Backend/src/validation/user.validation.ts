export const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isPasswordStrong = (password: string): boolean => {
    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    );
};

export const areFieldsValid = (name: unknown, email: unknown, password: unknown): boolean => {
    return (
        typeof name === 'string' &&
        typeof email === 'string' &&
        typeof password === 'string'
    );
};
export const isValidId = (id: unknown): boolean => {
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
};

