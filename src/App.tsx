import React from 'react';
import UsersTable from 'components/UsersTable';
import MainHeader from 'components/MainHeader';
import { columnNames, defaultFormValues, initialTableData } from 'data/initialTableData';
import LeftSideBar from 'components/LeftSideBar';
import 'App.scss';

function App() {
    return (
        <div className="userData-table-container">
            <MainHeader />
            <div className="userData-table-container__content">
                <LeftSideBar />
                <UsersTable
                    columnData={columnNames}
                    initialTableData={initialTableData}
                    defaultFormValues={defaultFormValues}
                />
            </div>
        </div>
    );
}

export default App;
