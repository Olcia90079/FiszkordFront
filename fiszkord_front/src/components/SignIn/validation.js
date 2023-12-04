export const validateSignInForm = ({ userEmail, userPassword }) => {
    const errors = {};

    if (!userEmail) {
        errors.userEmail = 'Please enter your email.';
    } else if (!isValidEmail(userEmail)) {
        errors.userEmail = 'Please enter a valid email address.';
    }

    if (!userPassword) {
        errors.userPassword = 'Please enter your password.';
    }

    return errors;
};

const isValidEmail = (email) => {
    // Very basic email validation, you may want to use a more robust library or regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
