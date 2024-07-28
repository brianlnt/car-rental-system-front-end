export const isRequired = (input: string): boolean => {
    return input ? true : false;
};

export const isValidMaxlength = (
    input: string,
    maximumLength: number
): boolean => {
    if (input && input.length > maximumLength) {
        return false;
    }
    return true;
};

export const isValidEmail = (input: string): boolean => {
    return /\S+@\S+\.\S+/.test(input);
};

export const isValidPhoneNumber = (input: string): boolean => {
    return /^\[\d{3}\]-\d{3}-\d{4}$/.test(input);
};
