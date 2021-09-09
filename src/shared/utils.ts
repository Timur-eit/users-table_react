export function getByPlaceholderText(fieldName: string): string {
    switch (fieldName) {
        case 'lastName':
            return 'Введите фамилию';
        case 'firstName':
            return 'Введите имя';
        case 'midleName':
            return 'Введите отчество';
        case 'email':
            return 'Введите электронную почту';
        case 'login':
            return 'Введите логин';
        default:
            return '';
    }
}