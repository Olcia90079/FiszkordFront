export const validateSignUpForm = ({ firstName, lastName, userEmail, userPassword }) => {
    const errors = {};

    if (!firstName.trim()) {
        errors.firstName = 'Please enter your first name.';
    } else if (firstName.length > 30) {
        errors.firstName = 'First name should not exceed 30 characters.';
    }

    if (!lastName.trim()) {
        errors.lastName = 'Please enter your last name.';
    } else if (lastName.length > 30) {
        errors.lastName = 'Last name should not exceed 30 characters.';
    }

    if (!userEmail.trim()) {
        errors.userEmail = 'Please enter your email.';
    } else if (!isValidEmail(userEmail)) {
        errors.userEmail = 'Please enter a valid email address.';
    }

    if (!userPassword.trim()) {
        errors.userPassword = 'Please enter your password.';
    }

    return errors;
};

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
