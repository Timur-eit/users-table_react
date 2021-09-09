import { IUserData } from 'ducks/userTable';

export const columnNames: string[] = ['Фамилия', 'Имя', 'Отчество', 'E-mail', 'Логин'];

export const defaultFormValues: IUserData = {
    lastName: '',
    firstName: '',
    midleName: '',
    email: '',
    login: '',    
};

export const initialTableData: IUserData[] = [
    {
        lastName: 'Иванов',
        firstName: 'Иван',
        midleName: 'Иванович',
        email: 'ivan@mail.ru',
        login: 'user1',
    },
    {
        lastName: 'Сергеев',
        firstName: 'Сергей',
        midleName: 'Сергеевич',
        email: 'sergey@mail.ru',
        login: 'user2',
    },
    {
        lastName: 'Петров',
        firstName: 'Перт',
        midleName: 'Петрович',
        email: 'petr@mail.ru',
        login: 'user3',
    }
];
