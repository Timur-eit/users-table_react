interface IErrorMessages {
    [fieldName: string]: {
        required?: string;
        valid?: string;
    };
}

const errorMessages: IErrorMessages = {
    lastName: {
        required: 'укажите фамилию',
    },
    firstName: {
        required: 'укажите имя',
    },
    midleName: {
        required: 'укажите отчество',
    },
    email: {
        required: 'укажите электронную почту',
        valid: 'укажите корректный формат email',
    },
    login: {
        required: 'укажите логин',
    },
};

export default errorMessages;
