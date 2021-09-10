import errorMessages from './errorMessages';

interface IError {
    [field: string]: string | undefined;
}

function validate(values: any, unblockSubmit?: (state: boolean) => void): IError {
    const error: IError = {};
    if (!values.lastName) {
        error.lastName = errorMessages.lastName.required;
    }
    if (!values.firstName) {
        error.firstName = errorMessages.firstName.required;
    }
    if (!values.midleName) {
        error.firstName = errorMessages.firstName.required;
    }
    if (!values.email) {
        error.email = errorMessages.email.required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        error.email = errorMessages.email.valid;
    }
    if (!values.login) {
        error.login = errorMessages.login.required;
    }

    if (Object.keys(error).length === 0) {
        unblockSubmit && unblockSubmit(true);
    } else {
        unblockSubmit && unblockSubmit(false);
    }
    return error;
}

export default validate;
