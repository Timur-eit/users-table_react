import React from 'react';
import UsersTable from 'components/UsersTable';
import {columnNames, defaultFormValues, initialTableData} from 'data/initialTableData';

function App() {
  return (
      <UsersTable
        columnData={columnNames}
        initialTableData={initialTableData}
        defaultFormValues={defaultFormValues}
      />
  );
}

export default App;
