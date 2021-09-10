import { IUserData } from 'ducks/userTable';
export interface IColumnsNames {
    [fieldName: string]: string;
}

export const columnNames: IColumnsNames = {
    lastName: 'Фамилия',
    firstName: 'Имя',
    midleName: 'Отчество',
    email: 'E-mail',
    login: 'Логин',
};

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
        email: 'mail1@mail.com',
        login: 'user1',
    },
    {
        lastName: 'Петров',
        firstName: 'Петр',
        midleName: 'Сергеевич',
        email: 'mail2@mail.com',
        login: 'user2',
    },
    {
        lastName: 'Сергеев',
        firstName: 'Григорий',
        midleName: 'Викторович',
        email: 'mail3@mail.com',
        login: 'user3',
    },
    {
        lastName: 'Федоров',
        firstName: 'Виктор',
        midleName: 'Федорович',
        email: 'mail4@mail.com',
        login: 'user4',
    },
    {
        lastName: 'Хвастунов',
        firstName: 'Сергей',
        midleName: 'Петрович',
        email: 'mail5@mail.com',
        login: 'user5',
    },
    {
        lastName: 'Григорьев',
        firstName: 'Федор',
        midleName: 'Григорьевич',
        email: 'mail6@mail.com',
        login: 'user6',
    },
];
